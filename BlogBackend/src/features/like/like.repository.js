import mongoose from "mongoose";
import LikeSchema from "./like.schema.js";
import UserSchema from "../users/user.schema.js";
import BlogSchema from "../blog/blog.schema.js";

const likeModal = mongoose.model("Like", LikeSchema);
const userModal = mongoose.model("User", UserSchema);
const blogModal = mongoose.model("Blog", BlogSchema);

class LikeRepository {
  async getAllUserWhoLike(blogId) {
    const blog = await blogModal.findOne({ _id: blogId }).populate({
      path: "likes",
      populate: {
        path: "user",
        select: "username",
      },
    });
    // const users = blog.likes.map((u) => u.user.username);
    const users = blog.likes.map((u) => {
      return {
        username: u.user.username,
        likeId: u._id,
        userId: u.user,
        blogId: u.blogId,
      };
    });
    return users;
  }

  async toggleLike(email, blogId) {
    const user = await userModal.findOne({ email: email });
    const userId = user._id.toString();
    const like = await likeModal.findOne({ user: userId, blogId: blogId });
    const blog = await blogModal.findOne({ _id: blogId });

    if (!like) {
      const newLike = new likeModal({ user: userId, blogId: blogId });
      blog.likes.push(newLike);
      await blog.save();
      await newLike.save();
      return newLike;
    } else {
      const deletedLike = await likeModal.deleteOne({
        user: userId,
        blogId: blogId,
      });
      blog.likes.splice(blog.likes.indexOf(like), 1);
      await blog.save();
      return "disliked!";
    }
  }
}

export default LikeRepository;
