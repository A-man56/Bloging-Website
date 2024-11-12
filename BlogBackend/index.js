import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import UserRouter from "./src/features/users/user.router.js";
import cookieParser from "cookie-parser";
import connectToMongoose from "./src/config/mongooseConnection.js";
import BlogRouter from "./src/features/blog/blog.router.js";
import LikeRouter from "./src/features/like/like.router.js";
import jwtAuth from "./src/middleware/jwtAuth.js";
import commentRouter from "./src/features/comment/comment.router.js";
import repliesRouter from "./src/features/replies/replies.route.js";

dotenv.config();
const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", UserRouter);
app.use("/api/blogs", jwtAuth, BlogRouter);
app.use("/api/likes", jwtAuth, LikeRouter);
app.use("/api/comments", jwtAuth, commentRouter);
app.use("/api/replies", jwtAuth, repliesRouter);

app.listen(port, () => {
  connectToMongoose();
  console.log("Server is up at the port", port);
});
