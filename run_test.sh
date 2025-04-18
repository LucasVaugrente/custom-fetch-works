#!/bin/bash

# Lancer les endpoints SPARQL
echo "Lancement Endpoint Sparql..."
comunica-sparql-file-http -p 4001 ./data/vendor2.ttl > logs/endpoint.log 2>&1 &
PID1=$!

# Lancer les proxies
echo "Lancement Proxy..."
node proxy.js 3001 http://localhost:3000 http://localhost:4001/sparql > logs/proxy.log 2>&1 &
PID2=$!

# Attendre un peu pour que tout démarre
sleep 20

# export ACCESS_TOKEN=$(node generationToken/genToken.js bob@solid.org bob http://localhost:3001 | grep ACCESS_TOKEN | cut -d= -f2) 
# echo "AccessToken généré exporté : $ACCESS_TOKEN"
export EMAILUSER="bob@solid.org"
export MDP="bob"

echo "User : bob@solid.org + bob"

# Lancer la requête
echo "Lancement de la requête SPARQL sur le proxy..."
npx comunica-sparql http://localhost:3001/sparql -f queries/vendor.sparql

# Nettoyage : tuer les processus
echo "Arrêt des serveurs..."
kill $PID1 $PID2
