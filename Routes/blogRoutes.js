const express = require('express');
const router = express.Router();
const { createBlog, updateBlog, deleteBlog, getBlogById, getBlogsByCategory } = require('../Controller/BlogContorller'); // Adjust the path
const upload = require('../multerConfig');

// Route to create a blog
router.post('/blogs',upload.single("coverImage"), createBlog);


// Route to update a blog
router.put('/blogs/:id', updateBlog);

// Route to delete a blog
router.delete('/blogs/:id', deleteBlog);

// Route to get a blog by ID
router.get('/blogs/:id', getBlogById);

// Route to get blogs by category
router.get('/blogs/category/:category', getBlogsByCategory);

module.exports = router;
