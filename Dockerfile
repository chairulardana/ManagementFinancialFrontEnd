# Gunakan image dasar dari .NET SDK untuk membangun aplikasi
FROM node:18 AS build

# Set direktori kerja menjadi direktori aplikasi Anda (ManagementFinance)
WORKDIR /app

# Salin file package.json dan package-lock.json untuk install dependensi
# COPY package.json package-lock.json ./

# # Install dependensi
# RUN npm install
 
# # Salin seluruh kode sumber aplikasi
# COPY . .

# # Bangun aplikasi React (menghasilkan build di folder 'build')
# RUN npm run build

# Gunakan image Nginx untuk menjalankan aplikasi di production
FROM nginx:alpine

# Salin hasil build dari tahap build ke dalam container Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Ekspos port 80 agar aplikasi bisa diakses
EXPOSE 80

# Jalankan Nginx untuk menyajikan aplikasi
CMD ["nginx", "-g", "daemon off;"]
