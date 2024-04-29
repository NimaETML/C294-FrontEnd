import express from "express";
import { Category } from "../db/sequelize.mjs";
import { success } from "./helper.mjs";
import { Book } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";

const categoriesRouter = express();

//GET pour acceder a tous les categories
categoriesRouter.get("/", auth, (req, res) => {
  Category.findAll().then((categories) => {
    const message = "La liste des categories a bien été récupérée.";
    res.json(success(message, categories));
  })  
  .catch((error) => {
    const message =
      "La liste des categories n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  });
});

categoriesRouter.get("/:id",auth, (req, res) => {
  const categoryId = req.params.id;
  const category = Category.findByPk(categoryId)
    .then((category) => {
      if (category === null) {
        const message = "La catégorie demandée n'existe pas.";
        return res.status(404).json({ message });
      }
      const message = `La categorie dont l'id est ${categoryId} a été bien récuperé`;
      res.json(success(message, category));
    })
    .catch((error) => {
      const message =
        "La liste des categories n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

categoriesRouter.get("/:id/books", auth, (req, res) => {
  const categoryId = req.params.id;
  Book.findByPk(categoryId)
    .then((category) => {
      if (category === null) {
        const message = "La catégorie demandée n'existe pas.";
        return res.status(404).json({ message });
      }
      Book.findAll({ where: { fkCategory: categoryId } })
        .then((books) => {
          const message = `La liste des livres de la catégorie dont l'id vaut ${categoryId} a bien été récupérée.`;
          res.json({
            message: message,
            data: { count: books.length, rows: books },
          });
        })
        .catch((error) => {
          const message =
            "Les livres de cette catégorie n'ont pas pu être récupérés. Merci de réessayer dans quelques instants.";
          res.status(500).json({ message, data: error });
        });
    })
    .catch((error) => {
      const message =
        "La catégorie n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
    });
});

export { categoriesRouter };
