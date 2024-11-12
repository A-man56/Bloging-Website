import express from "express";
import BlogController from "./blog.controller.js";

const BlogRouter = express.Router();

const blogController = new BlogController();

//create blog
BlogRouter.post("/", (req, res) => {
  blogController.createBlog(req, res);
});

//get all the blogs
BlogRouter.get("/", (req, res) => {
  blogController.getAllBlog(req, res);
});

//delete specific blog id
BlogRouter.delete("/:id", (req, res) => {
  blogController.deleteSpecificBlog(req, res);
});

//update specific blog id
BlogRouter.patch("/:id", (req, res) => {
  blogController.updateBlog(req, res);
});

export default BlogRouter;
