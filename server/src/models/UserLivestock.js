module.exports = (sequelize, DataTypes) => {
    const UserLivestock = sequelize.define("UserLivestock", {
  
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type:{
        type :DataTypes.STRING,
        allowNull:false,
      },
      Breed: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Vaccinated:{
        type :DataTypes.STRING,
        allowNull:false,
      },
    });
  
    return UserLivestock;
  };
  