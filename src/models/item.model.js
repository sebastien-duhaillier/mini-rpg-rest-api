const pool = require("../config/db");

const Item = {
  getAll: async () => {
    const res = await pool.query(
      "SELECT * FROM items ORDER BY id"
    );
    return res.rows;
  },

  getByCharacterId: async (character_id) => {
    const res = await pool.query(
      "SELECT * FROM items WHERE character_id = $1 ORDER BY id",
      [character_id]
    );
    return res.rows;
  },

  getById: async (id) => {
    const res = await pool.query(
      "SELECT * FROM items WHERE id = $1",
      [id]
    );
    return res.rows[0];
  },

  create: async (character_id, name, rarity = 'common') => {
    const res = await pool.query(
      `INSERT INTO items (character_id, name, rarity)
       VALUES ($1,$2,$3)
       RETURNING *`,
      [character_id, name, rarity]
    );
    return res.rows[0];
  },

  delete: async (id) => {
    const res = await pool.query(
      "DELETE FROM items WHERE id = $1 RETURNING id",
      [id]
    );
    return res.rows[0];
  }
};

module.exports = Item;