const Spell = require("../models/spell.model");
const Character = require("../models/character.model");

const SpellController = {
  // ✅ spells du user connecté
  getAll: async (req, res) => {
    try {
      const spells = await Spell.getByUserId(req.user.id);
      res.json(spells);
    } catch (err) {
      console.error("Erreur getAll spells:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // ✅ spell seulement si owned
  getById: async (req, res) => {
    try {
      const spell = await Spell.getByIdAndUser(req.params.id, req.user.id);
      if (!spell) return res.status(404).json({ error: "Sort non trouvé" });
      res.json(spell);
    } catch (err) {
      console.error("Erreur getById spell:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // ✅ spells d’un personnage seulement si le perso appartient au user
  getByCharacter: async (req, res) => {
    try {
      const characterId = req.params.characterId;

      const character = await Character.getByIdAndUser(characterId, req.user.id);
      if (!character) return res.status(404).json({ error: "Personnage non trouvé" });

      const spells = await Spell.getByCharacterId(characterId);
      res.json(spells);
    } catch (err) {
      console.error("Erreur getByCharacter spells:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // ✅ création : vérifier ownership du character_id
  create: async (req, res) => {
    try {
      const { character_id, name, mana_cost, effect } = req.body;

      const character = await Character.getByIdAndUser(character_id, req.user.id);
      if (!character) return res.status(403).json({ error: "Personnage interdit" });

      const spell = await Spell.create(character_id, name, mana_cost, effect);
      res.status(201).json(spell);
    } catch (err) {
      console.error("Erreur create spell:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // ✅ update : seulement si owned
  update: async (req, res) => {
    try {
      // sécurité : empêcher de changer le character_id par update
      if ("character_id" in req.body) delete req.body.character_id;

      const spell = await Spell.updateOwned(req.params.id, req.user.id, {
        name: req.body.name,
        mana_cost: req.body.mana_cost,
        effect: req.body.effect,
      });

      if (!spell) return res.status(404).json({ error: "Sort non trouvé" });
      res.json(spell);
    } catch (err) {
      console.error("Erreur update spell:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // ✅ delete : seulement si owned
  delete: async (req, res) => {
    try {
      const deleted = await Spell.deleteOwned(req.params.id, req.user.id);
      if (!deleted) return res.status(404).json({ error: "Sort non trouvé" });
      res.json({ message: "Sort supprimé", id: deleted.id });
    } catch (err) {
      console.error("Erreur delete spell:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },
};

module.exports = SpellController;