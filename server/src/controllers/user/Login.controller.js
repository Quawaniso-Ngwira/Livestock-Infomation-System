const express = require("express");
const loginRouter = express.Router();
const { Users } = require("../../models/Users");
const bcrypt = require("bcrypt");
const { validateToken } = require("../../../config/middlewares");
const { sign } = require("jsonwebtoken");


loginRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    const user = await Users.findOne({ where: { username: username } });
  
    if (!user) res.json({ error: "User Doesn't Exist" });
  
    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) res.json({ error: "Wrong Username And Password Combination" });
  
      const accessToken = sign(
        { username: user.username, id: user.id },
        "importantsecret"
      );
      res.json({ token: accessToken, username: username, id: user.id });
    });
  });
 

  module.exports=loginRouter;