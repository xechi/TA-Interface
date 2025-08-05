# Gunakan image node sebagai base
FROM node:20-alpine

# Atur direktori kerja di dalam container
WORKDIR /app

# Salin file dependency terlebih dahulu untuk cache layer
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin semua file proyek
COPY . .

# Build aplikasi
RUN npm run build

# Ekspos port 
EXPOSE 4173

# Jalankan aplikasi dengan 'vite preview' di port 8080
CMD ["npm", "run", "preview", "--", "--host"]