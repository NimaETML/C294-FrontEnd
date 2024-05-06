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
  port: "3306",
  dialect: "mysql",
  logging: false,
});

import { books } from "./mock-books.mjs";
//Le modele book
const Book = BookModel(sequelize, DataTypes);

let initDb = () => {
  return sequelize
    .sync({ force: true }) //Force la sychro => donc supprime les donnees egalement
    .then((_) => {
      importBooks();
      importCategories();
      importUsers();
      importWriters();
      importComments();
      importRates();
      console.log("La base de données db_Web295 a bien été synchronysé");
    });
};

const importBooks = () => {
  //import tous les livres presents dans le fichier db/mock-book
  books.map((book) => {
    Book.create({
      title: book.title,
      number_of_pages: book.number_of_pages,
      excerpt: book.excerpt,
      summary: book.summary,
      writer: book.writer,
      publisher: book.publisher,
      year_of_publication: book.year_of_publication,
      avg_rating: book.avg_rating,
      comments: book.comments,
      book_cover: book.book_cover,
      fkAddedBy: book.fkAddedBy,
    }).then((book) => console.log(book.toJSON()));
  });
};

import { comments } from "./mock-comments.mjs";
const Comment = CommentModel(sequelize, DataTypes);

const importComments = () => {
  comments.map((comment) => {
    Comment.create({
      text: comment.text,
    }).then((comment) => console.log(comment.toJSON()));
  });
};

import { rates } from "./mock-rates.mjs";
const Rate = RateModel(sequelize, DataTypes);

const importRates = () => {
  rates.map((rate) => {
    Rate.create({
      rating: rate.rating,
    }).then((rate) => console.log(rate.toJSON()));
  });
};

import { categories } from "./mock-categories.mjs";
const Category = CategoryModel(sequelize, DataTypes);

const importCategories = () => {
  categories.map((category) => {
    Category.create({
      name: category.name,
    }).then((category) => console.log(category.toJSON()));
  });
};

import { writers } from "./mock-writers.mjs";
const Writer = WriterModel(sequelize, DataTypes);

const importWriters = () => {
  writers.map((writer) => {
    Writer.create({
      firstName: writer.firstName,
      lastName: writer.lastName,
    }).then((writer) => console.log(writer.toJSON()));
  });
};

import { users } from "./mock-user.mjs";
const User = UserModel(sequelize, DataTypes);

const importUsers = () => {
  users.map((user) => {
    bcrypt
      .hash(user.password, 10)
      .then((hash) =>
        User.create({
          firstName: user.firstName,
          lastName: user.lastName,
          password: hash,
          nickName: user.nickName,
          dateEntry: user.dateEntry,
        })
      )
      .then((user) => console.log(user.toJSON()));
  });
};

export { sequelize, initDb, Book, User, Category, Writer, Comment, Rate };
