const mongoose = require('mongoose');

const contactFormSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true,
    trim: true 
  },
  lastName: { 
    type: String, 
    required: true,
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 
    lowercase: true 
  },
  mobile: { 
    type: String, 
    required: true, 
    match: /^[0-9]{10}$/ 
  },
  message: { 
    type: String, 
    required: true, 
    trim: true 
  },
  createdAt: { 
    
    type: Date, 
    default: Date.now 
  } 
});

module.exports = mongoose.model('ContactForm', contactFormSchema);
