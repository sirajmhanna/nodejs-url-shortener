const mongoose = require("mongoose");
const { Logger } = require("../helpers/logger");
const logger = new Logger(new Date().getTime(), "config", "mongoose");

const mongoURI = process.env.MONGODB_URL;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(mongoURI, options);

mongoose.connection.on("connected", () => {
  logger.info(`MongoDB connected successfully`, {});
});

mongoose.connection.on("error", (error) => {
  logger.error(`MongoDB connection error`, { error });
});

mongoose.connection.on("disconnected", () => {
  logger.info(`MongoDB default connection disconnected`, {});
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    logger.info(`App terminated, closing MongoDB connections`, {});
    process.exit(0);
  });
});
