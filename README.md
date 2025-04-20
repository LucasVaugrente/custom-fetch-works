# custom-fetch-works

On doit importer le patch dans fetchsparqlendpoint :

    cp SparqlEndpointFetcher-patched-version-proxy.js node_modules/fetch-sparql-endpoint/lib/SparqlEnfpointFetcher.js

Dans le dossier avec les solid_server avec les data alice et bob :

    npx @solid/community-server -c @css:config/file.json -f data/solidproxy --baseUrl http://localhost:3001

Ensuite dans custom-fetch :

    comunica-sparql-file-http -p 4001 ./data/vendor2.ttl

    node proxy.js 3001 http://localhost:3000 http://localhost:4001/sparql

    export EMAILUSER="bob@solid.org"

    export MDP="bob"

    npx comunica-sparql http://localhost:3001/sparql -f queries/vendor.sparql

### Lancer avec 2 serveurs SOLID 

npx @solid/community-server -c @css:config/file.json -f solid_server/data/solidproxy2 --port 3000 --baseUrl http://localhost:4000/

npx @solid/community-server -c @css:config/file.json -f solid_server/data/solidproxy3 --port 3001 --baseUrl http://localhost:4001/

comunica-sparql-file-http -p 5000 ./data/vendor1.ttl

comunica-sparql-file-http -p 5001 ./data/vendor2.ttl

node proxy.js 4000 http://localhost:3000 http://localhost:5000/sparql

node proxy.js 4001 http://localhost:3001 http://localhost:5001/sparql

export EMAILUSER="bob@solid.org"

export MDP="bob"

npx comunica-sparql http://localhost:4000/sparql http://localhost:4001/sparql -f queries/vendor.sparql