#!/bin/bash

echo "Lancement des 2 serveurs SOLID... (3000 et 3001)"

npx @solid/community-server -c @css:config/file.json -f solid_server/data/solidproxy2 --port 3000 --baseUrl http://localhost:4000/ > logs/solid1.log 2>&1 &
npx @solid/community-server -c @css:config/file.json -f solid_server/data/solidproxy3 --port 3001 --baseUrl http://localhost:4001/ > logs/solid2.log 2>&1 &
PID1=$!
PID2=$!

echo "Lancement des 2 endpoint SPARQL... (5000 et 5001)"

comunica-sparql-file-http -p 5000 ./data/vendor1.ttl > logs/endpoint1.log 2>&1 &
comunica-sparql-file-http -p 5001 ./data/vendor2.ttl > logs/endpoint2.log 2>&1 &
PID3=$!
PID4=$!

echo "Lancement des 2 proxys... (4000 et 4001)"

node proxy.js 4000 http://localhost:3000 http://localhost:5000/sparql > logs/proxy1.log 2>&1 &
node proxy.js 4001 http://localhost:3001 http://localhost:5001/sparql > logs/proxy2.log 2>&1 &
PID5=$!
PID6=$!

echo "Export de bob..."
export EMAILUSER="bob@solid.org"
export MDP="bob"

sleep 40

echo "Lancement de la requête Comunica sur les 2 proxys..."
npx comunica-sparql http://localhost:4000/sparql http://localhost:4001/sparql -f queries/vendor.sparql


echo "Arrêt des serveurs..."
kill $PID1 $PID2 $PID3 $PID4 $PID5 $PID6