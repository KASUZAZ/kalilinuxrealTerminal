const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const pty = require('node-pty');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Menghoskan fail statik dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', (ws) => {
    console.log("Sesi Terminal Baru Bermula...");

    // Spawn shell bash untuk berinteraksi dengan sistem Kali Linux
    const shell = pty.spawn('bash', [], {
        name: 'xterm-color',
        cols: 80,
        rows: 24,
        cwd: process.env.HOME,
        env: process.env
    });

    // Menghantar output bash ke browser melalui WebSocket
    shell.on('data', (data) => {
        ws.send(data);
    });

    // Menerima input dari browser dan hantar ke bash
    ws.on('message', (msg) => {
        shell.write(msg);
    });

    ws.on('close', () => {
        console.log("Sesi Tamat.");
        shell.kill();
    });
});

// Konfigurasi Port dan Host
const PORT = 3000;
const HOST = '0.0.0.0'; // Membenarkan akses dari luar laptop (Network Access)

server.listen(PORT, HOST, () => {
    console.log(`🚀 Terminal Aktif!`);
    console.log(`Akses Local  : http://localhost:${PORT}`);
    console.log(`Akses Network: http://172.20.22.104:${PORT}`);
});