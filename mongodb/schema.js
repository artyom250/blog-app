const mongoose = require("./connect");

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    desc: String
});
  
const blogModel = mongoose.model("blogs", blogSchema);

module.exports = blogModel;