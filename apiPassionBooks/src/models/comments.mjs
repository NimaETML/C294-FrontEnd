const CommentModel = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
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
  });
  Comment.associate = (models) => {
    Comment.belongsTo(models.Book, {
      foreignKey: "bookId",
    });

    Comment.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };
  return Comment;
};
export { CommentModel };
