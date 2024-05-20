const Contact = require("../models/contacts.js");
const colors = require("colors");

// TODO LIST Contacts:
const listContacts = async () => {
  try {
    console.log(colors.bgYellow.italic.bold("--- List Contacts: ---"));
    return await Contact.find();
  } catch (error) {
    console.error(colors.bgRed.italic.bold(error));
    throw new Error(`Error listing contacts: ${error.message}`);
  }
};

// TODO GET Contact by id:
const getContactById = async (contactId) => {
  try {
    console.log(
      colors.bgYellow.italic.bold(`--- List Contact with id ${contactId}: ---`)
    );
    return await Contact.findById(contactId);
  } catch (error) {
    console.error(colors.bgRed.italic.bold(error));
    throw new Error(`Error getting contact by id: ${error.message}`);
  }
};

// TODO DELETE Contact:
const removeContact = async (contactId) => {
  try {
    console.log(
      colors.bgYellow.italic.bold(
        `--- Delete Contact with id ${contactId}: ---`
      )
    );
    return await Contact.findByIdAndDelete(contactId);
  } catch (error) {
    console.error(colors.bgRed.italic.bold(error));
    throw new Error(`Error removing contact: ${error.message}`);
  }
};

// TODO CREATE Contact:
const addContact = async (contact) => {
  console.log(colors.bgYellow.italic.bold(`---  New Contact Created: ---`));
  try {
    return await Contact.create(contact);
  } catch (error) {
    console.error(colors.bgRed.italic.bold(error));
    throw new Error(`Error adding contact: ${error.message}`);
  }
};

// TODO UPDATE Contact By Id:
const updateContact = async (updatedContact, contactId) => {
  console.log(
    colors.bgYellow.italic.bold(`--- Update Contact with id ${contactId}: ---`)
  );
  try {
    const updatedDoc = await Contact.findByIdAndUpdate(
      contactId,
      updatedContact,
      { new: true }
    );
    if (!updatedDoc) {
      throw new Error("The contact was not found.");
    }
    return updatedDoc;
  } catch (error) {
    console.error(colors.bgRed.italic.bold(error));
    throw new Error(`Error updating contact: ${error.message}`);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
