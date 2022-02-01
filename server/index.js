const express = require("express");
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(cors());

const db = require("./src/models");

// Routers
const postRouter = require("./src/routes/Posts");
app.use("/posts", postRouter);
const commentsRouter = require("./src/routes/Comments");
app.use("/comments", commentsRouter);
const usersRouter = require("./src/routes/Users");
app.use("/auth", usersRouter);
const likesRouter = require("./src/routes/Likes");
app.use("/likes", likesRouter);
const breedsRouter=require("./src/routes/Breeds");
app.use("/api/breeds",breedsRouter);
const livestockRouter=require("./src/routes/Livestock");
app.use("/api/livestock",livestockRouter);


db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});