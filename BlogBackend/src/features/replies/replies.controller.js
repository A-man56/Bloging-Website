import RepliesRepository from "./replies.repository.js";

class RepliesController {
  constructor() {
    this.repliesRepository = new RepliesRepository();
  }

  async addReply(req, res) {
    const { commentId } = req.params;
    const { content } = req.body;
    const { email } = req.cookies;
    const reply = await this.repliesRepository.addReply(
      email,
      commentId,
      content
    );
    return res.status(200).json({ success: true, msg: reply });
  }

  async getAllRepliesOfComment(req, res) {
    const { commentId } = req.params;
    const replies = await this.repliesRepository.getAllRepliesOfComment(
      commentId
    );
    return res.status(200).json({ success: true, msg: replies });
  }

  async updateReply(req, res) {
    const { replyId } = req.params;
    const { content } = req.body;
    const updatedReply = await this.repliesRepository.updateReply(
      replyId,
      content
    );
    return res.status(200).json({ success: true, msg: updatedReply });
  }
}
export default RepliesController;
