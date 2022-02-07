const express = require("express");
const userLivestockController = express.Router();
const { UserLivestock: UserLivestocks } = require("../../models");
const { validateToken } = require("../../../middlewares/AuthMiddleware");

userLivestockController.get("/", validateToken, async (req, res) => {
  const listOfUserBreeds = await UserLivestocks.findAll();
  res.json({ listOfBreeds: listOfUserBreeds});
});

 userLivestockController.get("/byId/:id", async (req, res) => {
 const id = req.params.id;
  const userlivestock = await UserLivestocks.findByPk(id);
  res.json(userlivestock);
 });

userLivestockController.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfUserBreeds = await UserLivestocks.findAll({ where: {UserId: id}});
  res.json(listOfUserBreeds);
});


userLivestockController.post("/", validateToken, async (req, res) => {

  const UserLivestock = req.body;
  UserLivestock.username = req.user.username;
  UserLivestock.UserId = req.user.id;
  await UserLivestocks.create(UserLivestock);
  res.json(UserLivestock);
});

 userLivestockController.delete("/:userBreedId", validateToken, async (req, res) => {
  const breedId = req.params.userBreedId;
  await UserLivestocks.destroy({
    where: {
      userBreedId:breedId,
    },
  });
  res.json("DELETED SUCCESSFULLY");
});

userLivestockController.put("/:userBreedId", validateToken, async (req, res) => {
  const breedId = req.params.userBreedId;
  await UserLivestocks.update(req.body,{
    where: {
      userBreedId:breedId,
    },
  });
  res.json("updated succesfully");
});

module.exports = userLivestockController;