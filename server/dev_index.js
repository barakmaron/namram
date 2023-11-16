import app from "./app.js";
import http from 'http';

const http_port = 2000;

const httpServer = http.createServer(app);

httpServer.listen(http_port, () => {
	console.log(`HTTP Server running on port ${http_port}`);
});
