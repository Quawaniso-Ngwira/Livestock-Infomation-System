const express = require("express");
const livestockRouter = express.Router();
const { Livestock: Livestock } = require("../models");
const { validateToken } = require("../../config/middlewares/AuthMiddleware");

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

  const livestock = req.body;
  livestock.username = req.user.username;
  livestock.UserId = req.user.id;
  livestock.breedId=req.breed.Id;
  await Livestock.create(livestock);
  res.json(livestock);
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