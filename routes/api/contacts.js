// TODO aici gestionam operațiile CRUD (create, read, update, delete):

const express = require("express");

// TODO importam funcțiile de manipulare a datelor:
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controller/contactsController.js");

const router = express.Router();

const STATUS_CODES = {
  success: 200,
  created: 201,
  deleted: 204,
  notFound: 404,
  badRequest: 400,
  error: 500,
};

// TODO Functia Respod With Error:
const respondWithError = (res, error) => {
  console.error(error);
  res.status(STATUS_CODES.error).json({ message: `${error}` });
};

// TODO GET (LIST):
/* GET localhost:3000/api/products */
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
/* GET localhost:3000/api/products/:id */
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
/* POST localhost:3000/api/products/ */
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
/* DELETE localhost:3000/api/products/:id */
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
/* PUT localhost:3000/api/products/:id */
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

module.exports = router;
