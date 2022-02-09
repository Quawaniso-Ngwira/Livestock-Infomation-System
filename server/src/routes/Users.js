
const express = require("express");
const router = express.Router();
const swaggerJSDoc=require("swagger-jsdoc");
const swaggerUI=require("swagger-ui-express");

const registerRouter=require("../controllers/user/authController");


/**
 * @swagger
 * definitions:
 *  User:
 *    type:object
 *    properties:
 *      id:
 *        type:intiger
 *         description:auto incremented attribute no need to specify
 *         example:'1'
 *      username:
 *         type:string
 *      email:
 *          type:string
 *      role:
 *          type:string
 *          description:can be either farmer or admin
 */


/**
 * @swagger
 * /auth/register
 *  post:
 *   summary:create user(registration)
 *   description:register user into the system
 *   requestBody:
 *    content:
 *      application/json:
 *      
 */

//register at /auth/register
router.post("/auth/register",registerRouter);

//login at /auth/login
router.post("/auth/login",registerRouter);

//infor abiout logged in user
router.get("/auth/user",registerRouter);

//find all users  at auth/users
router.get("/auth/users",registerRouter);

//get a specific user id
router.get("/auth/basicinfo/:id",registerRouter);
//update
router.put("/auth/update/:id",registerRouter);

//delete user by id at 3001/auth/delete/:id
router.delete("/auth/delete/:id",registerRouter);



module.exports = router;
