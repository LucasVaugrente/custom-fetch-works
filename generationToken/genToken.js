#!/usr/bin/env node
const fetch = require('node-fetch');
const { createDpopHeader, generateDpopKeyPair, buildAuthenticatedFetch } = require('@inrupt/solid-client-authn-core');

if (process.argv.length < 5) {
  console.error("Usage: node genToken.js <email> <password> <server_url>");
  process.exit(1);
}

const email = process.argv[2];
const password = process.argv[3];
const serverUrl = process.argv[4];

async function fetchControls(auth = null) {
  const headers = auth ? { authorization: `CSS-Account-Token ${auth}` } : {};
  const indexResponse = await fetch(`${serverUrl}/.account/`, { headers });
  const { controls } = await indexResponse.json();
  return controls;
}

async function login(email, password) {
  const controls = await fetchControls();
  const loginResponse = await fetch(controls.password.login, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const { authorization } = await loginResponse.json();
  if (!authorization) throw new Error("Login failed, no authorization");
  return authorization;
}

async function getClientCredentials(authToken, webId) {
  const controls = await fetchControls(authToken);
  const clientCredsUrl = controls.account?.clientCredentials ?? `${serverUrl}/.account/client-credentials/`;
  const response = await fetch(clientCredsUrl, {
    method: 'POST',
    headers: {
      authorization: `CSS-Account-Token ${authToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ name: 'my-token', webId })
  });
  const { id, secret } = await response.json();
  return { id, secret };
}

async function getAccessToken(id, secret, dpopKey) {
  const tokenUrl = `${serverUrl}/.oidc/token`;
  const authString = `${encodeURIComponent(id)}:${encodeURIComponent(secret)}`;
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      authorization: `Basic ${Buffer.from(authString).toString('base64')}`,
      'content-type': 'application/x-www-form-urlencoded',
      dpop: await createDpopHeader(tokenUrl, 'POST', dpopKey)
    },
    body: 'grant_type=client_credentials&scope=webid'
  });
  const { access_token } = await response.json();
  return access_token;
}

async function testWriteAccess(fileUrl, accessToken, dpopKey, bodyContent) {
  const authFetch = await buildAuthenticatedFetch(accessToken, { dpopKey });

  const response = await authFetch(fileUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: bodyContent
  });

  console.log(`🧪 Test PUT to ${fileUrl} → Status: ${response.status}`);
  const txt = await response.text();
  console.log(txt);
}

async function main() {
  const dpopKey = await generateDpopKeyPair();

  const webId = `${serverUrl}/${email.split('@')[0]}/profile/card#me`;

  const authToken = await login(email, password);
  const { id, secret } = await getClientCredentials(authToken, webId);
  const accessToken = await getAccessToken(id, secret, dpopKey);

  console.log(`ACCESS_TOKEN=${accessToken}`);

  // 🔐 Test d’accès en écriture sur le fichier
  const fileUrl = `${serverUrl}/alice/sparql-permissions.ttl`;
  const fakeQuery = `SELECT * WHERE { ?s ?p ?o } LIMIT 5`;

  await testWriteAccess(fileUrl, accessToken, dpopKey, fakeQuery);
}

main();
