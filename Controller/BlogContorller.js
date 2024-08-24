const Blog = require('../Model/BlogModel'); // Adjust the path to your Blog model

// Create a new blog
const createBlog = async (req, res) => {
    try {
        console.log(req.body)
      const { title, content, category, userId } = req.body;
      const coverImage = req.file ? req.file.path : null; // Cloudinary URL
  
      // Ensure userId is provided
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      // Create a new blog entry
      const newBlog = await Blog.create({
        title,
        content,
        coverImage,
        category,
        userId, // Associate the blog with the user
      });
  
      res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

// Update an existing blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, coverImage } = req.body;

    // Find the blog by id
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Update the blog entry
    const updatedBlog = await blog.update({
      title,
      content,
      coverImage,
    });

    res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the blog by id
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Delete the blog entry
    await blog.destroy();

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};
const getBlogById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the blog by ID
      const blog = await Blog.findByPk(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      res.status(200).json({ blog });
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  // Get blogs by category
  const getBlogsByCategory = async (req, res) => {
    try {
      const { category } = req.params;
  
      // Find blogs by category
      const blogs = await Blog.findAll({
        where: {
          category: category, // Assuming 'category' is a column in the Blog model
        },
      });
  
      if (blogs.length === 0) {
        return res.status(404).json({ message: 'No blogs found for this category' });
      }
  
      res.status(200).json({ blogs });
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  module.exports = { createBlog, updateBlog, deleteBlog, getBlogById, getBlogsByCategory };

