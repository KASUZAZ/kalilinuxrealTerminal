const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const pty = require('node-pty');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

// KATA LALUAN ANDA (Boleh tukar di sini)
const MY_PASSWORD = "aizul123"; 

wss.on('connection', (ws) => {
    let authenticated = false;

    // 1. PAPARKAN BANNER (Baris 19)
    ws.send("\r\n \x1b[34m" +
        "  ██╗  ██╗ █████╗ ██╗     ██╗    ██╗███████╗██████╗ \r\n" +
        "  ██║ ██╔╝██╔══██╗██║     ██║    ██║██╔════╝██╔══██╗\r\n" +
        "  █████╔╝ ███████║██║     ██║ █╗ ██║█████╗  ██████╔╝\r\n" +
        "  ██╔═██╗ ██╔══██╗██║     ██║███╗██║██╔══╝  ██╔══██╗\r\n" +
        "  ██║  ██╗██║  ██║███████╗╚███╔███╔╝███████╗██████╔╝\r\n" +
        "  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚══╝╚══╝ ╚══════╝╚═════╝ \x1b[0m\r\n" +
        "  \x1b[32m[SECURITY SYSTEM ACTIVE]\x1b[0m\r\n");

    ws.send("\r\nSila masukkan kata laluan untuk akses Bash: ");

    const shell = pty.spawn('bash', [], {
        name: 'xterm-color',
        cols: 80,
        rows: 24,
        cwd: process.env.HOME,
        env: process.env
    });

    shell.on('data', (data) => {
        if (authenticated) ws.send(data);
    });

    ws.on('message', (msg) => {
        if (!authenticated) {
            // Proses semakan kata laluan
            const input = msg.toString().trim();
            if (input === MY_PASSWORD) {
                authenticated = true;
                ws.send("\r\n\x1b[32mAKSES DIBERIKAN. Memulakan Bash...\x1b[0m\r\n\r\n");
                shell.write("\n"); // Mulakan prompt bash
            } else {
                ws.send("\r\n\x1b[31mKATA LALUAN SALAH!\x1b[0m\r\nSila cuba lagi: ");
            }
        } else {
            shell.write(msg);
        }
    });

    ws.on('close', () => {
        shell.kill();
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server berjalan pada port ${PORT}`);
});