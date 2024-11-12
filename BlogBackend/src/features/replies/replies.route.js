import express from "express";
import RepliesController from "./replies.controller.js";

const repliesRouter = express.Router();

const repliesController = new RepliesController();

//add reply to a comment by id router
repliesRouter.post("/:commentId", (req, res) => {
  repliesController.addReply(req, res);
});

//get all the reply of a commnet by id router
repliesRouter.get("/:commentId", (req, res) => {
  repliesController.getAllRepliesOfComment(req, res);
});

//update reply of the comment by reply id router
repliesRouter.put("/:replyId", (req, res) => {
  repliesController.updateReply(req, res);
});

export default repliesRouter;
