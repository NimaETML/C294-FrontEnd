import express from "express";
import { Book, User } from "../db/sequelize.mjs";
import { success } from "./helper.mjs";
import { auth } from "../auth/auth.mjs";

const usersRouter = express();

//GET pour acceder a tous les users
usersRouter.get("/", async (req, res) => {
  const users = await User.findAll();
  try {
    const message = "La liste des utilisateurs a bien été récupérée.";
    res.json(success(message, users));
  } catch (error) {
    const message =
      "La liste des utilisateurs n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  }
});

//GET pour acceder a un utilisateur en particulier depuis son id
usersRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByPk(userId);
  try {
    if (user === null) {
      const message =
        "L'utilisateur demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ message });
    }
    const message = `L'utilisateur dont l'id est ${userId} a été bien récuperé`;
    res.json(success(message, user));
  } catch (error) {
    // Message d'erreur
    const message =
      "L'utilisateur n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  }
});

//GET pour acceder aux livres ajoute par un utilisateur depuis l'Id de l'utilisateur
usersRouter.get("/:id/books", async (req, res) => {
  const userId = req.params.id;
  const user = await Book.findByPk(userId);
  try {
    if (user === null) {
      const message =
        "L'utilisateur demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ message });
    }
    Book.findAll({ where: { userId: userId } })
      .then((books) => {
        const message = `Les livres de l'utilisateur ${userId} ont bien été récupérés.`;
        res.json(success(message, books));
      })
      // Message d'erreur
      .catch((error) => {
        const message =
          "Les livres de l'utilisateur n'ont pas pu être récupérée. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  } catch (error) {
    const message =
      "L'écrivain n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  }
});

export { usersRouter };
