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

    // Menjalankan Bash sebenar di server (Docker/Linux)
    const shell = pty.spawn('bash', [], {
        name: 'xterm-color',
        cols: 80,
        rows: 24,
        cwd: process.env.HOME,
        env: process.env
    });

    // Hantar data dari Bash ke Browser (Frontend)
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

// BAHAGIAN PENTING: Menggunakan port dinamik Render atau 3000 untuk local
const PORT = process.env.PORT || 3000;

// Mendengar pada 0.0.0.0 supaya boleh diakses melalui internet/telefon
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Terminal Aktif pada Port ${PORT}`);
    console.log(`Buka di browser: http://localhost:${PORT}`);
});