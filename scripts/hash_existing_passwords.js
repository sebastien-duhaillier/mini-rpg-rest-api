require("dotenv").config();
const bcrypt = require("bcrypt");
const pool = require("../src/config/db");

(async () => {
  try {
    const { rows: users } = await pool.query(
      "SELECT id, username, password FROM users WHERE password NOT LIKE '$2%'"
    );

    console.log(`👀 Users à migrer: ${users.length}`);

    for (const u of users) {
      const hash = await bcrypt.hash(u.password, 10);
      await pool.query("UPDATE users SET password = $1 WHERE id = $2", [hash, u.id]);
      console.log(`✅ ${u.username} migré`);
    }

    console.log("🎉 Migration terminée !");
  } catch (err) {
    console.error("❌ Erreur migration:", err);
  } finally {
    await pool.end();
  }
})();