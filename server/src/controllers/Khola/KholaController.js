const express = require("express");
const kholaRouter = express.Router();
const {Khola: Kholas,Users } = require("../../models");
const { validateToken } = require("../../../middlewares/AuthMiddleware");

kholaRouter.get("/khola/All", validateToken, async (req, res) => {
  const makola = await Kholas.findAll();
  res.json({ ListofAll: makola});
});

 kholaRouter.get("/khola/ById/:id", async (req, res) => {
 const id = req.params.id;
  const khola = await Kholas.findByPk(id);
  res.json(khola);
 });

kholaRouter.get("/khola/ByUserId/:id", async (req, res) => {
  const id = req.params.id;
  
  const user=await Users.findByPk(id);
  const listOfKhola = await Kholas.findAll({ where: {UserId:id}});
     if(user){
        try {
         if(listOfKhola.length===0){
          res.json("user does not own any khola");
        }else{
        res.json(listOfKhola);
      }
     } catch (error) {
       
     } 
      
  }
  else{
      res.json("user not found");
  }
});


kholaRouter.post("/khola/create", validateToken, async (req, res) => {
  const { KholaName,Location,Animal,Number} = req.body;

  const duplicateKhola = await Kholas.findOne({ where: { KholaName:KholaName,Location:Location,Animal:Animal}});

  if(duplicateKhola) {
    return res.json("khola of same same same location and same animal already exists");}
  
  try {
    const khola = req.body;
  khola.username = req.user.username;
  khola.UserId = req.user.id;
    await Kholas.create(khola);
  res.json(khola);
  } catch (err) {
      return res.send("message",err.message);
  }
  
});

 kholaRouter.delete("/khola/delete/:id", validateToken, async (req, res) => {
  const kholaId = req.params.id;
  await Kholas.destroy({
    where: {
      id:kholaId,
    },
  });
  res.json("KHOLA DELETED SUCCESSFULLY");
});

kholaRouter.put("/khola/update/:id", validateToken, async (req, res) => {
  const kholaId = req.params.id;
  await Kholas.update(req.body,{
    where: {
      id:kholaId,
    },
  });
  res.json("khola updated succesfully");
});

module.exports = kholaRouter;