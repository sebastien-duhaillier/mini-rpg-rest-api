const Item = require("../models/item.model");
const Character = require("../models/character.model");

const ItemController = {
  // ✅ seulement items du user connecté
  getAll: async (req, res) => {
    try {
      const items = await Item.getByUserId(req.user.id);
      res.json(items);
    } catch (err) {
      console.error("Erreur getAll items:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // ✅ item seulement si owned
  getById: async (req, res) => {
    try {
      const item = await Item.getByIdAndUser(req.params.id, req.user.id);
      if (!item) return res.status(404).json({ error: "Objet non trouvé" });
      res.json(item);
    } catch (err) {
      console.error("Erreur getById item:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // ✅ items d’un personnage seulement si le perso appartient au user
  getByCharacter: async (req, res) => {
    try {
      const characterId = req.params.characterId;

      const character = await Character.getByIdAndUser(characterId, req.user.id);
      if (!character) return res.status(404).json({ error: "Personnage non trouvé" });

      const items = await Item.getByCharacterId(characterId);
      res.json(items);
    } catch (err) {
      console.error("Erreur getByCharacter items:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // ✅ création : vérifier ownership du character_id
  create: async (req, res) => {
    try {
      const { character_id, name, rarity } = req.body;

      const character = await Character.getByIdAndUser(character_id, req.user.id);
      if (!character) return res.status(403).json({ error: "Personnage interdit" });

      const item = await Item.create(character_id, name, rarity);
      res.status(201).json(item);
    } catch (err) {
      console.error("Erreur create item:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // ✅ update : seulement si owned
  update: async (req, res) => {
    try {
      const { name, rarity } = req.body;

      const item = await Item.updateOwned(req.params.id, req.user.id, {
        name,
        rarity,
      });

      if (!item) return res.status(404).json({ error: "Objet non trouvé" });

      res.json(item);
    } catch (err) {
      console.error("Erreur update item:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // ✅ delete : seulement si owned
  delete: async (req, res) => {
    try {
      const deleted = await Item.deleteOwned(req.params.id, req.user.id);
      if (!deleted) return res.status(404).json({ error: "Objet non trouvé" });
      res.json({ message: "Objet supprimé", id: deleted.id });
    } catch (err) {
      console.error("Erreur delete item:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },
};

module.exports = ItemController;