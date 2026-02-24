// src/controllers/character.controller.js
const Character = require("../models/character.model");

const CharacterController = {
  // ✅ Renvoie seulement les personnages du user connecté
  getAll: async (req, res) => {
    try {
      const characters = await Character.getByUserId(req.user.id);
      res.json(characters);
    } catch (err) {
      console.error("Erreur récupération characters :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // ✅ Vérifie que le personnage appartient au user
  getById: async (req, res) => {
    try {
      const character = await Character.getByIdAndUser(req.params.id, req.user.id);
      if (!character) return res.status(404).json({ error: "Personnage non trouvé" });
      res.json(character);
    } catch (err) {
      console.error("Erreur récupération character :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // ✅ Full + ownership check
  getFullById: async (req, res) => {
    try {
      const character = await Character.getFullByIdAndUser(req.params.id, req.user.id);
      if (!character) return res.status(404).json({ error: "Personnage non trouvé" });
      res.json(character);
    } catch (err) {
      console.error("Erreur récupération character complet :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // ✅ Ignore user_id venant du client
  create: async (req, res) => {
    try {
      const user_id = req.user.id;
      const { name, level, className } = req.body;

      const newChar = await Character.create(user_id, name, level, className);
      res.status(201).json(newChar);
    } catch (err) {
      console.error("Erreur création character :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // ✅ Update seulement si owned
  update: async (req, res) => {
    try {
      // sécurité : empêcher de changer user_id
      if ("user_id" in req.body) delete req.body.user_id;

      const updatedChar = await Character.updateOwned(req.params.id, req.user.id, req.body);
      if (!updatedChar) return res.status(404).json({ error: "Personnage non trouvé" });
      res.json(updatedChar);
    } catch (err) {
      console.error("Erreur update character :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // ✅ Delete seulement si owned
  delete: async (req, res) => {
    try {
      const deletedChar = await Character.deleteOwned(req.params.id, req.user.id);
      if (!deletedChar) return res.status(404).json({ error: "Personnage non trouvé" });
      res.json({ message: "Personnage supprimé", id: deletedChar.id });
    } catch (err) {
      console.error("Erreur delete character :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },
};

module.exports = CharacterController;