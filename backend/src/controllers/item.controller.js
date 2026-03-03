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
      const { character_id, name, rarity, is_public, item_id } = req.body;
      const character = await Character.getByIdAndUser(character_id, req.user.id);
      if (!character) return res.status(403).json({ error: "Personnage interdit" });
      if (item_id) {
        // Ajout d’un item public global à ce personnage (copie de l’item public)
        const publicItem = await Item.getById(item_id);
        if (!publicItem || !publicItem.is_public || publicItem.character_id !== null) return res.status(404).json({ error: "Item public non trouvé" });
        const item = await Item.create(character_id, publicItem.name, publicItem.rarity, true);
        return res.status(201).json(item);
      } else {
        // Validation du nom
        if (!name || !name.trim()) return res.status(400).json({ error: "Le nom de l'item est obligatoire" });
        if (is_public) {
          // Création d’un item public global (character_id=NULL)
          const item = await Item.create(null, name, rarity, true);
          return res.status(201).json(item);
        } else {
          // Création d’un item privé pour le personnage
          const item = await Item.create(character_id, name, rarity, false);
          return res.status(201).json(item);
        }
      }
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
      // Récupérer l’item
      const item = await Item.getById(req.params.id);
      if (!item) return res.status(404).json({ error: "Objet non trouvé" });
      // Si public, retirer l’association au personnage (supprimer l’item du personnage)
      if (item.is_public) {
        // On supprime l’item du personnage (l’item global reste)
        await Item.deleteFromCharacter(item.id, item.character_id);
        return res.json({ message: "Item public retiré du personnage", id: item.id });
      } else {
        // Si privé, supprimer l’item de la BDD
        const deleted = await Item.deleteOwned(req.params.id, req.user.id);
        if (!deleted) return res.status(404).json({ error: "Objet non trouvé ou non autorisé" });
        return res.json({ message: "Item privé supprimé", id: deleted.id });
      }
    } catch (err) {
      console.error("Erreur delete item:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // Récupérer tous les items publics
  getPublic: async (req, res) => {
    try {
      const items = await Item.getPublic();
      res.json(items);
    } catch (err) {
      console.error("Erreur getPublic items:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },
};

module.exports = ItemController;