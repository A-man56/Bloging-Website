import express from "express";
import LikeController from "./like.controller.js";

const LikeRouter = express.Router();

const likeController = new LikeController();

//get like route
LikeRouter.get("/:blogId", (req, res) => {
  likeController.getAllUserWhoLike(req, res);
});

//toggle like route
LikeRouter.get("/toggle/:blogId", (req, res) => {
  likeController.toggleLike(req, res);
});

export default LikeRouter;
