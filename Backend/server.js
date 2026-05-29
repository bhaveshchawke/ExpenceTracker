const express = require("express");
const cors = require("cors");
const server = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const session = require("express-session");
const MongoStore = require("connect-mongo").default || require("connect-mongo");
/* Middleware */
dotenv.config();
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
      secure: false,
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
// const budgetRoutes = require("./routes/budgetRoutes");
// const transactionRoutes = require("./routes/transactionRoutes");

/* Routes */
server.use("/api/auth", authRoutes);
// server.use("/analytics", analyticsRoutes);
// server.use("/budget", budgetRoutes);
// server.use("/transaction", transactionRoutes);
const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  await connectDB();
  console.log(`server is listning on port:${PORT}`);
});
