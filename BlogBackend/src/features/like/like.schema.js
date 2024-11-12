import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  //multiple references
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default LikeSchema;
