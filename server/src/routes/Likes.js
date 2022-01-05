const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../../config/middlewares/AuthMiddleware");

//post comment controller
const postComment=require("../controllers/Likes/PostComment.controller");
router.post('/',postComment);

module.exports = router;
