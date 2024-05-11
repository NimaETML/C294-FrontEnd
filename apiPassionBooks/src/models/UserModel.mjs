const UserModel = (sequelize, Datatypes) => {
  const User = sequelize.define("User", {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Le prénom de l'utilisateur ne peut pas être vide.",
        },
        notNull: {
          msg: "Le prénom de l'utilisateur est une propriété obligatoire.",
        },
        len: {
          args: [0, 45],
          msg: "Le prénom de l'utilisateur doit contenir au maximum 45 caractères.",
        },
      },
    },
    lastName: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Le nom de l'utilisateur ne peut pas être vide.",
        },
        notNull: {
          msg: "Le nom de l'utilisateur est une propriété obligatoire.",
        },
        len: {
          args: [0, 35],
          msg: "Le nom de l'utilisateur doit contenir au maximum 35 caractères.",
        },
      },
    },
    password: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Le mot de passe de l'utilisateur ne peut pas être vide.",
        },
        notNull: {
          msg: "Le mot de passe de l'utilisateur est une propriété obligatoire.",
        },
        len: {
          args: [0, 150],
          msg: "Le mot de passe de l'utilisateur doit contenir au maximum 200 caractères.",
        },
      },
    },
    nickName: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: {
        msg: "Ce pseudo est déjà utilisé.",
      },
      validate: {
        notEmpty: {
          msg: "Le pseudo de l'utilisateur ne peut pas être vide.",
        },
        notNull: {
          msg: "Le pseudo de l'utilisateur est une propriété obligatoire.",
        },
        len: {
          args: [0, 30],
          msg: "Le pseudo de l'utilisateur doit contenir au maximum 30 caractères.",
        },
      },
    },
    dateEntry: {
      type: Datatypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "La date d'entrée de l'utilisateur ne peut pas être vide.",
        },
        notNull: {
          msg: "La date d'entrée est une propriété obligatoire.",
        },
      },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Comment, {
      foreignKey: "commentId",
    });
    User.hasMany(models.Rate, {
      foreignKey: "rateId",
    });
  };

  return User;
};

export { UserModel };
