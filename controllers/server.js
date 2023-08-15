const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const User = require('./models/user'); // Adjust the path accordingly
const userProfile = require('./models/userProfile');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/user_profiles', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// User Profile Schema
const userProfileSchema = new mongoose.Schema({
  name: String,
  bio: String,
  profileImage: String,
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Create a new user profile
app.post('/api/profiles', upload.single('image'), (req, res) => {
  const { name, bio } = req.body;
  const profileImage = req.file ? req.file.filename : null;
  const userProfile = new UserProfile({ name, bio, profileImage });

  userProfile.save((err, savedProfile) => {
    if (err) {
      res.status(500).json({ error: 'Could not save profile' });
    } else {
      res.json(savedProfile);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Update an existing user profile
app.put('/api/profiles/:id', upload.single('image'), (req, res) => {
    const profileId = req.params.id;
    const { name, bio } = req.body;
    const profileImage = req.file ? req.file.filename : null;
  
    UserProfile.findByIdAndUpdate(
      profileId,
      { name, bio, profileImage },
      { new: true },
      (err, updatedProfile) => {
        if (err) {
          res.status(500).json({ error: 'Could not update profile' });
        } else {
          res.json(updatedProfile);
        }
      }
    );
  });
  
  // Delete a user profile
  app.delete('/api/profiles/:id', (req, res) => {
    const profileId = req.params.id;
  
    UserProfile.findByIdAndDelete(profileId, (err, deletedProfile) => {
      if (err) {
        res.status(500).json({ error: 'Could not delete profile' });
      } else {
        if (deletedProfile.profileImage) {
          // Delete the associated image file from the uploads directory
          const imagePath = path.join(__dirname, 'uploads', deletedProfile.profileImage);
          fs.unlinkSync(imagePath);
        }
        res.json({ message: 'Profile deleted successfully' });
      }
    });
  });