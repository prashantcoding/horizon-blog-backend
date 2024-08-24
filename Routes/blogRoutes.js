const express = require('express');
const router = express.Router();
const { createBlog, updateBlog, deleteBlog, getBlogById, getBlogsByCategory, getBlogsByUserId, getPublicBlog } = require('../Controller/BlogContorller'); // Adjust the path
const upload = require('../multerConfig');
const authenticateToken= require('../middleware/checkAuth')

// Route to create a blog
router.post('/create',authenticateToken,upload.single("coverImage") ,createBlog);


// Route to update a blog
router.put('/update/:id', updateBlog);

// Route to delete a blog
router.delete('/delete/:id', deleteBlog);

// Route to get a blog by ID
router.get('/blogs/:id', getBlogById);

// Route to get blogs by category
router.get('/blogs/category/:category', getBlogsByCategory);
router.get('/userblogs',authenticateToken,getBlogsByUserId);
router.get('/publicblogs',getPublicBlog)



module.exports = router;
