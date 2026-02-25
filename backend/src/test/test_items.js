require("dotenv").config();
const fetch = require("node-fetch");

const BASE_URL = `http://localhost:${process.env.PORT || 3000}/items`;

async function testItems() {
  try {
    console.log("🔹 GET all items");
    let res = await fetch(BASE_URL);
    let data = await res.json();
    console.log(data);

    console.log("\n🔹 POST create item");
    res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        character_id: 1,
        name: "Épée de Feu",
        rarity: "rare"
      }),
    });
    data = await res.json();
    console.log(data);

    const newItemId = data.id;

    console.log("\n🔹 GET item by ID");
    res = await fetch(`${BASE_URL}/${newItemId}`);
    data = await res.json();
    console.log(data);

    console.log("\n🔹 PUT update item");
    res = await fetch(`${BASE_URL}/${newItemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Épée de Feu Légendaire", bonus: "+20 attaque" }),
    });
    data = await res.json();
    console.log(data);

    console.log("\n🔹 DELETE item");
    res = await fetch(`${BASE_URL}/${newItemId}`, { method: "DELETE" });
    data = await res.json();
    console.log(data);

    console.log("\n✅ Tous les tests items sont terminés !");
  } catch (err) {
    console.error("❌ Erreur lors des tests items :", err);
  }
}

testItems();