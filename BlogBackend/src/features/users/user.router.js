import express from "express";
import UserController from "./user.controller.js";

const UserRouter = express.Router();

const userController = new UserController();

//signup router
UserRouter.post("/signup", (req, res) => {
  userController.signup(req, res);
});

//signin router
UserRouter.post("/signin", (req, res) => {
  userController.signin(req, res);
});

//logout router
UserRouter.post("/logout", (req, res) => {
  userController.logout(req, res);
});

export default UserRouter;
