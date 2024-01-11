const express = require('express');
const router = express.Router();
const ForumPost = require('../models/ForumPost'); // Import ForumPost model
const User = require('../models/User'); // Import User model

// Route for fetching all forum posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await ForumPost.find().populate('comments'); // Assuming 'comments' is a field referencing comments
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route for creating a new forum post
router.post('/posts', async (req, res) => {
  try {
    const { title, content, userId } = req.body; // Add userId in the request body for user association
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newPost = new ForumPost({ title, content });
    await newPost.save();
    // Update the user's posts array
    user.posts.push(newPost);
    await user.save();
    res.status(201).json({ message: 'Forum post created successfully', post: newPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route for adding a comment to a post
router.post('/posts/:postId/comments', async (req, res) => {
  try {
    const { postId } = req.params;
    const { text, userId } = req.body; // Add userId in the request body for user association
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const post = await ForumPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.comments.push({ text }); // Assuming 'comments' is an array of objects with 'text' field
    await post.save();
    // Update the user's comments array
    user.comments.push(post.comments[post.comments.length - 1]); // Assuming comment is the last in the array
    await user.save();
    res.status(201).json({ message: 'Comment added to post', post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Editing a Post by ID
router.put('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;
    const updatedPost = await ForumPost.findByIdAndUpdate(postId, { title, content }, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post updated successfully', post: updatedPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deleting a Post by ID
router.delete('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const deletedPost = await ForumPost.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully', post: deletedPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Editing a Comment within a Post
router.put('/posts/:postId/comments/:commentId', async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { text } = req.body;
    const post = await ForumPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const commentToUpdate = post.comments.id(commentId);
    if (!commentToUpdate) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    commentToUpdate.text = text;
    await post.save();
    res.json({ message: 'Comment updated successfully', post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deleting a Comment within a Post
router.delete('/posts/:postId/comments/:commentId', async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const post = await ForumPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.comments.id(commentId).remove();
    await post.save();
    res.json({ message: 'Comment deleted successfully', post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;