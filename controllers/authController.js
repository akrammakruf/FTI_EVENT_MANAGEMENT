const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');

const AuthController = {
  /**
   * Proses Registrasi User
   */
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Semua field harus diisi.' });
      }

      // Cek apakah email sudah terdaftar
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email sudah terdaftar.' });
      }

      // Hash password dan simpan user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const userId = await UserModel.createUser(name, email, hashedPassword);

      return res.status(201).json({
        success: true,
        message: 'Registrasi berhasil.',
        data: { user: { id: userId, name, email } }
      });
    } catch (error) {
      console.error('Register error:', error);
      return res.status(500).json({ success: false, message: 'Terjadi kesalahan server saat registrasi.' });
    }
  },

  /**
   * Proses Login User
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email dan password harus diisi.' });
      }

      // Cari user berdasarkan email
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ success: false, message: 'Kredensial tidak valid.' });
      }

      // Verifikasi password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Kredensial tidak valid.' });
      }

      // Simpan session (karena ketua pake express-session di server.js)
      req.session.userId = user.id;
      req.session.email = user.email;

      return res.json({
        success: true,
        message: 'Login berhasil.',
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ success: false, message: 'Terjadi kesalahan server saat login.' });
    }
  }
};

module.exports = AuthController;
