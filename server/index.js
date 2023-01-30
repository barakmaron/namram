import app from "./app.js";
import http from 'http';
import https from 'https';
import fs from 'fs';

const http_port = 80;
const https_port = 443;

const privateKey = fs.readFileSync('/etc/letsencrypt/live/namram.co.il/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/namram.co.il/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/namram.co.il/chain.pem', 'utf8');

const credentials = {
 	key: privateKey,
	cert: certificate,
	ca: ca
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(http_port, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(https_port, () => {
 	console.log('HTTPS Server running on port 443');
});

app.listen(process.env.PORT, (port) => {
	console.log(`HTTP Server running on port ${port}`);
});
