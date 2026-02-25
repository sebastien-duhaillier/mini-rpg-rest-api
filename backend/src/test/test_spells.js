require("dotenv").config();
const fetch = require("node-fetch");

const BASE_URL = `http://localhost:${process.env.PORT || 3000}/spells`;

async function testSpells() {
  try {
    console.log("🔹 GET all spells");
    let res = await fetch(BASE_URL);
    let data = await res.json();
    console.log(data);

    console.log("\n🔹 POST create spell");
    res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        character_id: 1,
        name: "Fireball",
        mana_cost: 20,
        effect: "Inflige 30 points de dégâts"
      }),
    });
    data = await res.json();
    console.log(data);

    const newSpellId = data.id;

    console.log("\n🔹 GET spell by ID");
    res = await fetch(`${BASE_URL}/${newSpellId}`);
    data = await res.json();
    console.log(data);

    console.log("\n🔹 PUT update spell");
    res = await fetch(`${BASE_URL}/${newSpellId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Mega Fireball", mana_cost: 25 }),
    });
    data = await res.json();
    console.log(data);

    console.log("\n🔹 DELETE spell");
    res = await fetch(`${BASE_URL}/${newSpellId}`, { method: "DELETE" });
    data = await res.json();
    console.log(data);

    console.log("\n✅ Tous les tests spells sont terminés !");
  } catch (err) {
    console.error("❌ Erreur lors des tests spells :", err);
  }
}

testSpells();