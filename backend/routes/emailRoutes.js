const express = require('express');
const { sendEmail } = require('../controllers/emailController');
const router = express.Router();

// @route   POST /api/email/send
// @desc    Send contact form email
// @access  Public
router.post('/send', sendEmail);

module.exports = router;