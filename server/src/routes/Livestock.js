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


livestockRouter.post("/", validateToken, async (req, res) => {
  const userBreedName = req.body;
  const breed = await Breeds.findOne({ where: { userBreedName: userBreedName } });

  const accessToken = sign(
    { userBreedName: breed.userBreedName, id: breed.id },
    "importantsecret"
  );
  res.json({ token: accessToken, userBreedName: userBreedName, id: breed.id });
  
  userBreedName.username = req.user.username;
  userBreedName.UserId = req.user.id;
  userBreedName.breedId=req.breed.id;
  await BreedName.create(userBreedName);
  res.json(userBreedName); 
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