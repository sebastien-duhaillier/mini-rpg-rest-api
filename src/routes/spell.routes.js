const express = require("express");
const router = express.Router();
const SpellController = require("../controllers/spell.controller");

router.get("/", SpellController.getAll);

router.get("/:id", SpellController.getById);

router.get("/character/:characterId", SpellController.getByCharacter);

router.post("/", SpellController.create);

router.put("/:id", SpellController.update);

router.delete("/:id", SpellController.delete);

module.exports = router;