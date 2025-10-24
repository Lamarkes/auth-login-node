const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/register', controller.createUser); 
router.post('/login', controller.login); 
router.post('/recover', controller.recoverPassword); 
router.post('/logout', controller.logout); 
router.get('/user', controller.getUserData); 

module.exports = router;
