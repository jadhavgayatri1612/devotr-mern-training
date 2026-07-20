require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const logger = require("./src/utils/logger");

const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: "Too many requests, please try again later.",
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    error: "Too many login attempts. Please try again later.",
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(limiter);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/test", (req, res) => {
  res.json({
    message: "Helmet Test",
  });
});

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();

  res.on("finish", () => {
    logger.info(`${req.method} ${req.url} ${timestamp} ${res.statusCode}`);
  });

  next();
});

app.use((req, res, next) => {
  req.requestId = Date.now() + Math.random();

  next();
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    status: 404,
  });
});

app.use((err, req, res, next) => {
  logger.error(err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    statusCode,
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    logger.info("MongoDB connected");

    app.listen(5001, () => {
      logger.info("Server running on port 5001");
    });
  })
  .catch((err) => {
    logger.error(`MongoDB Error: ${err.message}`);
  });

process.on("unhandledRejection", (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);

  logger.info("Shutting down server...");

  process.exit(1);
});
