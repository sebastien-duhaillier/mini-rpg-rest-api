// src/app.js
require("dotenv").config();
const express = require("express");

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Import des routes
const userRoutes = require("./routes/user.routes");

// Utilisation des routes
app.use("/users", userRoutes);

// Route racine
app.get("/", (req, res) => {
  res.send("Bienvenue sur le mini RPG API ! 🚀");
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});