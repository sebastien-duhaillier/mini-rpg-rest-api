const Spell = require("../models/spell.model");

const SpellController = {

  getAll: async (req, res) => {
    try {
      const spells = await Spell.getAll();
      res.json(spells);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  getById: async (req, res) => {
    try {
      const spell = await Spell.getById(req.params.id);
      if (!spell) {
        return res.status(404).json({ error: "Sort non trouvé" });
      }
      res.json(spell);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  getByCharacter: async (req, res) => {
    try {
      const spells = await Spell.getByCharacterId(req.params.characterId);
      res.json(spells);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  create: async (req, res) => {
    try {
      const { character_id, name, mana_cost, effect } = req.body;
      const spell = await Spell.create(
        character_id,
        name,
        mana_cost,
        effect
      );
      res.status(201).json(spell);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  update: async (req, res) => {
    try {
      const { name, mana_cost, effect } = req.body;
      const spell = await Spell.update(req.params.id, { name, mana_cost, effect });
      if (!spell) {
        return res.status(404).json({ error: "Sort non trouvé" });
      }
      res.json(spell);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  delete: async (req, res) => {
    try {
      const spell = await Spell.delete(req.params.id);
      res.json(spell);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

};

module.exports = SpellController;