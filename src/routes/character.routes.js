// src/routes/character.routes.js
const express = require("express");
const router = express.Router();
const characterController = require("../controllers/character.controller");
const auth = require("../middleware/auth.middleware"); // ✅ AJOUT

// Routes Characters (protégées)
router.get("/", auth, characterController.getAll);
router.get("/:id/full", auth, characterController.getFullById);
router.get("/:id", auth, characterController.getById);
router.post("/", auth, characterController.create);
router.put("/:id", auth, characterController.update);
router.delete("/:id", auth, characterController.delete);

module.exports = router;