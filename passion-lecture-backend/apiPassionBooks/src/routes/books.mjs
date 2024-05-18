import express from "express";
import {
  Book,
  User,
  Category,
  Writer,
  Rate,
  Comment,
} from "../db/sequelize.mjs";
import { authBooks } from "../auth/authBooks.mjs";
import { authVer } from "../auth/authVer.mjs";
const booksRouter = express();

//GET pour acceder a tous les libres
booksRouter.get("/", authVer, async (req, res) => {
  try {
    const books = await Book.findAll(); //{ order: ["title"] }
    const message = "La liste des livres a bien été récupérée.";
    res.json({ msg: message, data: books });
  } catch (error) {
    const message =
      "La liste des livres n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ msg: message, data: error });
  }
});

//GET pour acceder aux livres par l'id
booksRouter.get("/:id", authVer, async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await Book.findByPk(bookId);
    if (book === null) {
      const message =
        "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ msg: message });
    }
    const message = `Le livre dont l'id est ${bookId} a été bien récuperé`;
    res.json({ msg: message, data: book });
  } catch (error) {
    const message =
      "La liste des livres n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ msg: message, data: error });
  }
});

//GET trouve les appréciations qui appartient à un livre
booksRouter.get("/:id/rates", authVer, async (req, res) => {
  const bookId = req.params.id;
  try {
    const rates = await Rate.findAll({ where: { bookId: bookId } });
    if (!rates) {
      const message = `Aucune appréciation trouvée pour le livre avec l'ID ${bookId}.`;
      return res.status(404).json({ msg: message });
    }
    const message = `La liste des appréciations pour le livre dont l'id vaut ${bookId} a bien été récupérée.`;
    res.json({ msg: message, data: rates });
  } catch (error) {
    const message =
      "Erreur lors de la récupération des appréciations. Merci de réessayer dans quelques instants.";
    res.status(500).json({ msg: message, data: error });
  }
});

//GET trouve les commentaires qui appartient à un livre
booksRouter.get("/:id/comments", authVer, async (req, res) => {
  const bookId = req.params.id;
  try {
    const comments = await Comment.findAll({ where: { bookId: bookId } });
    if (!comments) {
      const message = `Aucune appréciation trouvée pour le livre avec l'ID ${bookId}.`;
      return res.status(404).json({ msg: message });
    }
    const message = `La liste des appréciations pour le livre dont l'id vaut ${bookId} a bien été récupérée.`;
    res.json({ msg: message, data: comments });
  } catch (error) {
    const message =
      "Erreur lors de la récupération des appréciations. Merci de réessayer dans quelques instants.";
    res.status(500).json({ msg: message, data: error });
  }
});

//POST ajouter un livre
booksRouter.post("/", authBooks, async (req, res) => {
  const { userId, writerId, categoryId } = req.body;
  try {
    const userExists = await User.findByPk(userId);
    if (!userExists) {
      const message =
        "L'utilisateur n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ msg: message });
    }
    const writerExists = await Writer.findByPk(writerId);
    if (!writerExists) {
      const message =
        "L'écrivain n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ msg: message });
    }
    const categoryExists = await Category.findByPk(categoryId);
    if (!categoryExists) {
      const message =
        "La catégorie n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ msg: message });
    }
    const createdBook = await Book.create(req.body);
    const message = `Le livre dont l'id est ${createdBook.id} a été bien créé`;
    res.json({ msg: message, data: createdBook });
  } catch (error) {
    const message =
      "La liste des livres n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ msg: message, data: error });
  }
});

//PUT modifier un livre
booksRouter.put("/:id", authBooks, async (req, res) => {
  const bookId = req.params.id;
  const data = { ...req.body };
  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      const message =
        "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ msg: message });
    }
    const updatedBook = await Book.update(data, { where: { id: bookId } });
    const message = `Le livre ${updatedBook.title} dont l'id vaut ${updatedBook.id} a été mis à jour avec succès`;
    res.json({ msg: message, data: updatedBook });
  } catch (error) {
    const message =
      "Le livre n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
    res.status(500).json({ msg: message, data: error });
  }
});

//DELETE supprimer un livre par id
booksRouter.delete("/:id", authBooks, async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId);
    if (!book) {
      const message =
        "Le livre demandé n'existe pas. Merci de réesayer avec un autre identifiant.";
      return res.status(404).json({ msg: message });
    }
    const deletedBook = Book.destroy({ where: { id: bookId } });
    const message = `Le livre ${deletedBook.title} a bien été supprimé`;
    return res.json({ msg: message, data: deletedBook });
  } catch (error) {
    const message =
      "Le livre n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
    res.status(500), json({ msg: message, data: error });
  }
});

export { booksRouter };
