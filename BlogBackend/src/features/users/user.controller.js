import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  //signup controller
  async signup(req, res) {
    const userObj = req.body;
    let user;
    try {
      user = await this.userRepository.signup(userObj);
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });
    }
    res.status(200).json({ success: true, msg: user });
  }

  //signin controller
  async signin(req, res) {
    const { email, password } = req.body;
    const user = await this.userRepository.findUserByEmail(email, true);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "Email or Password is wrong!" });
    }
    const isValidPassword = bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, msg: "Email or Password is wrong!" });
    }
    const { username } = user;
    const token = jwt.sign(
      { username: username, email: email },
      process.env.JWT_TOKEN,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token);
    return res.status(200).json({ success: true, msg: "Login Successfull!" });
  }

  //logout controller
  async logout(req, res) {
    for (let cookie in req.cookies) {
      res.clearCookie(cookie);
    }
    res.status(200).json({ succcess: true, msg: "Logout successfull!" });
  }
}
export default UserController;
