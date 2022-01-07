module.exports = (sequelize, DataTypes) => {
    const Breeds = sequelize.define("Breeds", {
      breedName: {
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
      },
      breedId:{
        type: DataTypes.BIGINT,
         autoIncrement: true, 
         allowNull: false,
          primaryKey: true ,
          
      }
    });
  
    return Breeds;
  };
  