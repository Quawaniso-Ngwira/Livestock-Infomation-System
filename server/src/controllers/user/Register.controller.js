const express = require("express");
const registerRouter = express.Router();
const { Users } = require("../../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../../../config/middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");



registerRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

registerRouter.get("/auth", validateToken, (req, res) => {
    res.json(req.user);
  });


  module.exports=registerRouter;