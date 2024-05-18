import express from "express";
import { Book, Category } from "../db/sequelize.mjs";
import { authVer } from "../auth/authVer.mjs";
import { authAdmin } from "../auth/authAdmin.mjs";
const categoriesRouter = express();

//GET pour acceder a tous les categories
categoriesRouter.get("/", authVer, async (req, res) => {
  try {
    const categories = await Category.findAll();
    const message = "La liste des categories a bien été récupérée.";
    res.json({ msg: message, data: categories });
  } catch (error) {
    const message =
      "La liste des categories n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ msg: message, data: error });
  }
});

//GET pour acceder aux categories par l'id
categoriesRouter.get("/:id", authVer, async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findByPk(categoryId);
  try {
    if (!category) {
      const message = "La catégorie demandée n'existe pas.";
      return res.status(404).json({ msg: message });
    }
    const message = `La categorie dont l'id est ${categoryId} a été bien récuperé`;
    res.json({ msg: message, data: category });
  } catch (error) {
    const message =
      "La liste des categories n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ msg: message, data: error });
  }
});

//GET trouve les categories qui appartient à un livre
categoriesRouter.get("/:id/books", authVer, async (req, res) => {
  const categoryId = req.params.id;
  const category = await Book.findByPk(categoryId);
  try {
    if (!category) {
      const message = "La catégorie demandée n'existe pas.";
      return res.status(404).json({ msg: message });
    }
    const categories = await Book.findAll({
      where: { categoryId: categoryId },
    });
    try {
      const message = `La liste des livres de la catégorie dont l'id vaut ${categoryId} a bien été récupérée.`;
      res.json({ msg: message, data: categories });
    } catch (error) {
      const message =
        "Les livres de cette catégorie n'ont pas pu être récupérés. Merci de réessayer dans quelques instants.";
      res.status(500).json({ msg: message, data: error });
    }
  } catch (error) {
    const message =
      "La catégorie n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ msg: message, data: error });
  }
});

//POST ajouter une catégorie
categoriesRouter.post("/", authAdmin, async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    const message = `La catégorie dont l'id est ${newCategory.id} a été bien créé`;
    res.json({ msg: message, data: newCategory });
  } catch (error) {
    const message = "Erreur lors de la création de la catégorie.";
    res.status(500).json({ msg: message });
  }
});

//PUT modifier une catégorie
categoriesRouter.put("/:id", authAdmin, async (req, res) => {
  const categoryId = req.params.id;
  const data = { ...req.body };
  const category = await Category.findByPk(categoryId);
  try {
    if (!category) {
      const message = "Catégorie non trouvée.";
      return res.status(404).json({ msg: message });
    }
    const updateCategory = await Category.update(data, {
      where: { id: categoryId },
    });
    const message = `La categorie avec l'id ${updateCategory.id} a été mis à jour avec succès et actuellement est ${updateCategory.name} `;
    res.status(200).json({ msg: message, data: updateCategory });
  } catch (error) {
    const message = "Erreur lors de la modification de la catégorie.";
    res.status(500).json({ msg: message });
  }
});

//DELETE supprimer une catégorie par id
categoriesRouter.delete("/:id", authAdmin, async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(category);
    if (!category) {
      const message =
        "La catégorie demandé n'existe pas. Merci de réesayer avec un autre identifiant.";
      return res.status(404).json({ msg: message });
    }
    const deletedCategory = await Category.destroy({
      where: { id: categoryId },
    });
    const message = `La catégorie ${deletedCategory.name} a bien été supprimé`;
    return res.json({ msg: message, data: deletedCategory });
  } catch (error) {
    const message =
      "La catégorie n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
    res.status(500), json({ msg: message, data: error });
  }
});

export { categoriesRouter };
