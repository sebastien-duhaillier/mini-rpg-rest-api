// src/controllers/user.controller.js
const User = require("../models/user.model");

const UserController = {
  // Récupérer tous les utilisateurs
  getAllUsers: async (req, res) => {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (err) {
      console.error("Erreur récupération utilisateurs :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // Récupérer un utilisateur par ID
  getUserById: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await User.getById(id);

      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      res.json(user);
    } catch (err) {
      console.error("Erreur récupération utilisateur :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // Créer un nouvel utilisateur
  createUser: async (req, res) => {
    try {
      const { username, password, email } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Username et password obligatoires" });
      }

      const newUser = await User.create(username, password, email);
      res.status(201).json(newUser);
    } catch (err) {
      console.error("Erreur création utilisateur :", err);
      // Gérer l'erreur de duplication de username
      if (err.code === "23505") {
        return res.status(409).json({ error: "Nom d'utilisateur déjà utilisé" });
      }
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // Mettre à jour un utilisateur existant
  updateUser: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { username, email } = req.body;

      const updatedUser = await User.update(id, username, email);

      if (!updatedUser) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      res.json(updatedUser);
    } catch (err) {
      console.error("Erreur mise à jour utilisateur :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // Supprimer un utilisateur
  deleteUser: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deletedUser = await User.delete(id);

      if (!deletedUser) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      res.json({ message: "Utilisateur supprimé avec succès", id: deletedUser.id });
    } catch (err) {
      console.error("Erreur suppression utilisateur :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },
};

module.exports = UserController;