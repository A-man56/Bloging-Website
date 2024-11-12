import mongoose from "mongoose";

const repliesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

  commentId: {
    type: mongoose.Types.ObjectId,
    ref: "Comment",
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default repliesSchema;
