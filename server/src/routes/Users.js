

const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../../config/middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  const duplicaterUser = await Users.findOne({ where: { username: username } });
  if(duplicaterUser) return res.json("user already registered");

  try{
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      email: email,
      password: hash,
    });
    res.json("SUCCESS");
  });
}
catch(err){
  res.status(500).json({"message":err.message});
}
});

//login, failed to put it in a controller for now
router.post("/login", async (req, res) => {
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


router.get("/basicinfo/:id", async (req, res) => {
const id = req.params.id;

const basicInfo = await Users.findByPk(id, {
  attributes: {exclude: ["password "]},});

  res.json(basicInfo);

});

//register controller
const registerRouter=require("../controllers/user/Register.controller");
router.post('/',registerRouter);


module.exports = router;
