const CategoryModel = (sequelize, DataTypes) => {
  return sequelize.define("Category", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: {
          args: /^[A-Za-z0-9\s]/,
          msg: "Seules les lettres, les chiffres et les espaces sont autorisées.",
        },
        notEmpty: {
          msg: "La categorie du livre ne peut pas être vide.",
        },
        len: {
          args: [0, 30],
          msg: "La categorie du livre doit contenir au maximum 30 caractères.",
        },
      },
    },
  });
};
export { CategoryModel };
