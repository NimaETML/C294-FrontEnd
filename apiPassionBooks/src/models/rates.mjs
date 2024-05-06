const RateModel = (sequelize, DataTypes) => {
  const Rate = sequelize.define("Rate", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: {
          msg: "Utilisez uniquement des nombres pour le nombre de pages.",
        },
        notEmpty: {
          msg: "Le nombre de pages ne peut pas être vide.",
        },
        min: {
          args: [0.0],
          msg: "L'appreciation doit être supérieur ou égal à 0",
        },
        max: {
          args: [5.0],
          msg: "L'appreciation doit être inférieur ou égal à 5",
        },
      },
    },
  });
  Rate.associate = (models) => {
    Rate.belongsTo(models.Book, {
      as: "book",
    });

    Rate.belongsTo(models.User, {
      as: "user",
    });
  };
  return Rate;
};

export { RateModel };
