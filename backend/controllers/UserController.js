const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// Get approved users (for Approvals.js page)
exports.getApprovedUsers = async (req, res) => {
  try {
    const approvedUsers = await User.find({ isApproved: true }).select('-password');
    res.status(200).json(approvedUsers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching approved users', error: err });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
};

// Approve user
exports.approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isApproved = true;
    await user.save();

    await sendEmail({
      to: user.email,
      subject: 'Account Approved',
      text: `Hello ${user.fullName},\n\nYour account has been approved. You can now log in to your dashboard.\n\n- SkyFunded Team`,
    });

    res.status(200).json({ message: 'User approved and email sent' });
  } catch (err) {
    res.status(500).json({ message: 'Error approving user', error: err });
  }
};

// Fetch user details
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user details', error: err });
  }
};

// Update user details
exports.updateUserDetails = async (req, res) => {
  try {
    const { fullName, email, phone, country, profileImage } = req.body;
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.country = country || user.country;
    if (profileImage) user.profileImage = profileImage;

    await user.save();

    res.json({ message: 'User details updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user details', error: err });
  }
};

// Update notification preferences
exports.updateNotificationPreferences = async (req, res) => {
  try {
    const { emailNotifications, smsAlerts } = req.body;
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.emailNotifications = emailNotifications ?? user.emailNotifications;
    user.smsAlerts = smsAlerts ?? user.smsAlerts;

    await user.save();

    res.json({ message: 'Notification preferences updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating notification preferences', error: err });
  }
};

// Change user password
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordCorrect = await user.comparePassword(currentPassword);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Current password is incorrect' });

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating password', error: err });
  }
};
