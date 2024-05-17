import express from "express";
import { Book, User, Category, Writer } from "../db/sequelize.mjs";
import { success } from "./helper.mjs";
import { auth } from "../auth/auth.mjs";
import { authVer } from "../auth/authVer.mjs";
const booksRouter = express();
//{ order: ["title"] }
//GET pour acceder a tous les libres
booksRouter.get("/", authVer, async (req, res) => {
  try {
    const books = await Book.findAll();
    const message = "La liste des produits a bien été récupérée.";
    res.json({ msg: message, data: books });
  } catch (error) {
    const message =
      "La liste des ouvrages n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ msg: message, data: error });
  }
});

//GET pour acceder aux livres par l'id
booksRouter.get("/:id", auth, async (req, res) => {
  const bookId = req.params.id;
  const book = await Book.findByPk(bookId);
  try {
    if (book === null) {
      const message =
        "L'écrivain demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ msg: message });
    }
    const message = `Le livre dont l'id est ${bookId} a été bien récuperé`;
    res.json({ msg: message, data: book });
  } catch (error) {
    const message =
      "La liste des ouvrages n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ msg: message, data: error });
  }
});

//Reste à créer la vérification de la catégorie, de l'utilisateur et de l'écrivant
//POST ajouter un livre
booksRouter.post("/", auth, async (req, res) => {
  const { userId, writerId, categoryId } = req.body;
  try {
    const userExists = await User.findByPk(userId);
    if (!userExists) {
      const message = "L'utilisateur n'existe pas.";
      return res.status(404).json({ msg: message });
    }

    // Verificar que el escritor existe
    const writerExists = await Writer.findByPk(writerId);
    if (!writerExists) {
      const message = "L'écrivain n'existe pas.";
      return res.status(404).json({ msg: message });
    }

    // Verificar que la categoría existe
    const categoryExists = await Category.findByPk(categoryId);
    if (!categoryExists) {
      const message = "La catégorie n'existe pas.";
      return res.status(404).json({ msg: message });
    }
    const createdBook = await Book.create(req.body);
    const message = `Le livre dont l'id est ${createdBook.id} a été bien créé`;
    res.json({ msg: message, data: createdBook });
  } catch (error) {
    const message =
      "La liste des ouvrages n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ msg: message, data: error });
  }
});

/////PUT modifier un livre
booksRouter.put("/:id", auth, async (req, res) => {
  const data = {
    ...req.body,
    userId: res.locals.userId,
  };
  await Book.update(data, {
    where: { id: req.params.id },
  });
  try {
    const updatedBook = await Book.findByPk(req.params.id);
    if (updatedBook == null) {
      const message =
        "L'ouvrage demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ msg: message });
    }
    const message = `L'ouvrage ${updatedBook.title} dont l'id vaut ${updatedBook.id} a été mis à jour avec succès`;
    res.json({ msg: message, data: updatedBook });
  } catch (error) {
    const message =
      "Le produit n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
    res.status(500).json({ msg: message, data: error });
  }
});

//DELETE supprimer un livre par id
booksRouter.delete("/:id", auth, async (req, res) => {
  try {
    const deletedBook = await Book.findByPk(req.params.id);
    if (deletedBook == null) {
      const message =
        "Le livre demandé n'existe pas. Merci de réesayer avec un autre identifiant.";
      return res.status(404).json({ msg: message });
    }
    Book.destroy({
      where: { id: deletedBook.id },
    });
    const message = `L'ouvrage ${deletedBook.title} a bien été supprimé`;
    return res.json({ msg: message, data: deletedBook });
  } catch (error) {
    const message =
      "Le produit  n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
    res.status(500), json({ msg: message, data: error });
  }
});

export { booksRouter };
