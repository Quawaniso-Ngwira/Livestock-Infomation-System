module.exports = (sequelize, DataTypes) => {
    const Breeds = sequelize.define("Breeds", {

      // breedId:{
      //   type: DataTypes.BIGINT,
      //    autoIncrement: true, 
      //    allowNull: false,
      //     primaryKey: true ,

      // }, 
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
      } 
    });

    return Breeds;
  };
  