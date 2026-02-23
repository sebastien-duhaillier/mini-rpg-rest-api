// src/models/character.model.js
const pool = require("../config/db");

const Character = {
  getAll: async () => {
    const res = await pool.query(
      "SELECT id, user_id, name, level FROM characters ORDER BY id"
    );
    return res.rows;
  },

  getById: async (id) => {
    const res = await pool.query(
      "SELECT id, user_id, name, level FROM characters WHERE id = $1",
      [id]
    );
    return res.rows[0];
  },

  create: async (user_id, name, level = 1) => {
    const res = await pool.query(
      "INSERT INTO characters (user_id, name, level) VALUES ($1, $2, $3) RETURNING id, user_id, name, level",
      [user_id, name, level]
    );
    return res.rows[0];
  },

  update: async (id, fields) => {
    const setClauses = [];
    const values = [];
    let i = 1;

    for (const key in fields) {
      setClauses.push(`${key} = $${i}`);
      values.push(fields[key]);
      i++;
    }

    values.push(id);

    const query = `
      UPDATE characters 
      SET ${setClauses.join(", ")} 
      WHERE id = $${i} 
      RETURNING id, user_id, name, level
    `;

    const res = await pool.query(query, values);
    return res.rows[0];
  },

  delete: async (id) => {
    const res = await pool.query(
      "DELETE FROM characters WHERE id = $1 RETURNING id",
      [id]
    );
    return res.rows[0];
  },
};

module.exports = Character;