const pool = require("../config/db");

const Item = {
  // (optionnel/dev) Tous les items (non sécurisé)
  getAll: async () => {
    const res = await pool.query("SELECT * FROM items ORDER BY id");
    return res.rows;
  },

  // ✅ Tous les items du user connecté (via JOIN characters)
  getByUserId: async (user_id) => {
    const res = await pool.query(
      `
      SELECT items.*
      FROM items
      JOIN characters ON characters.id = items.character_id
      WHERE characters.user_id = $1
      ORDER BY items.id
      `,
      [user_id]
    );
    return res.rows;
  },

  // Items d’un personnage (à utiliser seulement après vérif ownership côté controller)
  getByCharacterId: async (character_id) => {
    const res = await pool.query(
      "SELECT * FROM items WHERE character_id = $1 ORDER BY id",
      [character_id]
    );
    return res.rows;
  },

  // (optionnel) item par id (non sécurisé)
  getById: async (id) => {
    const res = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
    return res.rows[0];
  },

  // ✅ item par id mais seulement si owned
  getByIdAndUser: async (id, user_id) => {
    const res = await pool.query(
      `
      SELECT items.*
      FROM items
      JOIN characters ON characters.id = items.character_id
      WHERE items.id = $1
        AND characters.user_id = $2
      `,
      [id, user_id]
    );
    return res.rows[0];
  },

  // Récupérer tous les items publics globaux
  getPublic: async () => {
    const res = await pool.query(
      "SELECT * FROM items WHERE is_public = true AND character_id IS NULL ORDER BY id"
    );
    return res.rows;
  },

  // Créer un item (ownership check dans controller)
  create: async (character_id, name, rarity = "common", is_public = false) => {
    const res = await pool.query(
      `
      INSERT INTO items (character_id, name, rarity, is_public)
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [character_id, name, rarity, is_public]
    );
    return res.rows[0];
  },

  // ✅ update seulement si owned
  updateOwned: async (id, user_id, fields) => {
    const setClauses = [];
    const values = [];
    let i = 1;

    for (const key in fields) {
      if (fields[key] === undefined) continue;
      setClauses.push(`${key} = $${i}`);
      values.push(fields[key]);
      i++;
    }

    if (setClauses.length === 0) return null;

    values.push(id);
    values.push(user_id);

    const res = await pool.query(
      `
      UPDATE items
      SET ${setClauses.join(", ")}
      FROM characters
      WHERE items.id = $${i}
        AND items.character_id = characters.id
        AND characters.user_id = $${i + 1}
      RETURNING items.*
      `,
      values
    );

    return res.rows[0];
  },

  // (optionnel) delete non sécurisé
  delete: async (id) => {
    const res = await pool.query(
      "DELETE FROM items WHERE id = $1 RETURNING id",
      [id]
    );
    return res.rows[0];
  },

  // ✅ delete seulement si owned (via USING + characters)
  deleteOwned: async (id, user_id) => {
    const res = await pool.query(
      `
      DELETE FROM items
      USING characters
      WHERE items.id = $1
        AND items.character_id = characters.id
        AND characters.user_id = $2
      RETURNING items.id
      `,
      [id, user_id]
    );
    return res.rows[0];
  },

  // Supprimer l’item public du personnage (sans supprimer l’item global)
  deleteFromCharacter: async (item_id, character_id) => {
    const res = await pool.query(
      "DELETE FROM items WHERE id = $1 AND character_id = $2 RETURNING id",
      [item_id, character_id]
    );
    return res.rows[0];
  },
};

module.exports = Item;