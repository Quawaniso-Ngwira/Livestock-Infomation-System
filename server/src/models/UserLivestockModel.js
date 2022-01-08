module.exports = (sequelize, DataTypes) => {
    const UserLivestock = sequelize.define("UserLivestock", {

      userBreedId:{
        type: DataTypes.BIGINT,
         autoIncrement: true, 
         allowNull: false,
          primaryKey: true ,
          
      },
      userBreedName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      region:{
        type :DataTypes.STRING,
        allowNull:false,
      },
      active: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
    });
  
    return UserLivestock;
  };
  