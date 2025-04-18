J'ai au moins un truc pour run :

    npx comunica-sparql http://localhost:3001/sparql -f queries/vendor.sparql

Et que cela fasse un resultat.

Pour l'instant notre solution avec nos modifs sur le SparqlEndpointFetcher ne permet pas de faire ça par exemple : 

    npx comunica-sparql http://localhost:3001/sparql http://localhost:6001/sparql -f queries/vendor.sparql

où :
- http://localhost:3001/sparql serait un proxy 
- http://localhost:6001/sparql serait un endpoint SPARQL

Ducoup il y a 2 formats du fichier de SparqlEndpointFetcher pour que cela marche pour ces 2 cas.

Pour que cela marche avec un endpoint SPARQL bah au final, ce serait de rien changer logique. 

Et l'autre version, il y a pas mal de changements parfois minim, par exemple sur le format du body ou des trucs de merde pour que ça marche comme je l'ai fait. Et je précise comme je l'ai fait, parce que c'est peut-etre degueulasse, masi bon j'ai debug tellement longtemps sur les dpopkey, les headers, les authfetch, à les comparer etc. que j'ai juste fait des trucs de cons pour que ça passe au bout d'un moment.

Les trucs en question :

- Il y a déjà pleins de fonctions pour tout ce qui est generation de dpopkey, accesstoken etc. qui sont les fonctions asynchrones en bas (generateAccessTokenAndDpop, fetchControls, login, getClientCredentials, getAccessToken)

- Une fonction async init au début qui permet de modifier le fetch que Comunica va envoyer avec un buildAuthenticatedFetch. Cette fonction est déclaré dans fetchBindings.

- Ensuite tout se passe dans fetchRawStream :

        fetchRawStream(endpoint, query, acceptHeader) {
            return __awaiter(this, void 0, void 0, function* () {
                let url = this.method === 'POST' ? endpoint : `${endpoint}?query=${encodeURIComponent(query)}`;
                url = "http://localhost:3001/alice/sparql-permissions.ttl";
                // Initiate request
                let body;
                const headers = new Headers(this.defaultHeaders);
                headers.append('Accept', acceptHeader);

                // La méthode PUT evidemment
                this.method = 'PUT';
                if (this.method === 'POST' || this.method === 'PUT') {
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    body = new URLSearchParams();

                    // 1er changement de trucs débiles pour le body
                    // body.set('query', query);
                    body = query;

                    for (const [key, value] of this.additionalUrlParams.entries()) {
                        body.set(key, value);
                    }

                    // 2eme changement de trucs débiles pour le header
                    // headers.append('Content-Length', body.toString().length.toString());
                    headers.set('Content-Length', Buffer.byteLength(query).toString());

                }
                else if (this.additionalUrlParams.toString().length > 0) {
                    url += `&${this.additionalUrlParams.toString()}`;
                }
                return this.handleFetchCall(url, { headers, method: this.method, body });
            });
        }

Et le seul truc qui m'a fait perdre enormement de temps et qui reste pour moi très degueulasse (mais ça marcheà) c'est l'`url` qui à la base sont des PUT /sparql?query.... Eh bah ces requetes même en ayant build un nouveau fetch avec les accessToken et dpopkey tout propre, ça refusait toujours en 401 solid au niveau du proxy. Et donc je sais meme pas pourquoi en changeant en `http://localhost:3001/alice/sparql-permissions.ttl` ça "change" qlqch au niveau de l'authentification solid au niveau du proxy mais ça marche.

Mais bref, je dodo, enfin je vais m'reposer, en tout cas voilà je vous laisse ça


### Ordres des requêtes (quasi la meme) : 

Dans le dossier avec les data alice et bob :

    npx @solid/community-server -c @css:config/file.json -f data/solidproxy --baseUrl http://localhost:3001

Ensuite dans custom-fetch :

    comunica-sparql-file-http -p 4001 ./data/vendor2.ttl

    node proxy.js 3001 http://localhost:3000 http://localhost:4001/sparql

    export EMAILUSER="bob@solid.org"

    export MDP="bob"

    npx comunica-sparql http://localhost:3001/sparql -f queries/vendor.sparql


Il se peut qu'il y ait des bugs, parfois ça met du temps à generer les accesstoken tout ça tout ça et que ducoup ça retourne que c'est undefined les accesstoken ou des trucs comme ça, j'avoue que j'ai pas eu le temps de voir pourquoi ça veut pas par moment.