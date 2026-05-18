# Laporan Progress Project: Modul Autentikasi User (Ghufran)

## Deskripsi Tugas
Mengerjakan modul Autentikasi User dengan mengimplementasikan proses Registrasi dan Login sesuai struktur dasar yang disiapkan ketua kelompok. Bagian ini fokus pada penggunaan *query SQL native* (mysql2) dan arsitektur *MVC* (Model-View-Controller).

## Pekerjaan yang Telah Diselesaikan

### 1. **Pembuatan Model User (`models/userModel.js`)**
Menggunakan `db.js` (koneksi database) buatan tim untuk mengeksekusi operasi database secara langsung (*native queries*):
- `createUser()`: Mengeksekusi query `INSERT INTO users (name, email, password)` untuk mendaftarkan akun baru.
- `findByEmail()`: Mengeksekusi query `SELECT * FROM users WHERE email = ? LIMIT 1` untuk memeriksa apakah email sudah dipakai dan untuk validasi kredensial saat login.

### 2. **Pembuatan Controller Autentikasi (`controllers/authController.js`)**
Menerima request dari route dan mengelola jalannya logika autentikasi:
- `register()`: Menerima data dari body request, melakukan pengecekan ketersediaan email, melakukan enkripsi (hashing) password menggunakan library `bcryptjs`, dan menyimpan data user melalui `UserModel`.
- `login()`: Mencari data email dari database, memvalidasi kecocokan hash password (`bcrypt.compare`), dan mengeset sesi login pengguna menggunakan `express-session` bawaan project.

### 3. **Pembuatan Route Autentikasi (`routes/authRoutes.js`)**
Menyiapkan endpoint API yang dapat diakses oleh Frontend (EJS Views maupun Request API):
- `POST /auth/register`
- `POST /auth/login`
- *(Endpoint ini kemudian didaftarkan ke dalam file `server.js` melalui instruksi `app.use('/auth', authRoutes)`).*

### 4. **Integrasi & Pengujian Awal**
- Route `/auth` telah berhasil dimasukkan dengan rapi ke struktur `server.js` utama tanpa merusak modul dari kelompok yang lain.
- Fitur hash password teruji dengan sukses menggunakan `bcryptjs`.
- Logika penyimpanan session sukses memanfaatkan fungsi `req.session` Express.

## Kesimpulan
Fondasi autentikasi telah berhasil dipasang menggunakan pendekatan Native SQL + MVC dan sudah menempel dengan kerangka utama project (*main*). Fitur ini siap dihubungkan dengan antar muka (View) login dan register yang mungkin akan dibuat pada tahapan berikutnya.
