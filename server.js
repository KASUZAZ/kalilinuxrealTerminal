const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const pty = require('node-pty');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Memastikan fail statik diambil dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', (ws) => {
    console.log("Pengguna baru disambungkan");

    // Menjalankan Bash sebenar di server
    const shell = pty.spawn('bash', [], {
        name: 'xterm-color',
        cols: 80,
        rows: 24,
        cwd: process.env.HOME,
        env: process.env
    });

    // Hantar data dari Bash ke Browser
    shell.on('data', (data) => {
        ws.send(data);
    });

    // Terima input dari Browser dan tulis ke Bash
    ws.on('message', (msg) => {
        shell.write(msg);
    });

    ws.on('close', () => {
        console.log("Sesi tamat");
        shell.kill();
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚀 Terminal Aktif! Buka http://localhost:${PORT}`);
});