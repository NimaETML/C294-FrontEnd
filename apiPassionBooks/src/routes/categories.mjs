import express from "express";
import { Book, Category } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";
import { authVer } from "../auth/authVer.mjs";
const categoriesRouter = express();

//GET pour acceder a tous les categories
categoriesRouter.get("/", authVer, async (req, res) => {
  try {
    const categories = await Category.findAll();
    const message = "La liste des categories a bien été récupérée.";
    res.json({ message, data: categories });
  } catch (error) {
    const message =
      "La liste des categories n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, error });
  }
});

categoriesRouter.get("/:id", authVer, async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findByPk(categoryId);
  try {
    if (category === null) {
      const message = "La catégorie demandée n'existe pas.";
      return res.status(404).json({ message });
    }
    const message = `La categorie dont l'id est ${categoryId} a été bien récuperé`;
    res.json((message, category));
  } catch (error) {
    const message =
      "La liste des categories n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, error });
  }
});

categoriesRouter.get("/:id/books", async (req, res) => {
  const categoryId = req.params.id;
  const category = await Book.findByPk(categoryId);
  try {
    if (category === null) {
      const message = "La catégorie demandée n'existe pas.";
      return res.status(404).json({ message });
    }
    Book.findAll({ where: { categoryId: categoryId } })
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
  } catch (error) {
    const message =
      "La catégorie n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  }
});
/*
categoriesRouter.post("/", auth, async (req, res) => {
  if (!res.locals.isAdmin) {
    return res.status(403).json({ message: "Accès non autorisé." });
  }

  try {
    const newCategory = await Category.create({ name: req.body.name });
    res.status(201).json(newCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la catégorie." });
  }
});

categoriesRouter.put("/:id", auth, async (req, res) => {
  if (!res.locals.isAdmin) {
    return res.status(403).json({ message: "Accès non autorisé." });
  }

  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Catégorie non trouvée." });
    }

    category.name = req.body.name;
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la modification de la catégorie." });
  }
});
*/
export { categoriesRouter };
