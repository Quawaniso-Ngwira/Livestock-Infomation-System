module.exports = (sequelize, DataTypes) => {
    const Khola = sequelize.define("Khola", {

      KholaName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Location:{
        type :DataTypes.STRING,
        allowNull:false,
      },
      Animal:{
        type :DataTypes.STRING,
        allowNull:false,
      },
      Number: {
        type: DataTypes.BIGINT,
        allowNull: false,
      }
    });
  
    return Khola;
  };
  