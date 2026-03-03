# 1. Gunakan imej Node.js versi 18 (Bullseye) yang stabil
FROM node:18-bullseye

# 2. Pasang 'build tools' yang diperlukan oleh node-pty untuk berfungsi di server
# Ini termasuk Python dan C++ compiler (g++)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# 3. Tetapkan folder kerja di dalam container
WORKDIR /app

# 4. Salin fail konfigurasi package dan pasang library
COPY package*.json ./
RUN npm install

# 5. Salin semua kod projek anda ke dalam container
COPY . .

# 6. Beritahu Render bahawa aplikasi menggunakan port 3000
EXPOSE 3000

# 7. Arahan untuk memulakan server terminal anda
CMD ["node", "server.js"]