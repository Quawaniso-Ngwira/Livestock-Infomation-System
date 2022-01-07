const express = require("express");
const breedsRouter = express.Router();
const { Breeds: Breeds } = require("../models");
const { validateToken } = require("../../config/middlewares/AuthMiddleware");

breedsRouter.get("/", validateToken, async (req, res) => {
  const listOfBreeds = await Breeds.findAll();
  res.json({ listOfBreeds: listBreeds});
});

 breedsRouter.get("/byId/:id", async (req, res) => {
 const id = req.params.id;
  const breed = await Breeds.findByPk(id);
  res.json(breed);
 });

breedsRouter.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfBreeds = await Breeds.findAll({ where: {UserId: id}});
  res.json(listOfBreeds);
});


breedsRouter.post("/", validateToken, async (req, res) => {
  console.log("executing posting breed now will console log req body");
  console.log(req.body);
  console.log("finished printing breed req body");
  const breed = req.body;
  breed.username = req.user.username;
  breed.UserId = req.user.id;
  await Breeds.create(breed);
  res.json(breed);
});

 breedsRouter.delete("/:breedId", validateToken, async (req, res) => {
  const breedId = req.params.breedId;
  await Breeds.destroy({
    where: {
      id: breedId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = breedsRouter;