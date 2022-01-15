module.exports = (sequelize, DataTypes) => {
    const livestock = sequelize.define("Livestock", {

      livestockId:{
        type: DataTypes.BIGINT,
         autoIncrement: true, 
         allowNull: false,
          primaryKey: true ,

      },
      livestockName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      livestockColor: {
        type: DataTypes.STRING,
        allowNull: false,
      }
      });
  
    return livestock;
  };
  