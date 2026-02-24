const Item = require("../models/item.model");

const ItemController = {

  getAll: async (req, res) => {
    try {
      const items = await Item.getAll();
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  getById: async (req, res) => {
    try {
      const item = await Item.getById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Objet non trouvé" });
      }
      res.json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  getByCharacter: async (req, res) => {
    try {
      const items = await Item.getByCharacterId(req.params.characterId);
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  create: async (req, res) => {
    try {
      const { character_id, name, rarity } = req.body;
      const item = await Item.create(character_id, name, rarity);
      res.status(201).json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  update: async (req, res) => {
    try {
      const { name, rarity } = req.body;
      const item = await Item.update(req.params.id, { name, rarity });
      if (!item) {
        return res.status(404).json({ error: "Objet non trouvé" });
      }
      res.json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  delete: async (req, res) => {
    try {
      const item = await Item.delete(req.params.id);
      res.json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

};

module.exports = ItemController;