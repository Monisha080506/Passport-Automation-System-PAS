const express = require('express');
const { getAllApplications, updateStatus } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/applications', protect, adminOnly, getAllApplications);
router.patch('/applications/:id', protect, adminOnly, updateStatus);

module.exports = router;
