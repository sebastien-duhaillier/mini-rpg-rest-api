const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Suppression du pool.connect() pour éviter la coupure de connexion inattendue
// pool.connect()
//   .then(() => console.log("✅ Connecté à PostgreSQL"))
//   .catch((err) => console.error("❌ Erreur connexion DB", err));

module.exports = pool;
