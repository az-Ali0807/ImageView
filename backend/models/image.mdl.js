const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema ({ 
  filename: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false      
  }
}, { timestamps: true });

module.exports = mongoose.model('Image', imageSchema);      