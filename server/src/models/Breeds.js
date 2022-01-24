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
      }
    });
  
    return Breeds;
  };
  