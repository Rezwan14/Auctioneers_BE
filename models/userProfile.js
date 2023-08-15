const mongoose = require('mongoose');

// User Profile Schema
const userProfileSchema = new mongoose.Schema({
    name: String,
    bio: String,
    profileImage: String,
  });

module.exports = mongoose.model('UserProfile', userProfileSchema);