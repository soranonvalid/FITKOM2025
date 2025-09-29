# 📌 Panduan Instalasi & Menjalankan Project

README ini bertujuan untuk membantu panitia jika mengalami kendala saat menjalankan project. Silakan ikuti langkah-langkah berikut dengan seksama. 😀

---

## ⚙️ Instalasi Database

Terdapat **2 cara** untuk menginstalasi database:

### 1. Menggunakan Command Prompt / Terminal

1. Pastikan sudah menginstall **XAMPP Control Panel**.
2. Nyalakan **MySQL**.
3. Buka **Command Prompt / Terminal** di perangkat.
4. Pindah ke direktori MySQL dengan perintah:
   ```bash
   cd c:/xampp/mysql/bin
   ```
5. Aktifkan **MariaDB/MySQL** dengan perintah:
   ```bash
   mysql -u root
   ```
6. Jalankan syntax yang ada di file:
   ```
   database/smart_farm_db.sql
   ```
   secara berurutan.

---

### 2. Menggunakan phpMyAdmin

1. Pastikan sudah menginstall **XAMPP Control Panel**.
2. Nyalakan **MySQL** dan **Apache**.
3. Buka browser, lalu ketik:
   ```
   localhost/phpmyadmin
   ```
4. Klik menu **Import** di bagian atas.
5. Pilih file:
   ```
   database/smart_farm_db.sql
   ```
6. Tekan **Go / Jalankan**, lalu database akan otomatis terinstal.

---

## ▶️ Menjalankan Project

1. Pastikan sudah menginstall **XAMPP Control Panel**.
2. Nyalakan **MySQL** dan **Apache**.
3. Copy atau cut folder project ini ke:
   ```
   c:/xampp/htdocs/
   ```
4. Buka browser, lalu ketik:

   ```
   localhost/(NAMA_FOLDER)
   ```

   ⚠️ **Catatan penting:**

   - Pastikan nama folder **valid** (tidak ada spasi atau karakter aneh).
   - Jika ada duplikasi nama folder, gunakan nama unik agar tidak terjadi konflik.

5. Jika berhasil, project akan tampil di browser. 🎉

---

## 📖 Penjelasan, Tools & Bahasa yang Digunakan

### 1. Penjelasan

- **Frontend**: menggunakan **HTML, CSS, dan JavaScript**.
- **Backend**: menggunakan **PHP Native** untuk koneksi ke **MySQL**.
- Struktur project dibuat **modular**, di mana setiap file JavaScript memiliki tanggung jawab masing-masing agar mudah dibaca dan dipelihara.

### 2. Tools & Bahasa yang Digunakan

- **jQuery**
- **Vanilla JavaScript**
- **PHP Native**
- **CSS**

---

## 👨‍💻 Developer Info

- **Worked By**: [Sora](https://github.com/soranonvalid) & [Diqy](https://github.com/DiqySH)
- **GitHub Repository**: [FITKOM2025](https://github.com/soranonvalid/FITKOM2025)

---

✨ Semoga panduan ini membantu panitia dalam mengatasi kendala teknis.  
Jika masih ada error, cek kembali langkah-langkah di atas atau hubungi developer. 🚀
