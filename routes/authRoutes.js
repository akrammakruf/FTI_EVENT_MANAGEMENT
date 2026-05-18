const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

/**
 * Endpoint Registrasi
 * Route: POST /auth/register
 */
router.post('/register', AuthController.register);

/**
 * Endpoint Login
 * Route: POST /auth/login
 */
router.post('/login', AuthController.login);

module.exports = router;
