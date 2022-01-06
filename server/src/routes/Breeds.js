const express = require("express");
const breedsRouter = express.Router();
const { Posts: Breeds, Likes } = require("../models");

const { validateToken } = require("../../config/middlewares/AuthMiddleware");

breedsRouter.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Breeds.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});

breedsRouter.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const breed = await Breeds.findByPk(id);
  res.json(breed);
});

breedsRouter.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Breeds.findAll({ where: {UserId: id}, include: [Likes],  });
  res.json(listOfPosts);
});


breedsRouter.post("/", validateToken, async (req, res) => {
  const breed = req.body;
  //breed.id=breed.user.UserId
  breed.breedName = req.breed.breedName;
  breed.origin=req.breed.origin;
  breed.active = req.breed.active;
  await Breeds.create(breed);
  res.json(breed);
});

breedsRouter.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Breeds.destroy({
    where: {
      id: postId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = breedsRouter;