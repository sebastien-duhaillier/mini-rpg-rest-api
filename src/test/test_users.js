require("dotenv").config();
const fetch = require("node-fetch"); // CommonJS

const BASE_URL = `http://localhost:${process.env.PORT || 3000}/users`;

async function testUsers() {
  try {
    console.log("🔹 TEST: GET all users");
    let res = await fetch(BASE_URL);
    let data = await res.json();
    console.log(data);

    console.log("\n🔹 TEST: POST create user");
    res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "test_user",
        password: "test123", // tu hashers plus tard
        email: "test_user@mail.com",
      }),
    });
    data = await res.json();
    console.log(data);

    const newUserId = data.id;

    console.log("\n🔹 TEST: GET user by ID");
    res = await fetch(`${BASE_URL}/${newUserId}`);
    data = await res.json();
    console.log(data);

    console.log("\n🔹 TEST: PUT update user");
    res = await fetch(`${BASE_URL}/${newUserId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "updated_user",
        email: "updated_user@mail.com",
      }),
    });
    data = await res.json();
    console.log(data);

    console.log("\n🔹 TEST: DELETE user");
    res = await fetch(`${BASE_URL}/${newUserId}`, { method: "DELETE" });
    data = await res.json();
    console.log(data);

    console.log("\n✅ Tous les tests users sont terminés !");
  } catch (err) {
    console.error("❌ Erreur lors des tests :", err);
  }
}

// Lancement du test
testUsers();