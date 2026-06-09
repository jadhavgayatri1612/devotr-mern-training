const express = require("express");

const app = express();

const productRoutes = require("./src/routes/productRoutes");

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

// Middleware 3 - 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    status: 404
  });
});

// Middleware 4 - Global Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
    status: 500
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});