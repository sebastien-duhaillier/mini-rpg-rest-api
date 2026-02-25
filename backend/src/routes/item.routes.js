const express = require("express");
const router = express.Router();
const ItemController = require("../controllers/item.controller");
const auth = require("../middleware/auth.middleware");

// Tout items = protégé
router.get("/", auth, ItemController.getAll);

// ⚠️ Route spécifique AVANT "/:id"
router.get("/character/:characterId", auth, ItemController.getByCharacter);

router.get("/:id", auth, ItemController.getById);

router.post("/", auth, ItemController.create);

router.put("/:id", auth, ItemController.update);

router.delete("/:id", auth, ItemController.delete);

module.exports = router;