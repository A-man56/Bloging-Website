import mongoose from "mongoose";
import UserSchema from "./user.schema.js";

const userModel = mongoose.model("User", UserSchema);

class UserRepository {
  //signup repository
  async signup(userObj) {
    const newUser = new userModel(userObj);
    await newUser.save();
    return newUser;
  }

  //find user by email repository
  async findUserByEmail(email, withEmail = false) {
    if (withEmail) {
      return userModel.findOne({ email }).select("+password");
    }
    return userModel.findOne({ email });
  }
}
export default UserRepository;
