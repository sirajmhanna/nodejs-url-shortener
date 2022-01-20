const { Logger } = require("../../helpers/logger");

/**
 * Generate Request ID Middleware
 * @param { Object } req
 * @param { Object } res
 * @param { Object } next
 * @returns { Object }
 */
exports.generateRequestIdentifier = async (req, res, next) => {
  const logger = new Logger(
    new Date().getTime(),
    "requests",
    "generateRequestIdentifier"
  );
  const requestID = new Date().getTime();

  logger.info("Generating A New Request ID", {
    date: new Date(),
    ipAddress: req.ip,
  });
  req.requestID = requestID;

  return next();
};
