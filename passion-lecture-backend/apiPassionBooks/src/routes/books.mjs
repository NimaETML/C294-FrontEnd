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
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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
    if (rates.length === 0) {
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
    if (comments.length === 0) {
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
booksRouter.post(
  "/",
  authVer,
  upload.single("book_cover"),
  async (req, res) => {
    const {
      title,
      number_of_pages,
      excerpt,
      summary,
      publisher,
      year_of_publication,
      userId,
      writerId,
      categoryId,
    } = req.body;

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

      const bookData = {
        title,
        number_of_pages,
        excerpt,
        summary,
        publisher,
        year_of_publication,
        book_cover: req.file
          ? `http://localhost:3901/images/${req.file.filename}`
          : null,
        userId,
        writerId,
        categoryId,
      };

      const createdBook = await Book.create(bookData);
      const message = `Le livre dont l'id est ${createdBook.id} a été bien créé`;
      res.json({
        msg: message,
        data: createdBook,
      });
    } catch (error) {
      const message =
        "Le livre n'a pas pu être créé. Merci de réessayer dans quelques instants.";
      res.status(500).json({
        msg: message,
        data: error.message,
      });
    }
  }
);

//PUT modifier un livre
booksRouter.put(
  "/:id",
  authBooks,
  upload.single("book_cover"),
  async (req, res) => {
    const bookId = req.params.id;
    const {
      title,
      number_of_pages,
      excerpt,
      summary,
      publisher,
      year_of_publication,
      userId,
      writerId,
      categoryId,
    } = req.body;
    try {
      const book = await Book.findByPk(bookId);
      if (!book) {
        return res.status(404).json({
          msg: "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.",
        });
      }
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

      const updateData = {
        title,
        number_of_pages,
        excerpt,
        summary,
        publisher,
        year_of_publication,
        userId,
        writerId,
        categoryId,
      };

      if (req.file) {
        book.book_cover = `http://localhost:3901/images/${req.file.filename}`;
      }

      const [updatedRows] = await Book.update(updateData, {
        where: { id: bookId },
      });

      if (updatedRows === 0) {
        const message = "Aucune modification n'a été apportée au livre.";
        return res.status(404).json({ msg: message });
      }
      const updatedBook = await Book.findByPk(bookId);
      const message = `Le livre ${updatedBook.title} dont l'id vaut ${updatedBook.id} a été mis à jour avec succès`;

      res.json({ msg: message, data: updatedBook });
    } catch (error) {
      const message =
        "Le livre n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
      res.status(500).json({ msg: message, data: error });
    }
  }
);

//DELETE supprimer un livre par id
booksRouter.delete("/:id", authBooks, async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId);
    if (!book) {
      const message =
        "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ msg: message });
    }
    const deleteBook = await Book.destroy({ where: { id: bookId } });
    if (deleteBook === 0) {
      const message = "Aucun livre n'a été supprimé.";
      return res.status(404).json({ msg: message });
    }

    const message = `Le livre ${book.title} a bien été supprimé`;
    return res.json({ msg: message, data: { id: bookId } });
  } catch (error) {
    const message =
      "Le livre n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
    res.status(500).json({ msg: message, data: error });
  }
});

export { booksRouter };
