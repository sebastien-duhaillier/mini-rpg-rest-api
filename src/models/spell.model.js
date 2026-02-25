const pool = require("../config/db");

const Spell = {
  // (optionnel/dev) tous les spells
  getAll: async () => {
    const res = await pool.query("SELECT * FROM spells ORDER BY id");
    return res.rows;
  },

  // ✅ tous les spells du user connecté
  getByUserId: async (user_id) => {
    const res = await pool.query(
      `
      SELECT spells.*
      FROM spells
      JOIN characters ON characters.id = spells.character_id
      WHERE characters.user_id = $1
      ORDER BY spells.id
      `,
      [user_id]
    );
    return res.rows;
  },

  // spells d’un personnage (à utiliser après check ownership côté controller)
  getByCharacterId: async (character_id) => {
    const res = await pool.query(
      "SELECT * FROM spells WHERE character_id = $1 ORDER BY id",
      [character_id]
    );
    return res.rows;
  },

  // (optionnel) spell par id (non sécurisé)
  getById: async (id) => {
    const res = await pool.query("SELECT * FROM spells WHERE id = $1", [id]);
    return res.rows[0];
  },

  // ✅ spell par id mais seulement si owned
  getByIdAndUser: async (id, user_id) => {
    const res = await pool.query(
      `
      SELECT spells.*
      FROM spells
      JOIN characters ON characters.id = spells.character_id
      WHERE spells.id = $1
        AND characters.user_id = $2
      `,
      [id, user_id]
    );
    return res.rows[0];
  },

  // créer un spell (ownership check dans controller)
  create: async (character_id, name, mana_cost = 10, effect = null) => {
    const res = await pool.query(
      `
      INSERT INTO spells (character_id, name, mana_cost, effect)
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [character_id, name, mana_cost, effect]
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
      UPDATE spells
      SET ${setClauses.join(", ")}
      FROM characters
      WHERE spells.id = $${i}
        AND spells.character_id = characters.id
        AND characters.user_id = $${i + 1}
      RETURNING spells.*
      `,
      values
    );

    return res.rows[0];
  },

  // (optionnel) delete non sécurisé
  delete: async (id) => {
    const res = await pool.query(
      "DELETE FROM spells WHERE id = $1 RETURNING id",
      [id]
    );
    return res.rows[0];
  },

  // ✅ delete seulement si owned
  deleteOwned: async (id, user_id) => {
    const res = await pool.query(
      `
      DELETE FROM spells
      USING characters
      WHERE spells.id = $1
        AND spells.character_id = characters.id
        AND characters.user_id = $2
      RETURNING spells.id
      `,
      [id, user_id]
    );
    return res.rows[0];
  },
};

module.exports = Spell;