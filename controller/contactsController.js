const Contact = require("../models/contacts.js");
const colors = require("colors");

// TODO LIST Contacts:
const listContacts = async () => {
  try {
    console.log("--- List Contacts: --- ".bgYellow.italic.bold);
    return await Contact.find();
  } catch (error) {
    console.error(error);
    throw new Error(`Error listing contacts: ${error.message}`);
  }
};

// TODO GET Contact by id:
const getContactById = async (contactId) => {
  try {
    console.log(
      `--- List Contact with id ${contactId}: --- `.bgYellow.italic.bold
    );
    return await Contact.findById(contactId);
  } catch (error) {
    console.error(error);
    throw new Error(`Error getting contact by id: ${error.message}`);
  }
};

// TODO DELETE Contact:
const removeContact = async (contactId) => {
  try {
    console.log(
      `--- Delete Contact with id ${contactId}: --- `.bgYellow.italic.bold
    );
    return await Contact.findByIdAndDelete(contactId);
  } catch (error) {
    console.error(error);
    throw new Error(`Error removing contact: ${error.message}`);
  }
};

// TODO CREATE Contact:
const addContact = async (contact) => {
  console.log(`---  New Contact Created: --- `.bgYellow.italic.bold);
  try {
    return await Contact.create(contact);
  } catch (error) {
    console.error(error);
    throw new Error(`Error adding contact: ${error.message}`);
  }
};

// TODO UPDATE Contact By Id:
const updateContact = async (updatedContact, contactId) => {
  console.log(
    `--- Update Contact with id ${contactId}: --- `.bgYellow.italic.bold
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
    console.error(error);
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
