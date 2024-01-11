const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Any other fields you need for a course
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
