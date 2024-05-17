import express from "express";
import { Book, Writer } from "../db/sequelize.mjs";
import { success } from "./helper.mjs";
import { authAdmin } from "../auth/authAdmin.mjs";
import { authVer } from "../auth/authVer.mjs";

const writersRouter = express();

//GET pour acceder a tous les categories
writersRouter.get("/", authVer, async (req, res) => {
  try {
    const writers = await Writer.findAll();
    const message = "La liste des écrivains a bien été récupérée.";
    res.json({ mg: message, data: writers });
  } catch (error) {
    const message =
      "La liste des écrivains n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ msg: message, data: error });
  }
});

//GET acceder à une categorie par id
writersRouter.get("/:id", authVer, async (req, res) => {
  const writerId = req.params.id;
  const writer = await Writer.findByPk(writerId);
  try {
    if (writer === null) {
      const message =
        "L'écrivain demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ message });
    }
    const message = `La categorie dont l'id est ${writerId} a été bien récuperé`;
    res.json({ msg: message, data: writer });
  } catch (error) {
    const message =
      "La liste des categories n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ msg: message, data: error });
  }
});

//GET trouve les livres qui appartient à une categorie
writersRouter.get("/:id/books", authVer, async (req, res) => {
  const writerId = req.params.id;
  const writer = await Book.findByPk(writerId);
  try {
    if (writer === null) {
      const message =
        "L'écrivain demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ message });
    }

    Book.findAll({ where: { writerId: writerId } })
      .then((books) => {
        const message = `La liste des livres de l'écrivain dont l'id vaut ${writerId} a bien été récupérée.`;
        res.json({
          message: message,
          data: { count: books.length, rows: books },
        });
      })
      .catch((error) => {
        const message =
          "Les livres de l'écrivain n'ont pas pu être récupérés. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  } catch (error) {
    const message =
      "L'écrivain n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  }
});

writersRouter.post("/", authAdmin, async (req, res) => {
  try {
    const newWriter = await Writer.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    res.status(201).json(newWriter);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'écrivain." });
  }
});

writersRouter.put("/:id", authAdmin, async (req, res) => {
  try {
    const writer = await Writer.findByPk(req.params.id);
    if (!writer) {
      return res.status(404).json({ message: "Écrivain non trouvé." });
    }
    writer.firstName = req.body.firstName;
    writer.lastName = req.body.lastName;
    await writer.save();
    res.status(200).json(writer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la modification de l'écrivain." });
  }
});

export { writersRouter };
