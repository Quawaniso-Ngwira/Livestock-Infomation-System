const express = require("express");
const app = express();
const cors = require("cors");
const swaggerJSDoc=require("swagger-jsdoc");
const swaggerUI=require("swagger-ui-express");


app.use(express.json());
app.use(cors());

const SwaggerOptions={
  swaggerDefinition:{
    openApi:'3.0.0',
    info:{
      title:'iWETA LMIS API',
      version:'1.0.0',
      description:'API to provide and manage cattle and pig managment information',
      contact:{
        name:'alinafe kamwendo',
        email:'bed-com-15-17@unima.ac.mw',
        phone:'+265993925060'
      },
      servers:["http://localhost:3001"]
    }
  },
  apis:['.routes/*.js']
}

const swaggerDocs=swaggerJSDoc(SwaggerOptions);
app.use('/api/swagger-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

//swagger definition

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
 * /auth/et
 *  post:
 *   summary:create user(registration)
 *   description:register user into the system
 *   requestBody:
 *    content:
 *      application/json:
 *      
 */
const db = require("./src/models");

// Routers
const postRouter = require("./src/routes/Posts");
app.use("/posts", postRouter);
const commentsRouter = require("./src/routes/Comments");
app.use("/comments", commentsRouter);
const usersRouter = require("./src/routes/Users");
app.use("/", usersRouter);
const likesRouter = require("./src/routes/Likes");
app.use("/likes", likesRouter);
const breedsRouter=require("./src/routes/Breeds");
app.use("/api/breeds",breedsRouter);
const livestockRouter=require("./src/routes/Livestock");
app.use("/api/livestock",livestockRouter);
const kholaRoute=require("./src/routes/Khola");
app.use('/',kholaRoute);
app.post('/auth/et',(req,res)=>{
  res.send("hello");
})

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});