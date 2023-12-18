const User = require('../models/user');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id; 

    // Fetch the user profile from the database
    const userProfile = await User.findById(userId);

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Send the user profile as a response
    res.status(200).json({ userProfile });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id; 
    const updatedProfileData = req.body; // Updated profile data from the request body

    // Update the user profile in the database
    const updatedProfile = await User.findByIdAndUpdate(userId, updatedProfileData, { new: true });

    if (!updatedProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Send the updated user profile as a response
    res.status(200).json({ updatedProfile });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

