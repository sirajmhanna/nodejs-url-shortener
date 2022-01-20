const http = require("http");
const app = require("./app");
const port = process.env.PORT || 5000;
const { Logger } = require("./helpers/logger");
const logger = new Logger(new Date().getTime(), "server", "listen");

const server = http.createServer(app);
server.listen(port, () => {
  logger.info("Server is up", {
    port,
  });
});
