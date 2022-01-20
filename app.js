const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");

// dotenv configuration
dotenv.config();

// morgan configuration
if (process.env.ENVIRONMENT !== "production") {
  app.use(morgan("dev"));
}

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false, limit: "1mb" }));
// parse application/json
app.use(express.json({ limit: "50mb" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_BASE_URL);
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Credential"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, GET");
    return res.status(200).json({});
  }
  return next();
});

// Server Routes
app.use("/api/server/", require("./api/routes/server"));

// Urls Routes
app.use("/", require("./api/routes/urls"));

module.exports = app;
