// src/models/character.model.js
const pool = require("../config/db");

const Character = {
  // (optionnel) admin/dev : tous les personnages
  getAll: async () => {
    const res = await pool.query(
      "SELECT id, user_id, name, level, experience, health, mana, class, created_at FROM characters ORDER BY id"
    );
    return res.rows;
  },

  // ✅ Persos d’un user (utilisé par GET /characters)
  getByUserId: async (user_id) => {
    const res = await pool.query(
      `SELECT id, user_id, name, level, experience, health, mana, class, created_at
       FROM characters
       WHERE user_id = $1
       ORDER BY id`,
      [user_id]
    );
    return res.rows;
  },

  // (optionnel) non sécurisé : perso par id
  getById: async (id) => {
    const res = await pool.query(
      "SELECT id, user_id, name, level, experience, health, mana, class, created_at FROM characters WHERE id = $1",
      [id]
    );
    return res.rows[0];
  },

  // ✅ Perso par id mais seulement si owned
  getByIdAndUser: async (id, user_id) => {
    const res = await pool.query(
      `SELECT id, user_id, name, level, experience, health, mana, class, created_at
       FROM characters
       WHERE id = $1 AND user_id = $2`,
      [id, user_id]
    );
    return res.rows[0];
  },

  // Créer un personnage
  create: async (user_id, name, level = 1, className = null) => {
    const res = await pool.query(
      `INSERT INTO characters (user_id, name, level, class)
       VALUES ($1, $2, $3, $4)
       RETURNING id, user_id, name, level, experience, health, mana, class, created_at`,
      [user_id, name, level, className]
    );
    return res.rows[0];
  },

  // (optionnel) update non sécurisé
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
      RETURNING id, user_id, name, level, experience, health, mana, class, created_at
    `;

    const res = await pool.query(query, values);
    return res.rows[0];
  },

  // ✅ Update seulement si owned
  updateOwned: async (id, user_id, fields) => {
    const setClauses = [];
    const values = [];
    let i = 1;

    for (const key in fields) {
      setClauses.push(`${key} = $${i}`);
      values.push(fields[key]);
      i++;
    }

    // si aucun champ à update
    if (setClauses.length === 0) return null;

    values.push(id);
    values.push(user_id);

    const query = `
      UPDATE characters
      SET ${setClauses.join(", ")}
      WHERE id = $${i} AND user_id = $${i + 1}
      RETURNING id, user_id, name, level, experience, health, mana, class, created_at
    `;

    const res = await pool.query(query, values);
    return res.rows[0];
  },

  // (optionnel) delete non sécurisé
  delete: async (id) => {
    const res = await pool.query(
      "DELETE FROM characters WHERE id = $1 RETURNING id",
      [id]
    );
    return res.rows[0];
  },

  // ✅ Delete seulement si owned
  deleteOwned: async (id, user_id) => {
    const res = await pool.query(
      "DELETE FROM characters WHERE id = $1 AND user_id = $2 RETURNING id",
      [id, user_id]
    );
    return res.rows[0];
  },

  // (optionnel) full non sécurisé
  getFullById: async (id) => {
    const charRes = await pool.query(
      "SELECT id, user_id, name, level, experience, health, mana, class, created_at FROM characters WHERE id = $1",
      [id]
    );
    const character = charRes.rows[0];
    if (!character) return null;

    const spellsRes = await pool.query(
      "SELECT id, character_id, name, mana_cost, effect, created_at FROM spells WHERE character_id = $1 ORDER BY id",
      [id]
    );
    character.spells = spellsRes.rows;

    const itemsRes = await pool.query(
      "SELECT id, character_id, name, rarity, created_at FROM items WHERE character_id = $1 ORDER BY id",
      [id]
    );
    character.items = itemsRes.rows;

    return character;
  },

  // ✅ Full + ownership check
  getFullByIdAndUser: async (id, user_id) => {
    const charRes = await pool.query(
      `SELECT id, user_id, name, level, experience, health, mana, class, created_at
       FROM characters
       WHERE id = $1 AND user_id = $2`,
      [id, user_id]
    );

    const character = charRes.rows[0];
    if (!character) return null;

    const spellsRes = await pool.query(
      "SELECT id, character_id, name, mana_cost, effect, created_at FROM spells WHERE character_id = $1 ORDER BY id",
      [id]
    );
    character.spells = spellsRes.rows;

    const itemsRes = await pool.query(
      "SELECT id, character_id, name, rarity, created_at FROM items WHERE character_id = $1 ORDER BY id",
      [id]
    );
    character.items = itemsRes.rows;

    return character;
  },
};

module.exports = Character;