import express from "express";
import CommentController from "./comment.controller.js";

const commentRouter = express.Router();

const commentController = new CommentController();

//add comment to the blog Router
commentRouter.post("/:blogId", (req, res) => {
  commentController.createComment(req, res);
});

//get all the commnet by blog id
commentRouter.get("/:blogId", (req, res) => {
  commentController.getAllCommentOfBlogById(req, res);
});

//toggle comment like
commentRouter.get("/toggle/:commentId", (req, res) => {
  commentController.toggleCommentLike(req, res);
});

//get all the users who like the comment by commentId
commentRouter.get("/allUsers/:commentId", (req, res) => {
  commentController.getAllUsersWhoLikedCommentById(req, res);
});

//update existing comment by comment id
commentRouter.put("/:commentId", (req, res) => {
  commentController.updateComment(req, res);
});

//delete a comment by comment id
commentRouter.delete("/:commentId", (req, res) => {
  commentController.deleteComment(req, res);
});

export default commentRouter;
