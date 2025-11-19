// routes/notifications.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification'); // Make sure this model exists

// ========================
// Create a new notification (Admin)
// ========================
router.post('/', async (req, res) => {
  try {
    const { title, message, type } = req.body;

    // Basic validation
    if (!title || !message) {
      return res.status(400).json({ error: 'Title and message are required' });
    }

    const notification = await Notification.create({
      title,
      message,
      type: type || 'alert',
      isRead: false,
    });

    // Emit real-time update to all connected clients
    req.app.get('io')?.emit('new-notification', notification);

    res.status(201).json(notification);
  } catch (err) {
    console.error('Error creating notification:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ========================
// Get all notifications (for users or admin)
// ========================
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ========================
// Mark a single notification as read
// ========================
router.patch('/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json(notification);
  } catch (err) {
    console.error('Error marking notification as read:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ========================
// Mark all notifications as read
// ========================
router.patch('/read/all', async (req, res) => {
  try {
    await Notification.updateMany({ isRead: false }, { isRead: true });
    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    console.error('Error marking all notifications as read:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
