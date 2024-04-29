const RateModel = (sequelize, DataTypes) => {
  return sequelize.define("Rate", {
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
    fkUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Le fkUser peu juste être un nombre.",
        },
        notEmpty: {
          msg: "Le fkUser ne peut pas être vide.",
        },
        notNull: {
          msg: "Le fkUser est une propriété obligatoire.",
        },
      },
    },
    fkBook: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Le fkBook peu juste être un nombre.",
        },
        notEmpty: {
          msg: "Le fkBook ne peut pas être vide.",
        },
        notNull: {
          msg: "Le fkBook est une propriété obligatoire.",
        },
      },
    },
  });
};

export { RateModel };
