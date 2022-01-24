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

    Breeds.associate = (models) => {
      Breeds.hasMany(models.Livestock, {
        onDelete: "cascade",
      });
      };
  
    return Breeds;
  };
  