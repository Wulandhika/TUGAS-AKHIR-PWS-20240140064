const express = require('express');
const router = express.Router();

// Import Controllers
const authController = require('../controllers/authController');
const keyController = require('../controllers/keyController');
const dataController = require('../controllers/dataController');

// Import Middlewares
const authJwt = require('../middleware/authJwt');
const apiKeyAuth = require('../middleware/apiKeyAuth');

// 1. Auth Routes (Public)
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// 2. API Key Management (Protected via JWT)
router.post('/keys/generate', authJwt, keyController.generateKey);

// 3. SaaS Data Endpoint (Protected via API Key)
router.get('/v1/weather', apiKeyAuth, dataController.getWeatherData);

module.exports = router;