const pool = require("../config/db");

const Auth = {

  // Trouver un utilisateur par username
  findByUsername: async (username) => {
    const res = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    return res.rows[0];
  },

  // Créer un utilisateur avec mot de passe hashé
  createUser: async (username, passwordHash, email) => {
    const res = await pool.query(
      `INSERT INTO users (username, password, email)
       VALUES ($1, $2, $3)
       RETURNING id, username, email, created_at`,
      [username, passwordHash, email]
    );

    return res.rows[0];
  }

};

module.exports = Auth;