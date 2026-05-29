const requireAuth = (req, res, next) => {
  if (req.session && req.session.userData) {
    next();
  } else {
    res.status(401).json({
      error: "Acess Denied!",
    });
  }
};
