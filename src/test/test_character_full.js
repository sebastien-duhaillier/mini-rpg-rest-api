// src/test/test_characters_full.js
require("dotenv").config();
const fetch = require("node-fetch"); // ✅ CommonJS

const BASE_URL = `http://localhost:${process.env.PORT || 3000}/characters`;

async function testCharactersFull() {
  try {
    console.log("🔹 GET full character by ID (1)");
    let res = await fetch(`${BASE_URL}/1/full`);
    let data = await res.json();
    console.log(JSON.stringify(data, null, 2));

    console.log("\n🔹 GET full character by ID (non existant)");
    res = await fetch(`${BASE_URL}/9999/full`);
    data = await res.json();
    console.log(data);

    console.log("\n✅ Test characters full terminé !");
  } catch (err) {
    console.error("❌ Erreur lors du test characters full :", err);
  }
}

testCharactersFull();