import mongoose from "mongoose";
import BlogSchema from "./blog.schema.js";

const blogModel = mongoose.model("Blog", BlogSchema);

class BlogRepository {
  //create blog repository
  async createBlog(blogObj) {
    const newBlog = new blogModel(blogObj);
    await newBlog.save();
    return newBlog;
  }

  //get blog by id repository
  async getBlogById(id) {
    const blog = await blogModel.findOne({ _id: id });
    return blog;
  }

  //get all blog repository
  async getAllBlog() {
    const blogs = blogModel.find({});
    return blogs;
  }

  //find one and delete one repository
  async deleteById(id) {
    const blog = blogModel.findOneAndDelete({ _id: id });
    return blog;
  }

  //update blog by finding it through id
  async updateBlog(id, title, description) {
    const blog = await this.getBlogById(id);
    blog.title = title;
    blog.description = description;
    return await blog.save();
  }
}

export default BlogRepository;
