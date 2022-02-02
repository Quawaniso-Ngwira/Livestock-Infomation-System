const express = require("express");
const userLivestockRouter = express.Router();
const { UserLivestock: UserLivestocks } = require("../models");
const { validateToken } = require("../../config/middlewares/AuthMiddleware");
const swaggerJsDoc=require("swagger-jsdoc");
const swaggerUi=require("swagger-ui-express");



const userLivestockController = require("../controllers/userLivestock/userLivestockController");

//get all user livestock
userLivestockRouter.get('/',userLivestockController);

//get userlivestock by ID of the user livestock
userLivestockRouter.get("/byId/:id",userLivestockController);

//get user livestock by userId 
userLivestockRouter.get("/byuserId/:id",userLivestockController);

//post user livestock with with body {userLivestockName,origin,active}
userLivestockRouter.post("/",userLivestockController);

//delete userlivestock by ID
userLivestockRouter.delete("/:userBreedId",userLivestockController);

//updating
userLivestockRouter.put("/:userBreedId",userLivestockController);

module.exports = userLivestockRouter;