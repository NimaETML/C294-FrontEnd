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
    await importUsers();
    await importWriters();
    await importCategories();
    await importBooks();
    await importComments();
    await importRates();
    console.log("La base de données db_Web295 a bien été synchronisée");
  } catch (error) {
    console.error(
      "Erreur lors de l'initialisation de la base de données :",
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

//import tous les utilisateurs presents dans le fichier db/mock-users
const importUsers = async () => {
  for (const user of users) {
    try {
      const hash = await bcrypt.hash(user.password, 10); // temps pour hasher = du sel
      const createdUser = await User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        nickName: user.nickName,
        password: hash,
        dateEntry: user.dateEntry,
        isAdmin: user.isAdmin,
      });
      console.log("User created:", createdUser.toJSON());
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
      console.log("Category created:", createdCategory.toJSON());
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
      console.log("Writer created:", createdWriter.toJSON());
    } catch (error) {
      console.error("Error creating writer:", error);
    }
  }
};

//import tous les livres presents dans le fichier db/mock-book
const importBooks = async () => {
  for (const book of books) {
    if (!book.userId) {
      console.error("Invalid data: comment must have userId", book);
    }
    if (!book.categoryId) {
      console.error("Invalid data: comment must have categoryId", book);
    }
    if (!book.writerId) {
      console.error("Invalid data: comment must have writerId", book);
    }
    try {
      const user = await User.findByPk(book.userId);
      const category = await Category.findByPk(book.categoryId);
      const writer = await Writer.findByPk(book.writerId);

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
        userId: user.id,
        categoryId: category.id,
        writerId: writer.id,
      });
      console.log("Book created or found:", createdBook.toJSON());
    } catch (error) {
      console.error("Error creating book:", error.message);
    }
  }
};

//import tous les commentaires presents dans le fichier db/mock-comments
const importComments = async () => {
  for (const comment of comments) {
    if (!comment.userId) {
      console.error("Invalid data: comment must have userId", comment);
    }
    if (!comment.bookId) {
      console.error("Invalid data: comment must have bookId", comment);
    }
    try {
      const user = await User.findByPk(comment.userId);
      const book = await Book.findByPk(comment.bookId);

      if (!user) {
        console.error("User not found for comment:", comment);
      }
      if (!book) {
        console.error("Book not found for comment:", comment);
      }

      const [createdComment, created] = await Comment.findOrCreate({
        where: {
          text: comment.text,
          userId: user.id,
          bookId: book.id,
        },
      });
      console.log("Comment created or found:", createdComment.toJSON());
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
    }
    if (!rate.bookId) {
      console.error("Invalid data: rate must have bookId", rate);
    }
    try {
      const user = await User.findByPk(rate.userId);
      const book = await Book.findByPk(rate.bookId);

      if (!user) {
        console.error("User not found for rate:", rate);
      }
      if (!book) {
        console.error("Book not found for rate:", rate);
      }

      const [createdRate, created] = await Rate.findOrCreate({
        where: {
          rating: rate.rating,
          userId: user.id,
          bookId: book.id,
        },
      });
      console.log("Rate created or found:", createdRate.toJSON());
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  }
};

export { sequelize, initDb, Book, User, Category, Writer, Comment, Rate };
