const pool = require("../config/db");

const Spell = {
  getAll: async () => {
    const res = await pool.query(
      "SELECT * FROM spells ORDER BY id"
    );
    return res.rows;
  },

  getByCharacterId: async (character_id) => {
    const res = await pool.query(
      "SELECT * FROM spells WHERE character_id = $1 ORDER BY id",
      [character_id]
    );
    return res.rows;
  },

  getById: async (id) => {
    const res = await pool.query(
      "SELECT * FROM spells WHERE id = $1",
      [id]
    );
    return res.rows[0];
  },

  create: async (character_id, name, mana_cost, effect) => {
    const res = await pool.query(
      `INSERT INTO spells (character_id, name, mana_cost, effect)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [character_id, name, mana_cost, effect]
    );
    return res.rows[0];
  },

  delete: async (id) => {
    const res = await pool.query(
      "DELETE FROM spells WHERE id = $1 RETURNING id",
      [id]
    );
    return res.rows[0];
  }
};

module.exports = Spell;