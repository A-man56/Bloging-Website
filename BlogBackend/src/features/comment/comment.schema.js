import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Types.ObjectId, // Reference to the Blog Post
    ref: "Post",
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId, // Reference to the User who commented
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  likes: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Replies",
      required: true,
    },
    // {
    //   userId: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "User",
    //   },
    //   content: {
    //     type: String,
    //     trim: true,
    //   },
    //   createdAt: {
    //     type: Date,
    //     default: Date.now,
    //   },
    // },
  ],
});

export default CommentSchema;
