import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  let token;
  token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_TOKEN);
    const { username, email } = payload;
    res.cookie("username", username);
    res.cookie("email", email);
  } catch (err) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  next();
};

export default jwtAuth;
