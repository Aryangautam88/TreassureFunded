const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  country: {
    type: String,
    trim: true,
  },
  referralId: {
    type: String,
    trim: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  totalDeposit: {
    type: Number,
    default: 0,
  },
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'declined'],
    default: 'pending',
  },

  // Profile completion fields
  dob: {
    type: String,
  },
  address: {
    type: String,
    trim: true,
  },
  profession: {
    type: String,
    trim: true,
  },
  profileImage: {
    type: String,
    default: '',
  },

  // ✅ Step 2 enhanced fields
  linkedin: {
    type: String,
    trim: true,
    default: '',
  },
  github: {
    type: String,
    trim: true,
    default: '',
  },
  social: {
    type: String,
    trim: true,
    default: '',
  },
  bio: {
    type: String,
    trim: true,
    default: '',
  },
  skills: {
    type: String,
    trim: true,
    default: '',
  },
  experience: {
    type: String,
    trim: true,
    default: '',
  },
  education: {
    type: String,
    trim: true,
    default: '',
  },

  website: {
    type: String,
    trim: true,
    default: '',
  },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Password check method
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
