const express = require('express');
const { getCustomerProfile, updateCustomerProfile, searchWorkers } = require('../controllers/customerController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile', isAuthenticated, getCustomerProfile);
router.put('/profile', isAuthenticated, updateCustomerProfile);
router.get('/search', isAuthenticated, searchWorkers);

module.exports = router;
