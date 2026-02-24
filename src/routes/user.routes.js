// src/routes/user.routes.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

// 📌 Récupérer tous les utilisateurs
router.get("/", UserController.getAllUsers);

// 📌 Récupérer les personnages d’un utilisateur
router.get("/:id/characters", UserController.getCharacters);

// 📌 Récupérer un utilisateur par ID
router.get("/:id", UserController.getUserById);

// 📌 Créer un nouvel utilisateur
router.post("/", UserController.createUser);

// 📌 Mettre à jour un utilisateur existant
router.put("/:id", UserController.updateUser);

// 📌 Supprimer un utilisateur
router.delete("/:id", UserController.deleteUser);

module.exports = router;