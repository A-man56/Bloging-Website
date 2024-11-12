import BlogRepository from "../blog/blog.repository.js";
import UserRepository from "../users/user.repository.js";
import CommentRepository from "./comment.repository.js";

class CommentController {
  constructor() {
    this.userRepository = new UserRepository();
    this.commentRepository = new CommentRepository();
    this.blogRepository = new BlogRepository();
  }

  //adding comment to a blog by id controller
  async createComment(req, res) {
    const commentObj = req.body;
    const blogId = req.params.blogId;
    try {
      const comment = await this.commentRepository.createComment(commentObj);
      const blog = await this.blogRepository.getBlogById(blogId);
      blog.comments.push(comment._id);
      await blog.save();
      return res.status(200).json({ success: true, msg: comment });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, msg: "Internal server problem!" });
    }
  }

  //getting all the blog comment by blog id controller
  async getAllCommentOfBlogById(req, res) {
    const { blogId } = req.params;
    try {
      const comments = await this.commentRepository.findAllCommentByBlogId(
        blogId
      );
      return res.status(200).json({ success: true, msg: comments });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, msg: "Internal server problem!" });
    }
  }

  //toggle comment like by comment id controller
  async toggleCommentLike(req, res) {
    const { commentId } = req.params;
    const { email } = req.cookies;
    try {
      const user = await this.userRepository.findUserByEmail(email);
      const comment = await this.commentRepository.toggleCommentLike(
        commentId,
        user._id.toString()
      );
      return res.status(200).json({ succcess: true, msg: comment });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, msg: "Internal server problem!" });
    }
  }

  //get all the user who like the comment by id controller
  async getAllUsersWhoLikedCommentById(req, res) {
    const { commentId } = req.params;
    console.log(commentId);
    try {
      const users = await this.commentRepository.getAllCommentOfBlogById(
        commentId
      );
      return res.status(200).send({ success: true, msg: users });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, msg: "Internal server problem!" });
    }
  }

  //update commet controller
  async updateComment(req, res) {
    const { commentId } = req.params;
    const { content } = req.body;
    const { email } = req.cookies;
    try {
      const updatedComment = await this.commentRepository.updateComment(
        email,
        commentId,
        content
      );
      return res.status(200).json({ success: true, msg: updatedComment });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, msg: "Internal server problem!" });
    }
  }

  //delete the comment by the comment id controller
  async deleteComment(req, res) {
    const { commentId } = req.params;
    const { email } = req.cookies;
    try {
      const deleteCommment = await this.commentRepository.deleteComment(
        email,
        commentId
      );
      return res.status(200).json({ success: true, msg: deleteCommment });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, msg: "Internal server problem!" });
    }
  }
}

export default CommentController;
