function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: "Accès réservé à l'administrateur" });
  }
  next();
}
module.exports = adminMiddleware;
