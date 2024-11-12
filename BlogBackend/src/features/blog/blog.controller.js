import BlogRepository from "./blog.repository.js";

class BlogController {
  constructor() {
    this.blogRepository = new BlogRepository();
  }

  //creating blog to the database
  async createBlog(req, res) {
    let blog;
    try {
      blog = await this.blogRepository.createBlog(req.body);
      return res.status(200).json({ success: true, msg: blog });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, msg: "Something wrong with the database" });
    }
  }

  //get all blog controller
  async getAllBlog(req, res) {
    try {
      let blogs = await this.blogRepository.getAllBlog();
      return res.json({ success: true, msg: blogs });
    } catch (err) {
      return res.json({ success: true, msg: "Can't able to fetch the data!" });
    }
  }

  //delete specific blog by id
  async deleteSpecificBlog(req, res) {
    const { id } = req.params;
    const blog = await this.blogRepository.deleteById(id);
    if (blog) {
      res
        .status(200)
        .json({ success: true, msg: "Blog Deleted Successfully!" });
    } else {
      res.status(400).json({ success: false, msg: "Blog not found!" });
    }
  }

  //update a specific blog
  async updateBlog(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;

    const blog = await this.blogRepository.getBlogById(id);
    if (!blog) {
      res.status(400).json({ success: false, msg: "Blog not found!" });
    } else {
      const updatedBlog = await this.blogRepository.updateBlog(
        id,
        title,
        description
      );
      res.status(200).json({ success: false, msg: updatedBlog });
    }
  }
}

export default BlogController;
