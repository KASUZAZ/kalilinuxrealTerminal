const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const pty = require('node-pty');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Folder untuk fail HTML/JS
app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', (ws) => {
    console.log("Sesi Terminal Bermula...");

    // Spawn shell bash tempatan
    const shell = pty.spawn('bash', [], {
        name: 'xterm-color',
        cols: 80,
        rows: 24,
        cwd: process.env.HOME,
        env: process.env
    });

    shell.on('data', (data) => {
        ws.send(data);
    });

    ws.on('message', (msg) => {
        shell.write(msg);
    });

    ws.on('close', () => {
        console.log("Sesi Tamat.");
        shell.kill();
    });
});

// Port tetap untuk laptop anda
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚀 Terminal Local Aktif!`);
    console.log(`Buka di browser: http://localhost:${PORT}`);
});