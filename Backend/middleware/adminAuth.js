const isAdmin = (req, res, next) => {
  if (req.session && req.session.userData && req.session.userData.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: "Access denied: Admin only." });
  }
};

module.exports = { isAdmin };
