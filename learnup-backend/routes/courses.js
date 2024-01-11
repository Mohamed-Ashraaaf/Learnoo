const express = require('express');
const router = express.Router();
const Course = require('../models/Course'); // Import Course model

// Define your course routes
router.get('/', async (req, res) => {
  try {
    // Fetch all courses
    const courses = await Course.find();
    res.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route for creating a new course
router.post('/', async (req, res) => {
  console.log('Creating a new course...');
  
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and Description are required' });
    }
    const newCourse = new Course({ title, description });
    await newCourse.save();

    console.log('Course created successfully'); // Add a log statement here

    // Fetch the updated list of courses after creating a new one
    const updatedCourses = await Course.find();
    res.status(201).json({ message: 'Course created successfully', courses: updatedCourses });
  } catch (err) {
    console.error('Failed to create course:', err.message); // Log error messages
    res.status(500).json({ error: 'Failed to create course', details: err.message });
  }
});

// Route for updating a course by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(id, { title, description }, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route for deleting a course by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully', course: deletedCourse });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Adding a Module to a Course
router.post('/:courseId/modules', async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    // Create a new module object and push it to the course's modules array
    const newModule = { title, lessons: [] }; // Example structure of a module
    course.modules.push(newModule);
    await course.save();
    res.status(201).json({ message: 'Module added to course', course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Adding a Lesson to a Module within a Course
router.post('/:courseId/modules/:moduleId/lessons', async (req, res) => {
  try {
    const { courseId, moduleId } = req.params;
    const { title, content } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    // Find the module in the course's modules array
    const moduleToUpdate = course.modules.id(moduleId);
    if (!moduleToUpdate) {
      return res.status(404).json({ message: 'Module not found' });
    }
    // Create a new lesson object and push it to the module's lessons array
    const newLesson = { title, content }; // Example structure of a lesson
    moduleToUpdate.lessons.push(newLesson);
    await course.save();
    res.status(201).json({ message: 'Lesson added to module', course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Adding a Quiz to a Lesson within a Module of a Course
router.post('/:courseId/modules/:moduleId/lessons/:lessonId/quizzes', async (req, res) => {
  try {
    const { courseId, moduleId, lessonId } = req.params;
    const { questions } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    // Find the module and lesson in the course's modules array
    const moduleToUpdate = course.modules.id(moduleId);
    if (!moduleToUpdate) {
      return res.status(404).json({ message: 'Module not found' });
    }
    const lessonToUpdate = moduleToUpdate.lessons.id(lessonId);
    if (!lessonToUpdate) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    // Create a new quiz object and assign it to the lesson
    const newQuiz = { questions }; // Example structure of a quiz
    lessonToUpdate.quiz = newQuiz;
    await course.save();
    res.status(201).json({ message: 'Quiz added to lesson', course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;