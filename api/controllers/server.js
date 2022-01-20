/**
 * Server Health Controller
 * @method GET
 * @example
 * {
    "status": "success",
    "message": "Server is alive",
    "data": {
        "service": "nodejs-url-shortener-service"
            }
 * }
 * 
 * @param { Object } req 
 * @param { Object } res 
 * @returns { Object }
 */
exports.health = (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Server is alive",
    data: {
      service: process.env.SERVICE_NAME,
    },
  });
};
