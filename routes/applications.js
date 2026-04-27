const express = require('express');
const multer = require('multer');
const path = require('path');
const { createApplication, getMyApplications, getApplicationStatus } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const suffix = `${Date.now()}-${file.originalname}`.replace(/\s+/g, '-');
    cb(null, suffix);
  },
});

const upload = multer({ storage });

router.post(
  '/',
  protect,
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'idProof', maxCount: 1 },
  ]),
  createApplication
);
router.get('/', protect, getMyApplications);
router.get('/:id', protect, getApplicationStatus);

module.exports = router;
