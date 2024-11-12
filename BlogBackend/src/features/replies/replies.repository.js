import mongoose from "mongoose";
import repliesSchema from "./replies.schema.js";
import CommentSchema from "../comment/comment.schema.js";
import UserSchema from "../users/user.schema.js";

const repliesModal = mongoose.model("Replies", repliesSchema);
const commentModal = mongoose.model("Comment", CommentSchema);
const userModal = mongoose.model("User", UserSchema);

class RepliesRepository {
  //add reply to particular comment by id repository
  async addReply(email, commentId, content) {
    const comment = await commentModal.findOne({ _id: commentId });
    const user = await userModal.findOne({ email });
    const reply = new repliesModal({
      user: user._id,
      commentId: commentId,
      content: content,
    });
    comment.replies.push(reply);
    await comment.save();
    await reply.save();
    return reply;
  }

  //get all the reply of the comment by commentId
  async getAllRepliesOfComment(commentId) {
    const repliesData = await commentModal
      .findOne({ _id: commentId })
      .populate("replies");

    // const replies = repliesData.replies.map((replie) => replie.content);
    const replies = repliesData.replies.map((replie) => {
      return { _id: replie._id, content: replie.content };
    });

    return replies;
  }

  async updateReply(replyId, content) {
    const reply = await repliesModal.findOne({ _id: replyId });
    reply.content = content;
    await reply.save();
    return reply;
  }
}
export default RepliesRepository;
