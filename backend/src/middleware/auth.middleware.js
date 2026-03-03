const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  console.log('Authorization header:', header);

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token manquant" });
  }

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded);
    req.user = decoded; // { id, username, iat, exp }
    next();
  } catch (err) {
    console.error('Erreur JWT:', err);
    return res.status(401).json({ error: "Token invalide" });
  }
}

module.exports = authMiddleware;
