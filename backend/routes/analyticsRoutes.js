const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getMonthlyData,
  getCategoryData,
  getStatsSummary
} = require('../controllers/analyticsController');

router.get('/monthly', authMiddleware, getMonthlyData);
router.get('/category', authMiddleware, getCategoryData);
router.get('/summary', authMiddleware, getStatsSummary);

module.exports = router;
