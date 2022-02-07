const express = require("express");
const registerRouter = express.Router();
const { Users } = require("../../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../../../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");
const {authoriseRoute}=require("../../../middlewares/RoleMiddleware");
const { DATE } = require("sequelize");



registerRouter.get("/auth/user", validateToken, (req, res) => {

  try {
    res.json(req.user);  
  } catch (error) {
    res.status(500).json("message",error.message);
  }
    
  });

registerRouter.post("/auth/register", async (req, res) => {
  const { username,role,password } = req.body;

  const duplicaterUser = await Users.findOne({ where: { username: username } });

  if(duplicaterUser) {
    console.log("user already registered");
    return res.json("user already registered");}
  
  try{
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      role:role,
      password: hash,
    });
    res.json("user registred succesfully");
  });
}
catch(err){
  res.status(500).json({"message":err.message});
}
});

//update
registerRouter.put("/auth/update/:id",validateToken, async (req, res) => {
  const id=req.params.id;
  const { username,role,password} = req.body;

  const findId=await Users.findByPk(id);
  if(!findId) {
    console.log("sorry id not found");
    return res.json('no user with that id');
  }
  try{

  bcrypt.hash(password, 10).then((hash) => {
    Users.update({
      username:username,
      role:role,
      password:hash},{
     where:{ id:id}
    });
    res.json("user updated succesfully");
  });
}
catch(err){
  res.status(500).json({"message":err.message});
}
});

//login, failed to put it in a controller for now
registerRouter.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json({ token: accessToken, username: username,role:user.role,id: user.id});
  });
});


registerRouter.get("/auth/basicinfo/:id", validateToken,async (req, res) => {

const id = req.params.id;

const basicInfo = await Users.findByPk(id, {
  attributes: {exclude: ["password "]},});

  res.json(basicInfo);

});

registerRouter.get("/auth/users", validateToken,async (req, res) => {
 
  const allUsers = await Users.findAll({attributes: {exclude: ["password "]}});
  
    res.json({allusers: allUsers});
  
  });
  registerRouter.delete("/auth/delete/:id", validateToken, async (req, res) => {
    const id = req.params.id;
    await Users.destroy({
      where: {
        id:id,
      },
    });
    res.json("DELETED SUCCESSFULLY");
  });






  module.exports=registerRouter;