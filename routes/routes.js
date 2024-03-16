const express = require('express');
const authController = require('../controllers/authController');
const authenticated = require('../middleware/redirectIfAuthenticated');
const welcomeController = require('../controllers/welcomeController');
const studentController = require('../controllers/studentController');
const router = express.Router()
const admin = express.Router(); //creating router instance for admin

// unauthenticated routes 
router.post('/auth/signup', authController.store);
router.post('/auth/signin', authController.authenticated);

// admin routes with authentication (middleware)
admin.use(authenticated);

admin.get('/students', studentController.index);
admin.get('/home', welcomeController.home);
admin.get('/hotels', welcomeController.hotels);
// adding admin prefix
router.use('/admin', admin);

module.exports = router;