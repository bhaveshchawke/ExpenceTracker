const express = require("express");
const router = express.Router();
const { getAdminStats } = require("../controllers/adminController");
const { isAdmin } = require("../middleware/adminAuth");

// Protected by isAdmin middleware
router.get("/stats", isAdmin, getAdminStats);

module.exports = router;
