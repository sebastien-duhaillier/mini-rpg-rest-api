// test/test_characters.js
require("dotenv").config();
const fetch = require("node-fetch");

const BASE_URL = `http://localhost:${process.env.PORT || 3000}/characters`;

async function testCharacters() {
  try {
    console.log("🔹 GET all characters");
    let res = await fetch(BASE_URL);
    let data = await res.json();
    console.log(data);

    console.log("\n🔹 POST create character");
    res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: 1,          // Assure-toi que l'utilisateur existe
        name: "TestHero",
        level: 1,
        class: "Rogue",
        health: 100,
        mana: 50,
      }),
    });
    data = await res.json();
    console.log(data);

    const newCharId = data.id;

    console.log("\n🔹 GET character by ID");
    res = await fetch(`${BASE_URL}/${newCharId}`);
    data = await res.json();
    console.log(data);

    console.log("\n🔹 PUT update character");
    res = await fetch(`${BASE_URL}/${newCharId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "UpdatedHero",
        level: 2,
        class: "Warrior",
        health: 120,
        mana: 60,
      }),
    });
    data = await res.json();
    console.log(data);

    console.log("\n🔹 DELETE character");
    res = await fetch(`${BASE_URL}/${newCharId}`, { method: "DELETE" });
    data = await res.json();
    console.log(data);

    console.log("\n✅ Tous les tests characters sont terminés !");
  } catch (err) {
    console.error("❌ Erreur lors des tests :", err);
  }
}

testCharacters();