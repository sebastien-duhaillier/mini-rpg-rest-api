// src/models/user.model.js
const pool = require("../config/db");

const User = {
  // Récupérer tous les utilisateurs (sans le mot de passe)
  getAll: async () => {
    const res = await pool.query(
      "SELECT id, username, email, created_at FROM users ORDER BY id"
    );
    return res.rows;
  },

  // Récupérer un utilisateur par son id
  getById: async (id) => {
    const res = await pool.query(
      "SELECT id, username, email, created_at FROM users WHERE id = $1",
      [id]
    );
    return res.rows[0];
  },

  // Créer un nouvel utilisateur
  create: async (username, password, email) => {
    const res = await pool.query(
      "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id, username, email, created_at",
      [username, password, email]
    );
    return res.rows[0];
  },

  // Mettre à jour un utilisateur existant
  update: async (id, username, email) => {
    const res = await pool.query(
      "UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email, created_at",
      [username, email, id]
    );
    return res.rows[0];
  },

  // Supprimer un utilisateur
  delete: async (id) => {
    const res = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [id]
    );
    return res.rows[0];
  },
};

module.exports = User;