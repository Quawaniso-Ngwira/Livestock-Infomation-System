const express = require("express");
const userLivestockRouter = express.Router();
const { UserLivestock: UserLivestocks } = require("../models");
const { validateToken } = require("../../config/middlewares/AuthMiddleware");

userLivestockRouter.get("/", validateToken, async (req, res) => {
  const listOfUserBreeds = await UserLivestocks.findAll();
  res.json({ listOfBreeds: listOfUserBreeds});
});

 userLivestockRouter.get("/byId/:id", async (req, res) => {
 const id = req.params.id;
  const userlivestock = await UserLivestocks.findByPk(id);
  res.json(userlivestock);
 });

userLivestockRouter.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfUserBreeds = await UserLivestocks.findAll({ where: {UserId: id}});
  res.json(listOfUserBreeds);
});


userLivestockRouter.post("/", validateToken, async (req, res) => {

  const UserLivestock = req.body;
  UserLivestock.username = req.user.username;
  UserLivestock.UserId = req.user.id;
  await UserLivestocks.create(UserLivestock);
  res.json(UserLivestock);
});

 userLivestockRouter.delete("/:breedId", validateToken, async (req, res) => {
  const breedId = req.params.breedId;
  await UserLivestocks.destroy({
    where: {
      id: breedId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = userLivestockRouter;