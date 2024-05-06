const RateModel = (sequelize, DataTypes) => {
  const rate = sequelize.define("Rate", {
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
  Comment.associate = (models) => {
    Comment.belongsTo(models.Book, {
      as: "book",
    });

    Comment.belongsTo(models.User, {
      as: "user",
    });
  };
  return rate;
};

export { RateModel };
