const express = require("express");
const userLivestockRouter = express.Router();
const { UserLivestockModel: UserLivestockModel } = require("../models");
const { validateToken } = require("../../config/middlewares/AuthMiddleware");

userLivestockRouter.get("/", validateToken, async (req, res) => {
  const listOfUserBreeds = await UserLivestockModel.findAll();
  res.json({ listOfBreeds: listOfUserBreeds});
});

 userLivestockRouter.get("/byId/:id", async (req, res) => {
 const id = req.params.id;
  const userlivestock = await UserLivestockModel.findByPk(id);
  res.json(userlivestock);
 });

userLivestockRouter.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfUserBreeds = await UserLivestockModel.findAll({ where: {UserId: id}});
  res.json(listOfUserBreeds);
});


userLivestockRouter.post("/", validateToken, async (req, res) => {

  const breed = req.body;
  breed.username = req.user.username;
  breed.UserId = req.user.id;
  await UserLivestockModel.create(breed);
  res.json(breed);
});

 userLivestockRouter.delete("/:breedId", validateToken, async (req, res) => {
  const breedId = req.params.breedId;
  await UserLivestockModel.destroy({
    where: {
      id: breedId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = userLivestockRouter;