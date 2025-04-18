# custom-fetch-works

Dans custom-fetch :

    cp SparqlEndpointFetcher-patched-version-proxy.js node_modules/fetch-sparql-endpoint/lib/SparqlEndpointFetcher.js


Dans le dossier avec les solid_server avec les data alice et bob :

    npx @solid/community-server -c @css:config/file.json -f solid_server/data/solidproxy --baseUrl http://localhost:3001

Ensuite dans custom-fetch :

    comunica-sparql-file-http -p 4001 ./data/vendor2.ttl

    node proxy.js 3001 http://localhost:3000 http://localhost:4001/sparql

    export EMAILUSER="bob@solid.org"

    export MDP="bob"

    npx comunica-sparql http://localhost:3001/sparql -f queries/vendor.sparql