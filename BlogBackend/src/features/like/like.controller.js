import LikeRepository from "./like.repository.js";

class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  async getAllUserWhoLike(req, res) {
    const { blogId } = req.params;
    const users = await this.likeRepository.getAllUserWhoLike(blogId);
    return res.status(200).json({ success: true, msg: users });
  }

  async toggleLike(req, res) {
    const { email } = req.cookies;
    const { blogId } = req.params;
    try {
      let like = await this.likeRepository.toggleLike(email, blogId);
      return res.status(200).json({ success: true, msg: like });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, msg: "Internal server problem" });
    }
  }
}

export default LikeController;
