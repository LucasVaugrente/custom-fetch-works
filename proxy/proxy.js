// launch like this:
// node proxy.js 3001 http://localhost:3000 http://localhost:4001/sparql

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const args = process.argv.slice(2);
const port = parseInt(args[0], 10) || 3001;
const target = args[1];
const targetEndpointSparql = args[2];

const solidServer = target;
const endpointSPARQL = targetEndpointSparql;

const app = express();
app.use(bodyParser.text({ type: '*/*' }));

app.use(async (req, res, next) => {
  console.log("================================================================================================");
  console.log(`[Request] ${req.method} ${req.url}`);
  console.log(`[Headers] ${JSON.stringify(req.headers)}`);
  console.log(`[Body] ${req.body?.substring?.(0, 200)}...`);

  if (req.method === 'GET' && req.url.startsWith('/sparql')) {
    try {
      console.log(`--> Comunica is probing metadata on /, redirecting to /sparql`);
      const endpointResponse = await fetch(`${endpointSPARQL}`, {
        method: 'GET',
        headers: { 'Accept': 'text/turtle' }
      });
      const endpointText = await endpointResponse.text();

      res.status(endpointResponse.status).set({
        'Content-Type': 'text/turtle',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }).send(endpointText);
      return;
    } catch (err) {
      console.error('Erreur GET / vers endpoint:', err);
      res.status(500).send('Erreur lors de la récupération du endpoint SPARQL');
      return;
    }
  }

  if (req.method === 'PUT') {
    try {
      console.log(`--> Forwarding PUT to Solid: ${solidServer}/alice/sparql-permissions.ttl`);
      
      const solidResponse = await fetch(`${solidServer}/alice/sparql-permissions.ttl`, {
        method: "PUT",
        headers: req.headers,
        body: typeof req.body === 'string' ? req.body : undefined
      });

      const solidText = await solidResponse.text();
      console.log(`Solid responded with status: ${solidResponse.status}`);

      if (solidResponse.status === 205) {
        console.log(`--> Forwarding query to endpoint...`);
        const endpointResponse = await fetch(endpointSPARQL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/sparql-query' },
          body: req.body
        });
        const sparqlText = await endpointResponse.text();
        const contentType = endpointResponse.headers.get('content-type')?.split(';')[0] || 'application/sparql-results+json';

        res.writeHead(endpointResponse.status, {
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        });

        res.end(sparqlText);
        return;
      } else {
        res.status(solidResponse.status).set({
          ...Object.fromEntries(solidResponse.headers),
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }).send(solidText);
        return;
      }
    } catch (err) {
      console.error('Erreur dans le middleware PUT:', err);
      res.status(500).send('Erreur lors de la communication avec Solid ou endpoint.');
      return;
    }
  }

  else {
    try {
      const solidUrl = `${solidServer}${req.url}`;
      const solidResponse = await fetch(solidUrl, {
        method: req.method,
        headers: req.headers,
        body: typeof req.body === 'string' ? req.body : undefined
      });
    
      const solidText = await solidResponse.text();
      console.log(`Solid responded with status: ${solidResponse.status}`);
    
      res.writeHead(solidResponse.status, {
        ...Object.fromEntries(solidResponse.headers),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      });
      res.end(solidText);
      return;
    } catch (err) {
      console.error('Erreur dans le fallback proxy vers Solid:', err);
      res.status(502).send('Erreur de connexion au serveur Solid.');
      return;
    }
  }
});

app.use('/', createProxyMiddleware({
  target,
  changeOrigin: true,
  logLevel: 'debug'
}));

app.listen(port, () => {
  console.log(`🔁 Proxy running at http://localhost:${port}`);
  console.log(`✨ Proxying to ${target}`);
});