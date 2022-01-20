const express = require('express');
const route = express.Router();
const server = require('../controllers/server');

// Server Health Route
route.get('/health', server.health);

module.exports = route;
