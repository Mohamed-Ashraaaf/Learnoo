const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ForumPost' }], // User's posts
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // User's comments
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] // User's enrolled courses
  // Define other user properties as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;