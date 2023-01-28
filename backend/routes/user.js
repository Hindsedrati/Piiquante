const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const validator = require('validator');

const password = require('../middleware/validator')


router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
