const express = require("express");
const router = express.Router();
const SpellController = require("../controllers/spell.controller");
const auth = require("../middleware/auth.middleware");

// tout protégé
router.get("/", auth, SpellController.getAll);

// ⚠️ spécifique avant "/:id"
router.get("/character/:characterId", auth, SpellController.getByCharacter);

router.get("/:id", auth, SpellController.getById);

router.post("/", auth, SpellController.create);

router.put("/:id", auth, SpellController.update);

router.delete("/:id", auth, SpellController.delete);

module.exports = router;