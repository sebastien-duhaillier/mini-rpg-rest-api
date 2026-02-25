const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Auth = require("../models/auth.model");

const AuthController = {

  // REGISTER
  register: async (req, res) => {
    try {

      const { username, password, email } = req.body;

      if (!username || !password)
        return res.status(400).json({ error: "username et password requis" });

      // vérifier si existe
      const existingUser = await Auth.findByUsername(username);

      if (existingUser)
        return res.status(409).json({ error: "Utilisateur existe déjà" });

      // hash password
      const hash = await bcrypt.hash(password, 10);

      const user = await Auth.createUser(username, hash, email);

      res.status(201).json(user);

    } catch (err) {

      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });

    }
  },


  // LOGIN
  login: async (req, res) => {

    try {

      const { username, password } = req.body;

      const user = await Auth.findByUsername(username);

      if (!user)
        return res.status(401).json({ error: "Utilisateur invalide" });

      const valid = await bcrypt.compare(password, user.password);

      if (!valid)
        return res.status(401).json({ error: "Mot de passe incorrect" });

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });

    } catch (err) {

      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });

    }

  }

};

module.exports = AuthController;