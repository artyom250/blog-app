const express = require('express');
const router = express.Router();
const blogModel = require("../mongodb/schema");

// Define your main route here
router.get('/', function (req, res) {
  const searchQuery = req.query.q;
  let query = {};

  if (searchQuery) {
    query = {
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { author: { $regex: searchQuery, $options: 'i' } },
        { desc: { $regex: searchQuery, $options: 'i' } }
      ]
    };
  }

  blogModel.find(query).then(function(blogs) {
    res.render("index", {
      blogs: blogs
    });
  }).catch(error => console.log(error));
});

// Define your create route here
router.get("/create", function (req, res) {
  res.render("create");
});

router.post("/create", function (req, res) {
  const { title, author, desc } = req.body;

  blogModel.create({ title, author, desc }).then(function (newBlog) {
      res.redirect("/");
  }).catch(error => console.log(error));
});

// Define your read route here
router.get("/read/:id", function (req, res) {
  const blogId = req.params.id;
  
  blogModel.findById(blogId).then(function(blog) {
    res.render("read", {
      blog: blog
    });
  }).catch(error => console.log(error));
});

// Define your update route here
router.get("/update/:id", function (req, res) {
  const blogId = req.params.id;

  blogModel.findById(blogId).then(function (update) {
      res.render("update", {
          update: update
      });
  }).catch(error => console.log(error));
});

router.post("/update/:id", function (req, res) {
  const blogId = req.params.id;
  const { title, author, desc } = req.body;

  blogModel.findByIdAndUpdate(blogId, { title, author, desc }, { new: true }).then(function (updatedBlog) {
      res.redirect("/");
  }).catch(error => console.log(error));
});

// Define your delete route here
router.post("/:id", function (req, res) {
  const blogId = req.params.id;

  blogModel.findByIdAndDelete(blogId).then(function(result) {
    res.redirect("/");
  }).catch(error => console.log(error));
})

// Export the router so it can be used in other files
module.exports = router;