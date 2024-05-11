import { Sequelize, DataTypes } from "sequelize";
import { BookModel } from "../models/books.mjs";
import { UserModel } from "../models/UserModel.mjs";
import { CategoryModel } from "../models/categories.mjs";
import { WriterModel } from "../models/writers.mjs";
import { CommentModel } from "../models/comments.mjs";
import { RateModel } from "../models/rates.mjs";
import bcrypt from "bcrypt";

///////////////////////////////////////À changer une fois la base de données soit créé/////////////////
const sequelize = new Sequelize("db_Web295", "root", "root", {
  host: "localhost",
  port: "6033",
  dialect: "mysql",
  logging: false,
});

let initDb = async () => {
  try {
    await sequelize.sync({ force: true });
    await importBooks();
    await importCategories();
    await importUsers();
    await importWriters();
    await importComments();
    await importRates();
    console.log(
      "La base de données db_passion_lecture a bien été synchronisée"
    );
  } catch (error) {
    console.error(
      "Erreur lors de l'initiaffsdfsdfsdfdsflisation de la base de données :",
      error
    );
  }
};

//Modèle des livres
import { books } from "./mock-books.mjs";
const Book = BookModel(sequelize, DataTypes);
//Modèle des commentaires
import { comments } from "./mock-comments.mjs";
const Comment = CommentModel(sequelize, DataTypes);
//Modèle des appréciations
import { rates } from "./mock-rates.mjs";
const Rate = RateModel(sequelize, DataTypes);
//Modèle des categories
import { categories } from "./mock-categories.mjs";
const Category = CategoryModel(sequelize, DataTypes);
//Modèle des écrivants
import { writers } from "./mock-writers.mjs";
const Writer = WriterModel(sequelize, DataTypes);
//Modèle des utilisateurs
import { users } from "./mock-user.mjs";
const User = UserModel(sequelize, DataTypes);

const models = {
  Book,
  Comment,
  Rate,
  Category,
  Writer,
  User,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

//import tous les livres presents dans le fichier db/mock-book
const importBooks = async () => {
  for (const book of books) {
    try {
      const createdBook = await Book.create({
        title: book.title,
        number_of_pages: book.number_of_pages,
        excerpt: book.excerpt,
        summary: book.summary,
        writer: book.writer,
        publisher: book.publisher,
        year_of_publication: book.year_of_publication,
        comments: book.comments,
        book_cover: book.book_cover,
        fkAddedBy: book.fkAddedBy,
      });
      console.log(createdBook.toJSON());
    } catch (error) {
      console.error("Error creating book:", error);
    }
  }
};

//import tous les utilisateurs presents dans le fichier db/mock-users
const importUsers = async () => {
  for (const user of users) {
    try {
      const hash = await bcrypt.hash(user.password, 10); // temps pour hasher = du sel
      const createdUser = await User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        password: hash,
        nickName: user.nickName,
        dateEntry: user.dateEntry,
      });
      console.log(createdUser.toJSON());
    } catch (error) {
      console.error("Error crating users:", error);
    }
  }
};

//import tous les categories presents dans le fichier db/mock-categories
const importCategories = async () => {
  for (const category of categories) {
    try {
      const createdCategory = await Category.create({
        name: category.name,
      });
      console.log(createdCategory.toJSON());
    } catch (error) {
      console.error("Error creating category:", error);
    }
  }
};

//import tous les écrivants presents dans le fichier db/mock-writers
const importWriters = async () => {
  for (const writer of writers) {
    try {
      const createdWriter = await Writer.create({
        firstName: writer.firstName,
        lastName: writer.lastName,
      });
      console.log(createdWriter.toJSON());
    } catch (error) {
      console.error("Error creating writer:", error);
    }
  }
};

//import tous les commentaires presents dans le fichier db/mock-comments
const importComments = async () => {
  for (const comment of comments) {
    if (!comment.userId) {
      console.error("Invalid data: comment must have userId", comment);
      //continue; // Si le commentaire n'a pas du userId, il saut au commentaire suivant
    }
    if (!comment.bookId) {
      console.error("Invalid data: comment must have bookId", comment);
      //continue; // Si le commentaire n'a pas du bookId, il saut au commentaire suivant
    }
    try {
      const user = await User.findByPk(comment.userId);
      const book = await Book.findByPk(comment.bookId);

      if (!user) {
        console.error("User not found for comment:", comment);
        // continue; // Si l'utilisateur correspendant n'est pas trouvé, il saut au commentaire suivant
      }
      if (!book) {
        console.error("Book not found for comment:", comment);
        // continue; // Si le livre correspendant n'est pas trouvé, il saut au commentaire suivant
      }

      const [createdComment, created] = await Comment.findOrCreate({
        where: {
          userId: user.id,
          bookId: book.id,
          text: comment.text,
        },
      });
      console.log(createdComment.toJSON());
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  }
};

//import tous les appréciations presents dans le fichier db/mock-rates
const importRates = async () => {
  for (const rate of rates) {
    if (!rate.userId) {
      console.error("Invalid data: rate must have userId", rate);
      //continue; // Si l'appréciation n'a pas du userId, il saut à l'appréciation suivante
    }
    if (!rate.bookId) {
      console.error("Invalid data: rate must have bookId", rate);
      //continue; // Si l'appréciation n'a pas du bookId, il saut à l'appréciation suivante
    }
    try {
      const user = await User.findByPk(rate.userId);
      const book = await Book.findByPk(rate.bookId);

      if (!user) {
        console.error("User not found for rate:", rate);
        // continue; // Si l'utilisateur correspendant n'est pas trouvé, il saut à l'appréciation suivante
      }
      if (!book) {
        console.error("Book not found for rate:", rate);
        // continue; // Si le livre correspendant n'est pas trouvé, il saut à l'appréciation suivante
      }

      const [createdRate, created] = await Rate.findOrCreate({
        where: {
          userId: user.id,
          bookId: book.id,
          rating: rate.rating,
        },
      });
      console.log(createdRate.toJSON());
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  }
};

export { sequelize, initDb, Book, User, Category, Writer, Comment, Rate };
