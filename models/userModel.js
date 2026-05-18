const db = require('./db').promise();

const UserModel = {
  /**
   * Menambahkan user baru ke database (Register)
   */
  async createUser(name, email, hashedPassword) {
    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    const [result] = await db.query(query, [name, email, hashedPassword]);
    return result.insertId;
  },

  /**
   * Mencari user berdasarkan email (Login & Validasi Register)
   */
  async findByEmail(email) {
    const query = `SELECT * FROM users WHERE email = ? LIMIT 1`;
    const [rows] = await db.query(query, [email]);
    return rows[0];
  }
};

module.exports = UserModel;
