const CommentModel = (sequelize, DataTypes) => {
  return sequelize.define("Comment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        is: {
          args: /^[A-Za-z0-9\s]/,
          msg: "Seules les lettres, les chiffres et les espaces sont autorisées.",
        },
        notEmpty: {
          msg: "Le commentaire du livre ne peut pas être vide.",
        },
        len: {
          args: [0, 300],
          msg: "Le commentaire du livre doit contenir au maximum 300 caractères.",
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
export { CommentModel };
