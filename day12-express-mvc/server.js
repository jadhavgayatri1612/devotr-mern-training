require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const logger = require("./src/utils/logger");
const app = express();

const productRoutes = require("./src/routes/productRoutes");
const authRoutes = require("./src/routes/authRoutes");

// Global Rate Limiter 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: "Too many requests, please try again later.",
  },
});

// Auth Rate Limiter 
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    error: "Too many login attempts. Please try again later.",
  },
});

// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Global Limiter
app.use(limiter);

// Helmet
app.use(helmet());
//Morgon logger
app.use(morgan("dev"));
// Test Route
app.get("/test", (req, res) => {
  res.json({
    message: "Helmet Test",
  });
});

app.use(express.json());

// Middleware 1 - Request Logger
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();

  res.on("finish", () => {
    console.log(
      `${req.method} ${req.url} ${timestamp} ${res.statusCode}`
    );
  });

  next();
});

// Middleware 2 - Request ID
app.use((req, res, next) => {
  req.requestId = Date.now() + Math.random();

  console.log("Request ID:", req.requestId);

  next();
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authLimiter, authRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    status: 404,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  logger.error(err.message);
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    statusCode,
  });
});

console.log("DAY17 SERVER RUNNING");

// MongoDB Connection
   mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    logger.info("MongoDB connected");

    app.listen(5001, () => {
      logger.info("Server running on port 5001");
    });
  })
  .catch((err) => {
    logger.error("MongoDB Error:" + err.message);
  });
  process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection: " + err.message);

  console.log("Shutting down server...");

  process.exit(1);
});