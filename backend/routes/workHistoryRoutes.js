const express = require('express');
const { bookWork, completeWork, getWorkHistory } = require('../controllers/workHistoryController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/book', isAuthenticated, bookWork);
router.post('/complete/:id', isAuthenticated, completeWork);  // Corrected this line
router.get('/history', isAuthenticated, getWorkHistory);


module.exports = router;
