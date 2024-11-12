import mongoose from "mongoose";
import CommentSchema from "./comment.schema.js";
import UserSchema from "../users/user.schema.js";

const CommentModal = mongoose.model("Comment", CommentSchema);
const UserModal = mongoose.model("User", UserSchema);

class CommentRepository {
  //add comment repository
  async createComment(commentObj) {
    const newComment = new CommentModal(commentObj);
    await newComment.save();
    return newComment;
  }

  //finding all the comment by the blog id repository
  async findAllCommentByBlogId(blogId) {
    const comments = await CommentModal.find({ blogId: blogId });
    const contents = comments.map((cont) => cont.content);
    return contents;
  }

  //toggle like to the comment by comment id repository
  async toggleCommentLike(commentId, userId) {
    const comment = await CommentModal.findOne({ _id: commentId });

    const index = comment.likes.findIndex((i) => i.userId.equals(userId));

    if (index == -1) {
      comment.likes.push({ userId: userId });
      await comment.save();
      return comment.likes;
    } else {
      comment.likes.splice(index, 1);
      await comment.save();
      return comment.likes;
    }
  }

  //get all the commet of blog by id repository
  async getAllCommentOfBlogById(commentId) {
    const comment = await CommentModal.findOne({ _id: commentId }).populate(
      "likes.userId",
      "username email"
    );

    // const usernames = comment.likes.map((like) => like.userId.username);
    const usernames = comment.likes.map((like) => {
      return {
        likeId: like._id,
        userId: like.userId._id,
        userName: like.userId.username,
        userEmail: like.userId.email,
      };
    });
    // console.log(usernames);
    return usernames;
  }

  //update comment repository
  async updateComment(email, commentId, newContent) {
    const user = await UserModal.findOne({ email });
    const comment = await CommentModal.findOne({
      _id: commentId,
      userId: user._id,
    });
    comment.content = newContent;
    await comment.save();
    return comment;
  }

  //delete comment repository
  async deleteComment(email, commentId) {
    const user = await UserModal.findOne({ email: email });
    console.log(user);
    const deletedComment = await CommentModal.findOneAndDelete({
      _id: commentId,
      userId: user._id,
    });
    return deletedComment;
  }
}

export default CommentRepository;
