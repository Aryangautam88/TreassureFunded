const express = require('express');
const ContactForm = require('../models/Contactform'); // Ensure this path matches your project structure

const router = express.Router();

// Validation function for contact form data
const validateContactForm = (data) => {
  const { firstName, lastName, email, mobile, message } = data;
  const errors = [];

  if (!firstName || !lastName || !email || !mobile || !message) {
    errors.push('All fields are required.');
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (email && !emailRegex.test(email)) {
    errors.push('Invalid email format.');
  }

  const mobileRegex = /^[0-9]{10}$/;
  if (mobile && !mobileRegex.test(mobile)) {
    errors.push('Invalid mobile number format. Must be 10 digits.');
  }

  return errors;
};

// POST - Submit a new contact message
router.post('/', async (req, res) => {
  console.log("📥 Incoming request body:", req.body);

  const validationErrors = validateContactForm(req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json({ msg: 'Validation failed', errors: validationErrors });
  }

  try {
    const { firstName, lastName, email, mobile, message } = req.body;
    const newMessage = new ContactForm({ firstName, lastName, email, mobile, message });
    await newMessage.save();
    console.log("✅ Message saved to database.");
    res.status(201).json({ msg: 'Message sent successfully' });
  } catch (err) {
    console.error("❌ Error while saving message:", err);
    res.status(500).json({ msg: 'Failed to submit message', error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const messages = await ContactForm.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error("❌ Error fetching messages:", err);
    res.status(500).json({ msg: 'Failed to fetch messages', error: err.message });
  }
});

module.exports = router;

