const { Logger } = require("../../helpers/logger");
const Url = require("../models/Url");
const validUrl = require("valid-url");
const { nanoid } = require("nanoid");
require("../../config/mongoose");

/**
 * Create Shortener URL Controller
 * @method POST
 * @example body
 * {
 *   "url": "http://localhost:3000/products/view?id=123&order=asc&limit=500"
 * }
 * @example response
 * {
 *   "status": "success",
 *   "code": 201,
 *   "message": "Short URL has been successfully generated",
 *   "data": {
 *       "code": "YwNOhbl2qeS-dDJY2t7JN",
 *       "originalUrl": "http://localhost:3000/products/view?id=123&order=asc&limit=500",
 *       "shortUrl": "http://localhost:3000/YwNOhbl2qeS-dDJY2t7JN",
 *       "_id": "61e93a1d9f914385acb760e3",
 *       "createdAt": "2022-01-20T10:31:57.726Z",
 *       "updatedAt": "2022-01-20T10:31:57.726Z",
 *       "__v": 0
 *   }
 * }
 * @param { Object } req
 * @param { Object } res
 * @returns { Object }
 */
exports.shortener = async (req, res) => {
  const logger = new Logger(req.requestID, "urls", "shortener");
  try {
    logger.info("Starting Execution", {});

    logger.info("Validating URL", { url: req.body.url });
    if (!validUrl.isUri(req.body.url)) {
      logger.warn("Invalid url", { url: req.body.url });
      return res.status(400).json({
        status: "fail",
        code: 400,
        message: "Invalid URL",
        data: {
          url: req.body.url,
        },
      });
    }

    logger.info("Checking if url already exists :: Executing MongoDB Query", {
      originalUrl: req.body.url,
    });
    const findOriginalUrl = await Url.findOne({ originalUrl: req.body.url });

    if (findOriginalUrl) {
      logger.info("Url already exists", {
        originalUrl: req.body.url,
      });

      return res.status(200).json({
        status: "success",
        code: 200,
        message: "Url already exists",
        data: findOriginalUrl._doc,
      });
    }

    logger.info("Generating unique code", {});
    let code = nanoid();
    while (true) {
      logger.info("Checking if code exists :: Executing MongoDB Query", {
        code,
      });
      const findCode = await Url.findOne({ code });

      if (!findCode) {
        break;
      }

      logger.info("Code already exists :: Generating new unique code", {});
      code = nanoid();
    }

    logger.info("Adding short URL :: Executing MongoDB Query", {
      shortUrl: `${process.env.SHORTENER_BASE_URL}/${code}`,
    });
    const url = new Url({
      code,
      originalUrl: req.body.url,
      shortUrl: `${process.env.SHORTENER_BASE_URL}/${code}`,
    });
    await url.save();

    logger.info("Returning success response", {});
    return res.status(201).json({
      status: "success",
      code: 201,
      message: "Short URL has been successfully generated",
      data: url,
    });
  } catch (error) {
    logger.error("Server error", { error: error.toString() });
    return res.status(500).json({
      status: "fail",
      code: 500,
      message: "Internal Server Error",
    });
  }
};

/**
 * @method GET
 * @example query parameter
 * code=YwNOhbl2qeS-dDJY2t7JN
 * @example response
 * {
 *   "status": "success",
 *   "code": 200,
 *   "message": "Url has been fetched successfully",
 *   "data": {
 *       "_id": "61e93a1d9f914385acb760e3",
 *       "code": "YwNOhbl2qeS-dDJY2t7JN",
 *       "originalUrl": "http://localhost:3000/forms/view?entity=drivers&searchCriteria=all&searchValue=all",
 *       "shortUrl": "http://localhost:3000/YwNOhbl2qeS-dDJY2t7JN",
 *       "createdAt": "2022-01-20T10:31:57.726Z",
 *       "updatedAt": "2022-01-20T10:31:57.726Z",
 *       "__v": 0
 *   }
 * }
 * @param { Object } req
 * @param { Object } res
 * @returns { Object }
 */
exports.getOriginalUrl = async (req, res) => {
  const logger = new Logger(req.requestID, "urls", "getOriginalUrl");
  try {
    logger.info("Starting Execution", {});

    logger.info("Checking if code exists :: Executing MongoDB Query", {
      code: req.query.code,
    });
    const findOriginalUrl = await Url.findOneAndUpdate(
      {
        code: req.query.code,
      },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!findOriginalUrl) {
      logger.warn("Code not found", {
        code: req.query.code,
      });

      return res.status(400).json({
        status: "fail",
        code: 400,
        message: "Code does not exist",
        data: { code: req.query.code },
      });
    }

    logger.info("Retuning success response", {});
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Url has been fetched successfully",
      data: findOriginalUrl._doc,
    });
  } catch (error) {
    logger.error("Server error", { error: error.toString() });
    return res.status(500).json({
      status: "fail",
      code: 500,
      message: "Internal Server Error",
    });
  }
};
