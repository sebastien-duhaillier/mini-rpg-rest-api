// run_sql.js
require("dotenv").config(); // <-- charge le .env
const { exec } = require("child_process");
const path = require("path");

const sqlFolder = path.join(__dirname, "..", "create_db");
const files = ["01_create_tables.sql", "02_insert_data.sql"];

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const database = process.env.DB_NAME;
const password = process.env.DB_PASSWORD; // <-- récupère le mot de passe

function runFile(file) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(sqlFolder, file);

    // Commande psql, le mot de passe sera fourni par PGPASSWORD
    const cmd = `psql -h ${host} -U ${user} -d ${database} -f "${filePath}"`;

    console.log(`\n➡️  Exécution : ${file}`);

    // Passe le mot de passe via PGPASSWORD
    const child = exec(cmd, { env: { ...process.env, PGPASSWORD: password } }, (err, stdout, stderr) => {
      if (err) {
        console.error(`❌ Erreur sur ${file} :`, stderr);
        reject(err);
      } else {
        console.log(stdout);
        resolve();
      }
    });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  });
}

(async () => {
  for (const file of files) {
    await runFile(file);
  }
  console.log("\n✅ Tous les fichiers SQL ont été exécutés !");
})();