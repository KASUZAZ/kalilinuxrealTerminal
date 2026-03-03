# 🐉 Kali Linux Web Terminal (Real Bash)

![Kali Linux](https://img.shields.io/badge/OS-Kali%20Linux-blue?style=for-the-badge&logo=kali-linux)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![WebSockets](https://img.shields.io/badge/WebSockets-010101?style=for-the-badge&logo=socketdotio)

Satu simulasi terminal berasaskan web yang berinteraksi secara terus dengan **Bash** menggunakan teknologi **WebSockets**. Projek ini dibangunkan untuk memahami integrasi antara sistem pentadbiran Linux dan aplikasi web masa-nyata.

## 🚀 Ciri-Ciri Utama
- **Real-Time Execution:** Menjalankan arahan Linux sebenar terus dari pelayar web.
- **xterm.js Integration:** Antaramuka terminal profesional yang menyokong warna dan skrol.
- **Bi-directional Communication:** Menggunakan WebSockets untuk komunikasi pantas antara frontend dan backend.
- **Cybersecurity Focused:** Dibina sebagai sebahagian daripada kajian pertahanan pelayan dan simulasi serangan.

## 🛠️ Teknologi yang Digunakan
* **Frontend:** HTML5, CSS3, JavaScript (xterm.js)
* **Backend:** Node.js, Express.js
* **System Bridge:** `node-pty` (Pseudo-terminal wrapper)
* **Communication:** WebSockets (`ws`)

## 📦 Cara Pemasangan (Local Setup)

1. **Clone repositori ini:**
   ```bash
   git clone [https://github.com/KASUZAZ/kalilinuxrealTerminal.git](https://github.com/KASUZAZ/kalilinuxrealTerminal.git)
   cd kalilinuxrealTerminal

2. Install the required libraries:
   ```bash
   npm install

3. Run the application:
   ```bash
   node server.js

4. Access in the browser:
   ```bash
   open http://localhost:3000
