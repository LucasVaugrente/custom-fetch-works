# custom-fetch-works

Tout d'abord :

    npm install

On doit importer le patch dans fetchsparqlendpoint :

    cp SparqlEndpointFetcher-patched-version-proxy.js node_modules/fetch-sparql-endpoint/lib/SparqlEndpointFetcher.js

Puis, lancez le bash :

    ./run_test.sh

Celui fait une requête comunica sur 2 proxys avec comme utilisateur `bob@solid.org` + `bob` et cela renvoie les resultats de la requete sparql des 2 endpoints sécurisées.