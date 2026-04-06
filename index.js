// This file exists as a fallback for Render deployments.
// If the Start Command in Render is accidentally left as the default "node index.js",
// this file will catch it and properly route it to start your actual server.

console.log("Starting server from root index.js fallback...");
require('./server/server.js');
