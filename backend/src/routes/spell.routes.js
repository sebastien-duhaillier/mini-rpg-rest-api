const express = require("express");
const router = express.Router();
const SpellController = require("../controllers/spell.controller");
const auth = require("../middleware/auth.middleware");

// route pour récupérer les sorts publics globaux
router.get("/public", SpellController.getPublic);

// tout protégé
router.get("/", auth, SpellController.getAll);

// ⚠️ spécifique avant "/:id"
router.get("/character/:characterId", auth, SpellController.getByCharacter);

router.get("/:id", auth, SpellController.getById);

router.post("/public", auth, SpellController.createPublic);

router.post("/", auth, SpellController.create);

router.put("/:id", auth, SpellController.update);

router.delete("/:id", auth, SpellController.delete);

module.exports = router;