import http from 'http';
import https from 'https';
import fs from 'fs';
import favicon from "serve-favicon";
import path from 'path';
import { fileURLToPath } from 'url';

import ErrorHandler from './middleware/ErrorHandler.js';
import app from "./app.js";
import EnsureSecureMiddleware from './middleware/EnsureSecureMiddleware.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename); 

const http_port = 8008;
const https_port = 443;

const privateKey = fs.readFileSync('/etc/letsencrypt/live/namram.co.il/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/namram.co.il/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/namram.co.il/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

app.use(EnsureSecureMiddleware);
app.use(favicon(path.join(__dirname, '../company_site/build/favicon.ico')));

app.use(ErrorHandler);
process.on('unhandledRejection', (reason, promise) => {
	console.log('Uncaught Rejection', reason.message);
	throw reason;
});

process.on('uncaughtException', (error) => {
	console.log("Uncaught Exception", error.message);
	process.exit(1);
});

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(http_port, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(https_port, () => {
	console.log('HTTPS Server running on port 443');
});
