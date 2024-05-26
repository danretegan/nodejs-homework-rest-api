// TODO aici gestionăm operațiile CRUD (create, read, update, delete) și returnam un răspuns către client. Aici gestionăm interacțiunea cu utilizatorul final:

const express = require("express");
const colors = require("colors");

const { STATUS_CODES } = require("../../utils/constants.js");

// TODO importam funcțiile de manipulare a datelor:
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controller/contactsController.js");

const router = express.Router();

// TODO Functia Respod With Error:
const respondWithError = (res, error) => {
  console.error(colors.bgRed.italic.bold(error));
  res.status(STATUS_CODES.error).json({ message: `${error}` });
};

// TODO GET (LIST):
/* GET localhost:3000/api/contacts */
router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res
      .status(STATUS_CODES.success)
      .json({ message: "The list was successfully returned", data: contacts });
  } catch (error) {
    respondWithError(res, error);
  }
});

// TODO GET id (GET Contact By Id):
/* GET localhost:3000/api/contacts/:id */
router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    console.log(req.params.contactId);

    if (!contact) {
      throw new Error("The contact was not found");
    }

    res.status(STATUS_CODES.success).json({
      message: "The contact has been returned successfully",
      data: contact,
    });
  } catch (error) {
    respondWithError(res, error);
  }
});

// TODO POST (add /create):
/* POST localhost:3000/api/contacts/ */
router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  try {
    const newContact = await addContact({ name, email, phone });
    res.status(STATUS_CODES.created).json(newContact);
  } catch (error) {
    respondWithError(res, error);
  }
});

// TODO DELETE:
/* DELETE localhost:3000/api/contacts/:id */
router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const removedContact = await removeContact(contactId);

    if (!removedContact) {
      res
        .status(STATUS_CODES.notFound)
        .json({ message: "The contact was not found" });
      return;
    }

    res
      .status(STATUS_CODES.deleted)
      .json({ message: "Contact deleted successfully" });
  } catch (error) {
    respondWithError(res, error);
  }
});

// TODO PUT (Update By Id):
/* PUT localhost:3000/api/contacts/:id */
router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;

  try {
    const updatedContact = await updateContact(req.body, contactId);

    if (!updatedContact) {
      res
        .status(STATUS_CODES.notFound)
        .json({ message: "The contact was not found" });
      return;
    }

    res.status(STATUS_CODES.success).json(updatedContact);
  } catch (error) {
    respondWithError(res, error);
  }
});

// TODO @ PATCH /api/contacts/:contactId/favorite
router.patch("/:contactId/favorite", async (req, res) => {
  const contactId = req.params.contactId;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res
      .status(STATUS_CODES.badRequest)
      .json({ message: "missing field favorite" });
  }

  try {
    const updatedContact = await updateStatusContact(contactId, { favorite });
    if (!updatedContact) {
      return res.status(STATUS_CODES.notFound).json({ message: "Not found" });
    }
    res.status(STATUS_CODES.success).json(updatedContact);
  } catch (error) {
    respondWithError(res, error);
  }
});

module.exports = router;
