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

// 3. SaaS Data Endpoints (Protected via API Key)
router.get('/v1/weather', apiKeyAuth, dataController.getWeatherData);
router.post('/v1/weather', apiKeyAuth, dataController.createWeatherData);

// --- TAMBAHKAN DUA RUTE INI AGAR FITUR EDIT & HAPUS TIDAK 404 ---
router.put('/v1/weather/:id', apiKeyAuth, dataController.updateWeatherData);
router.delete('/v1/weather/:id', apiKeyAuth, dataController.deleteWeatherData);

module.exports = router;