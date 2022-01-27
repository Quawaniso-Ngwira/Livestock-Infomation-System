const express = require("express");
const livestockRouter = express.Router();
const { Livestock: Livestock } = require("../models");
const { validateToken } = require("../../config/middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");
const { Breeds } = require("../models");

livestockRouter.get("/", validateToken, async (req, res) => {
  const listOfLivestock = await Livestock.findAll();
  res.json({ listOfLivestock: listOfLivestock});
});

 livestockRouter.get("/byId/:id", async (req, res) => {
 const id = req.params.id;
  const breed = await Livestock.findByPk(id);
  res.json(livestock);
 });

livestockRouter.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOflivestock = await Livestock.findAll({ where: {UserId: id}});
  res.json(listOflivestock);
});

livestockRouter.get("/:breedId", async (req, res) => {
  const {breedId} = req.params;
  const listOflivestock = await Livestock.findAll({ where: {BreedId: breedId}})
  res.json(listOflivestock);
});


livestockRouter.post("/:breedId/:userId", async (req, res) => {
  const{breedId, userId} = req.params
  const{userBreedName, origin, region, active, Dob, id} = req.body
  // const{userName, origin, region, active, Dob, id} = req.body
let userBread = {}
  console.log(userId)
  userBread.userBreedName = userBreedName;
  userBread.userBreedId=id;
  userBread.BreedId = breedId
  userBread.origin = origin
  userBread.region = region
  userBread.active = active
  userBread.UserId = userId
  userBread.Dob = Dob
 await Livestock.create(userBread);
  res.json(userBread); 
});


 livestockRouter.delete("/:livestockId", validateToken, async (req, res) => {
  const livestockId = req.params.livestockId;
  await Livestock.destroy({
    where: {
      id: livestockId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = livestockRouter;