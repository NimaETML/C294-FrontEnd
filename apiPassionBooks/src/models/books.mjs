const BookModel = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Ce titre est déjà utilisé.",
        },
        validate: {
          is: {
            args: /^[A-Za-z0-9\s]/,
            msg: "Seules les lettres, les chiffres et les espaces sont autorisées.",
          },
          notEmpty: {
            msg: "Le titre du livre ne peut pas être vide",
          },
          notNull: {
            msg: "Le titre du livre est une propriété obligatoire.",
          },
          len: {
            args: [0, 60],
            msg: "La titre du livre doit contenir au maximum 60 caractères.",
          },
        },
      },
      number_of_pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres pour le nombre de pages.",
          },
          notEmpty: {
            msg: "Le nombre de pages ne peut pas être vide.",
          },
          notNull: {
            msg: "Le nombre de pages est une propriété obligatoire",
          },
          min: {
            args: [10.0],
            msg: "Le nombre de pages doit être supérieur ou égal à 10 pages",
          },
          max: {
            args: [1000.0],
            msg: "Le nombre de pages doit être inférieur ou égal à 1000 pages",
          },
        },
      },
      excerpt: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Ce lien appartient déjà à un livre.",
        },
        validate: {
          notEmpty: {
            msg: "Le lien de l'extrait du livre ne peut pas être vide.",
          },
          notNull: {
            msg: "Le lien de l'extrait du livre est une propriété obligatoire",
          },
          len: {
            args: [0, 250],
            msg: "Le lien de l'extrait du livre doit contenir au maximum 250 caractères.",
          },
        },
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Ce résumé appartient déjà à un livre.",
        },
        validate: {
          is: {
            args: /^[A-Za-z0-9\s]/,
            msg: "Seules les lettres, les chiffres et les espaces sont autorisées.",
          },
          notEmpty: {
            msg: "Le résumé du livre ne peut pas être vide.",
          },
          notNull: {
            msg: "Le résumé du livre est une propriété obligatoire",
          },
          len: {
            args: [0, 500],
            msg: "Le résumé du livre doit contenir au maximum 500 caractères.",
          },
        },
      },
      publisher: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-z0-9\s]/,
            msg: "Seules les lettres et les espaces sont autorisées.",
          },
          notEmpty: {
            msg: "L'éditeur du livre ne peut pas être vide.",
          },
          notNull: {
            msg: "L'éditeur du livre est une propriété obligatoire",
          },
          len: {
            args: [0, 50],
            msg: "L'éditeur du livre doit contenir au maximum 50 caractères.",
          },
        },
      },
      year_of_publication: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "L'année d'édition du livre ne peut pas être vide.",
          },
          notNull: {
            msg: "L'année d'édition est une propriété obligatoire",
          },
        },
      },
      book_cover: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Cette image de couverture est déjà utilisé.",
        },
        validate: {
          notNull: {
            msg: "L'image de couverture du livre est une propriété obligatoire",
          },
        },
      },
      fkWriter: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Le fkWriter peu juste être un nombre.",
          },
          notEmpty: {
            msg: "Le fkWriter ne peut pas être vide.",
          },
          notNull: {
            msg: "Le fkWriter est une propriété obligatoire.",
          },
        },
      },
      fkAddedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: "Le fkAddedBy peu juste être un nombre.",
          },
          notEmpty: {
            msg: "Le fkAddedBy ne peut pas être vide.",
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );

  Book.associate = (models) => {
    Book.hasMany(models.Comment, {
      as: "comment",
    });
    Book.hasMany(models.Rate, {
      as: "rate",
    });
    Book.hasMany(models.Rate, {
      as: "writer",
    });

    Book.belongsToMany(models.Category, {
      through: "BookCategory",
      as: "categories",
      foreignKey: "bookId",
      otherKey: "categoryId",
    });
  };
  return Book;
};

export { BookModel };
