// src/routes/user.routes.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

// 📌 Récupérer tous les utilisateurs
router.get("/", auth, admin, UserController.getAllUsers);

// 📌 Récupérer les personnages d’un utilisateur
router.get("/:id/characters", UserController.getCharacters);

// 📌 Récupérer un utilisateur par ID
router.get("/:id", UserController.getUserById);

// router.post('/', UserController.createUser); // Désactivé : création uniquement via /auth/register

// 📌 Mettre à jour un utilisateur existant
router.put("/:id", UserController.updateUser);

// 📌 Supprimer un utilisateur
router.delete("/:id", auth, admin, UserController.deleteUser);

// 📌 Récupérer le profil de l'utilisateur connecté
router.get("/me", auth, UserController.getMe);

module.exports = router;