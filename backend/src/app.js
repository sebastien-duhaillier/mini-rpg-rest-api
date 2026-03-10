// src/app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware CORS pour autoriser le frontend
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://mini-rpg-rest-api.vercel.app"
  ],
  credentials: true
}));

// Middleware pour parser le JSON
app.use(express.json());

// Import des routes
const userRoutes = require("./routes/user.routes");
app.use("/users", userRoutes);

const characterRoutes = require("./routes/character.routes");
app.use("/characters", characterRoutes);

const spellRoutes = require("./routes/spell.routes");
app.use("/spells", spellRoutes);

const itemRoutes = require("./routes/item.routes");
app.use("/items", itemRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);


// Route racine
app.get("/", (req, res) => {
  res.send("Bienvenue sur le mini RPG API ! 🚀");
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});