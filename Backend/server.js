const express = require("express");
const cors = require("cors");
const server = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const session = require("express-session");
const MongoStore = require("connect-mongo").default || require("connect-mongo");
/* Middleware */
dotenv.config();

// Trust proxy is required for Vercel/Render to set secure cookies properly
server.set("trust proxy", 1);

// Connect to DB globally for Vercel serverless functions
connectDB();

server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 दिन (24 घंटे)
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  }),
);
server.use(express.json());
server.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
/* Routes Import */
const authRoutes = require("./routes/authRoutes");
// const analyticsRoutes = require("./routes/analyticsRoutes");
const budgetRoute = require("./routes/budgetRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const adminRoutes = require("./routes/adminRoutes");

/* Routes */
server.use("/api/auth", authRoutes);
// server.use("/analytics", analyticsRoutes);
server.use("/api/budget", budgetRoute);
server.use("/api/transactions", transactionRoutes);
server.use("/api/admin", adminRoutes);
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  server.listen(PORT, () => {
    console.log(`server is listning on port:${PORT}`);
  });
}

// Export for Vercel Serverless
module.exports = server;
