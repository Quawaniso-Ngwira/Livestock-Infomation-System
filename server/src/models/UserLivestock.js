module.exports = (sequelize, DataTypes) => {
  const UserLivestock = sequelize.define("UserLivestock", {

<<<<<<< HEAD:server/src/models/Livestock.js
    userBreedName: {
=======
    userBreedId:{
      type: DataTypes.BIGINT,
       autoIncrement: true, 
       allowNull: false,
        primaryKey: true ,

    }, 
    userLivestockName: {
>>>>>>> cc7dddbadee095926928195e79c65a9dddf5583f:server/src/models/UserLivestock.js
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.STRING,
      allowNull: false,
    } 
  });

return UserLivestock;
};
