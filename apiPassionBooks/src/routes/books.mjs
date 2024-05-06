import express from "express";
import { Book } from "../db/sequelize.mjs";
import { success } from "./helper.mjs";
import { auth } from "../auth/auth.mjs";

const booksRouter = express();

//GET pour acceder a tous les libres
booksRouter.get("/", auth, (req, res) => {
  Book.findAll()
    .then((books) => {
      const message = "La liste des produits a bien été récupérée.";
      res.json(success(message, books));
    })
    .catch((error) => {
      const message =
        "La liste des ouvrages n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

//GET pour acceder aux livres par l'id
booksRouter.get("/:id", auth, (req, res) => {
  const bookId = req.params.id;
  const book = Book.findByPk(bookId)
    .then((book) => {
      if (book === null) {
        const message =
          "L'écrivain demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      const message = `Le livre dont l'id est ${bookId} a été bien récuperé`;
      res.json(success(message, book));
    })
    .catch((error) => {
      const message =
        "La liste des ouvrages n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

//POST ajouter un livre
booksRouter.post("/", auth, (req, res) => {
  Book.create(req.body)
    .then((createdBook) => {
      const message = `Le livre dont l'id est ${createdBook.id} a été bien créé`;
      res.json(success(message, createdBook));
    })
    .catch((error) => {
      const message =
        "La liste des ouvrages n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

/////PUT modifier un livre
booksRouter.put("/:id", auth, (req, res) => {
  const bookId = req.params.id;
  Book.update(req.body, { where: { id: bookId } })
    .then((_) => {
      return Book.findByPk(bookId).then((updatedBook) => {
        if (updatedBook == null) {
          const message =
            "L'ouvrage demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
          return res.status(404).json({ message });
        }
        const message = `L'ouvrage ${updatedBook.title} dont l'id vaut ${updatedBook.id} a été mis à jour avec succès`;
        res.json(success(message, updatedBook));
      });
    })
    .catch((error) => {
      const message =
        "Le produit n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

//DELETE supprimer un livre par id
booksRouter.delete("/:id", auth, (req, res) => {
  Book.findByPk(req.params.id)
    .then((deletedBook) => {
      if (deletedBook == null) {
        const message =
          "Le livre demandé n'existe pas. Merci de réesayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      return Book.destroy({
        where: { id: deletedBook.id },
      }).then((_) => {
        const message = `L'ouvrage ${deletedBook.title} a bien été supprimé`;
        return res.json(success(message, deletedBook));
      });
    })
    .catch((error) => {
      const message =
        "Le produit  n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
      res.status(500), json({ message, data: error });
    });
});

export { booksRouter };
