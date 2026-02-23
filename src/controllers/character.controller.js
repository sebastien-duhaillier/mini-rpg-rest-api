// src/controllers/character.controller.js
const Character = require("../models/character.model");



const CharacterController = {
  getAll: async (req, res) => {
    try {
      const characters = await Character.getAll();
      res.json(characters);
    } catch (err) {
      console.error("Erreur récupération characters :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  getById: async (req, res) => {
    try {
      const character = await Character.getById(req.params.id);
      if (!character) return res.status(404).json({ error: "Personnage non trouvé" });
      res.json(character);
    } catch (err) {
      console.error("Erreur récupération character :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  create: async (req, res) => {
    try {
      const { user_id, name, level, className } = req.body;
      const newChar = await Character.create(user_id, name, level, className);
      res.status(201).json(newChar);
    } catch (err) {
      console.error("Erreur création character :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  update: async (req, res) => {
    try {
      const updatedChar = await Character.update(req.params.id, req.body);
      if (!updatedChar) return res.status(404).json({ error: "Personnage non trouvé" });
      res.json(updatedChar);
    } catch (err) {
      console.error("Erreur update character :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  delete: async (req, res) => {
    try {
      const deletedChar = await Character.delete(req.params.id);
      if (!deletedChar) return res.status(404).json({ error: "Personnage non trouvé" });
      res.json({ message: "Personnage supprimé", id: deletedChar.id });
    } catch (err) {
      console.error("Erreur delete character :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },
};

module.exports = CharacterController;