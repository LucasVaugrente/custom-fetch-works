#!/bin/bash

echo "Lancement des 2 serveurs SOLID... (Ports 3000 et 3001)"

npx @solid/community-server -c @css:config/file.json -f solid_server/data/solidproxy2 --port 3000 --baseUrl http://localhost:4000/ > logs/solid1.log 2>&1 &
npx @solid/community-server -c @css:config/file.json -f solid_server/data/solidproxy3 --port 3001 --baseUrl http://localhost:4001/ > logs/solid2.log 2>&1 &

sleep 2

echo "🟢 Les 2 serveurs SOLID sont créés..."
echo ""
echo "Lancement du Federated ID Provider (Port 3002)"

npx @solid/community-server -c @css:config/file.json -f solid_server/data/solidproxy --port 3002 > logs/solid_id_provider.log 2>&1 &

sleep 2

echo "🟣 Le serveur SOLID du Federated ID Provider est lancé..."
echo ""
echo "Lancement des 2 proxys... (Ports 4000 et 4001)"

node proxy.js 4000 http://localhost:3000 http://localhost:5000/sparql > logs/proxy1.log 2>&1 &
node proxy.js 4001 http://localhost:3001 http://localhost:5001/sparql > logs/proxy2.log 2>&1 &
PID5=$!
PID6=$!

sleep 2

echo "🔴 Les 2 proxys sont créés et reliés aux serveurs SOLID..."
echo ""
echo "Lancement des 2 endpoint SPARQL... (Ports 5000 et 5001)"

comunica-sparql-file-http -p 5000 ./data/vendor1.ttl > logs/endpoint1.log 2>&1 &
comunica-sparql-file-http -p 5001 ./data/vendor2.ttl > logs/endpoint2.log 2>&1 &
PID3=$!
PID4=$!

sleep 2

echo "🔵 Les 2 endpoints SPARQL sont créés..."
echo ""
echo "Export du mail et mot de passe de bob..."
export IDP_SERVER="http://localhost:3002"
export EMAILUSER="bob@solid.org"
export MDP="bob"

sleep 40

echo "Lancement de la requête Comunica sur les 2 proxys..."
echo ""
echo 'npx comunica-sparql http://localhost:4000/sparql http://localhost:4001/sparql -q "SELECT * { ?s ex:sameAs ?product . ?s ex:hasPrice ?price . FILTER (?price > 40) }" '

npx comunica-sparql http://localhost:4000/sparql http://localhost:4001/sparql -f queries/vendor.sparql

sleep 5

echo ""
echo "Export du mail et mot de passe de lucas..."
export EMAILUSER="lucasvaugrente35@gmail.com"
export MDP="lucas"

echo "2ème lancement de la requête Comunica sur les 2 proxys..."
echo ""
echo 'npx comunica-sparql http://localhost:4000/sparql http://localhost:4001/sparql -q "SELECT * { ?s ex:sameAs ?product . ?s ex:hasPrice ?price . FILTER (?price > 40) }" '

npx comunica-sparql http://localhost:4000/sparql http://localhost:4001/sparql -f queries/vendor.sparql

echo "Arrêt des serveurs..."
kill $PID3
kill $PID4
kill $PID5
kill $PID6