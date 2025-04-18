"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedRdfSourcesAsyncRdfIterator = void 0;
const context_entries_1 = require("@comunica/context-entries");
const utils_metadata_1 = require("@comunica/utils-metadata");
const asynciterator_1 = require("asynciterator");
class LinkedRdfSourcesAsyncRdfIterator extends asynciterator_1.BufferedIterator {
    constructor(cacheSize, operation, queryBindingsOptions, context, firstUrl, maxIterators, sourceStateGetter, options) {
        super({ autoStart: false, ...options });
        this.started = false;
        this.currentIterators = [];
        this.iteratorsPendingCreation = 0;
        this.iteratorsPendingTermination = 0;
        // eslint-disable-next-line unicorn/no-useless-undefined
        this.accumulatedMetadata = Promise.resolve(undefined);
        this._reading = false;
        this.cacheSize = cacheSize;
        this.operation = operation;
        this.queryBindingsOptions = queryBindingsOptions;
        this.context = context;
        this.firstUrl = firstUrl;
        this.maxIterators = maxIterators;
        this.sourceStateGetter = sourceStateGetter;
        if (this.maxIterators <= 0) {
            throw new Error(`LinkedRdfSourcesAsyncRdfIterator.maxIterators must be larger than zero, but got ${this.maxIterators}`);
        }
    }
    /**
     * Start filling the buffer of this iterator.
     */
    kickstart() {
        if (!this.started) {
            this._fillBufferAsync();
        }
    }
    getProperty(propertyName, callback) {
        if (propertyName === 'metadata' && !this.started) {
            // If the iterator has not started yet, forcefully fetch the metadata from the source without starting the
            // iterator. This way, we keep the iterator lazy.
            if (!this.preflightMetadata) {
                this.preflightMetadata = new Promise((resolve, reject) => {
                    this.sourceStateGetter({ url: this.firstUrl }, {})
                        .then((sourceState) => {
                        // Don't pass query options, as we don't want to consume any passed iterators
                        const bindingsStream = sourceState.source.queryBindings(this.operation, this.context);
                        bindingsStream.getProperty('metadata', (metadata) => {
                            metadata.state = new utils_metadata_1.MetadataValidationState();
                            bindingsStream.destroy();
                            this.accumulateMetadata(sourceState.metadata, metadata)
                                .then((accumulatedMetadata) => {
                                // Also merge fields that were not explicitly accumulated
                                const returnMetadata = { ...sourceState.metadata, ...metadata, ...accumulatedMetadata };
                                resolve(returnMetadata);
                            })
                                .catch(() => {
                                resolve({
                                    ...sourceState.metadata,
                                    state: new utils_metadata_1.MetadataValidationState(),
                                });
                            });
                        });
                    })
                        .catch(reject);
                });
            }
            this.preflightMetadata
                .then(metadata => this.setProperty('metadata', metadata))
                .catch(() => {
                // Ignore errors
            });
        }
        return super.getProperty(propertyName, callback);
    }
    _end(destroy) {
        // Close all running iterators
        for (const it of this.currentIterators) {
            it.destroy();
        }
        super._end(destroy);
    }
    _read(count, done) {
        if (this.started) {
            // Read from all current iterators
            for (const iterator of this.currentIterators) {
                while (count > 0) {
                    const read = iterator.read();
                    if (read === null) {
                        break;
                    }
                    else {
                        count--;
                        this._push(read);
                    }
                }
                if (count <= 0) {
                    break;
                }
            }
            // Schedule new iterators if needed
            if (count >= 0 && this.canStartNewIterator()) {
                // We can safely ignore skip catching the error, since we are guaranteed to have
                // successfully got the source for this.firstUrl before.
                // eslint-disable-next-line ts/no-floating-promises
                this.sourceStateGetter({ url: this.firstUrl }, {})
                    .then((sourceState) => {
                    this.startIteratorsForNextUrls(sourceState.handledDatasets, false);
                    done();
                });
            }
            else {
                done();
            }
        }
        else {
            // The first time this is called, prepare the first source
            this.started = true;
            // Await the source to be set, and start the source iterator
            this.sourceStateGetter({ url: this.firstUrl }, {})
                .then((sourceState) => {
                this.startIterator(sourceState);
                done();
            })
                // Destroy should be async because it can be called before it is listened to
                .catch(error => setTimeout(() => this.destroy(error)));
        }
    }
    canStartNewIterator() {
        return (this.currentIterators.length + this.iteratorsPendingCreation + this.iteratorsPendingTermination) <
            this.maxIterators && (!this.canStartNewIteratorConsiderReadable() || !this.readable);
    }
    canStartNewIteratorConsiderReadable() {
        return true;
    }
    areIteratorsRunning() {
        return (this.currentIterators.length + this.iteratorsPendingCreation + this.iteratorsPendingTermination) > 0;
    }
    /**
     * Start a new iterator for the given source.
     * Once the iterator is done, it will either determine a new source, or it will close the linked iterator.
     * @param {ISourceState} startSource The start source state.
     */
    startIterator(startSource) {
        // Delegate the quad pattern query to the given source
        try {
            const iterator = startSource.source.queryBindings(this.operation, this.context, this.queryBindingsOptions);
            this.currentIterators.push(iterator);
            let receivedEndEvent = false;
            let receivedMetadata = false;
            // Attach readers to the newly created iterator
            iterator._destination = this;
            iterator.on('error', (error) => this.destroy(error));
            iterator.on('readable', () => this._fillBuffer());
            iterator.on('end', () => {
                this.currentIterators.splice(this.currentIterators.indexOf(iterator), 1);
                // Indicate that this iterator still needs to flush its next-links.
                // Without this, the linked iterator could sometimes be closed before next-links are obtained.
                receivedEndEvent = true;
                if (!receivedMetadata) {
                    this.iteratorsPendingTermination++;
                }
                // If the metadata was already received, handle the next URL in the queue
                if (receivedMetadata) {
                    this.startIteratorsForNextUrls(startSource.handledDatasets, true);
                }
            });
            // Listen for the metadata of the source
            // The metadata property is guaranteed to be set
            iterator.getProperty('metadata', (metadata) => {
                // Accumulate the metadata object
                this.accumulatedMetadata = this.accumulatedMetadata
                    .then(previousMetadata => (async () => {
                    if (!previousMetadata) {
                        previousMetadata = startSource.metadata;
                    }
                    return this.accumulateMetadata(previousMetadata, metadata);
                })()
                    .then((accumulatedMetadata) => {
                    // Also merge fields that were not explicitly accumulated
                    const returnMetadata = { ...startSource.metadata, ...metadata, ...accumulatedMetadata };
                    // Create new metadata state
                    returnMetadata.state = new utils_metadata_1.MetadataValidationState();
                    // Emit metadata, and invalidate any metadata that was set before
                    this.updateMetadata(returnMetadata);
                    // Invalidate any preflight metadata
                    if (this.preflightMetadata) {
                        this.preflightMetadata
                            .then(metadataIn => metadataIn.state.invalidate())
                            .catch(() => {
                            // Ignore errors
                        });
                    }
                    // Determine next urls, which will eventually become a next-next source.
                    this.getSourceLinks(returnMetadata, startSource)
                        .then((nextUrls) => Promise.all(nextUrls))
                        .then(async (nextUrls) => {
                        // Append all next URLs to our queue
                        const linkQueue = await this.getLinkQueue();
                        for (const nextUrl of nextUrls) {
                            linkQueue.push(nextUrl, startSource.link);
                        }
                        receivedMetadata = true;
                        if (receivedEndEvent) {
                            this.iteratorsPendingTermination--;
                        }
                        this.startIteratorsForNextUrls(startSource.handledDatasets, true);
                    }).catch(error => this.destroy(error));
                    return returnMetadata;
                })).catch((error) => {
                    this.destroy(error);
                    return {};
                });
            });
        }
        catch (syncError) {
            this.destroy(syncError);
        }
    }
    updateMetadata(metadataNew) {
        const metadataToInvalidate = this.getProperty('metadata');
        this.setProperty('metadata', metadataNew);
        metadataToInvalidate?.state.invalidate();
    }
    isRunning() {
        return !this.done;
    }
    /**
     * Check if a next URL is in the queue.
     * If yes, start a new iterator.
     * If no, close this iterator.
     * @param handledDatasets
     * @param canClose
     */
    startIteratorsForNextUrls(handledDatasets, canClose) {
        this.getLinkQueue()
            .then((linkQueue) => {
            // Create as many new iterators as possible
            while (this.canStartNewIterator() && this.isRunning()) {
                const nextLink = linkQueue.pop();
                if (nextLink) {
                    this.iteratorsPendingCreation++;
                    this.sourceStateGetter(nextLink, handledDatasets)
                        .then((nextSourceState) => {
                        // If we find a statistic tracking dereference events we emit the relevant data
                        const statisticDereferenceLinks = this.context.get(context_entries_1.KeysStatistics.dereferencedLinks);
                        if (statisticDereferenceLinks) {
                            statisticDereferenceLinks.updateStatistic({
                                url: nextSourceState.link.url,
                                metadata: { ...nextSourceState.metadata, ...nextSourceState.link.metadata },
                            }, nextSourceState.source);
                        }
                        this.iteratorsPendingCreation--;
                        this.startIterator(nextSourceState);
                    })
                        .catch(error => this.emit('error', error));
                }
                else {
                    break;
                }
            }
            // Close, only if no other iterators are still running
            if (canClose && this.isCloseable(linkQueue, true)) {
                this.close();
            }
        })
            .catch(error => this.destroy(error));
    }
    isCloseable(linkQueue, _requireQueueEmpty) {
        return linkQueue.isEmpty() && !this.areIteratorsRunning();
    }
}
exports.LinkedRdfSourcesAsyncRdfIterator = LinkedRdfSourcesAsyncRdfIterator;
//# sourceMappingURL=LinkedRdfSourcesAsyncRdfIterator.js.map