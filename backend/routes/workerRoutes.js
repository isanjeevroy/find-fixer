const express = require('express');
const { getWorkerProfile, updateWorkerProfile, getAllWorkers } = require('../controllers/workerController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const router = express.Router();
router.get('/',getAllWorkers)
router.get('/profile', isAuthenticated, getWorkerProfile);
router.put('/profile', isAuthenticated, updateWorkerProfile);

module.exports = router;
