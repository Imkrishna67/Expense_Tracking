const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getProfile,
  updateProfile,
  updatePassword,
  deleteAccount
} = require('../controllers/profileController');

router.get('/', authMiddleware, getProfile);
router.put('/', authMiddleware, updateProfile);
router.put('/password', authMiddleware, updatePassword);
router.delete('/', authMiddleware, deleteAccount);

module.exports = router;
