// src/routes/character.routes.js
const express = require("express");
const router = express.Router();
const characterController = require("../controllers/character.controller");

// Routes Characters
router.get("/", characterController.getAll);
router.get("/:id", characterController.getById);
router.post("/", characterController.create);
router.put("/:id", characterController.update);
router.delete("/:id", characterController.delete);

module.exports = router;