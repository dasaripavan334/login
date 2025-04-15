const express = require('express');
const router = express.Router();
const userController = require('./UserController.js');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const { isAdmin } = require('../middleware/roleAuth');

// Registration for normal users
router.post('/register', [
    body('name').isLength({ min: 20, max: 60 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8, max: 16 }).matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\\-])/),
    body('address').isLength({ max: 400 }).optional(),
], userController.registerUser);

// Login for all users
router.post('/login', userController.loginUser);

// Protected routes (example for admin to add new users)
router.post('/add', authMiddleware, isAdmin, [
    body('name').isLength({ min: 20, max: 60 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8, max: 16 }).matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\\-])/),
    body('address').isLength({ max: 400 }).optional(),
    body('role').isIn(['admin', 'normal', 'owner']),
], userController.addUser);

// ... other user routes (view users, update password, etc.)