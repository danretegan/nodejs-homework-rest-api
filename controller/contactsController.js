const Contact = require("../models/contacts.js");

// TODO LIST Contacts:
const listContacts = async () => {
  console.log("--- List Contacts: --- ");
  try {
    return Contact.find();
  } catch (error) {
    console.error(error);
  }
};

// TODO GET Contact by id:
const getContactById = async (contactId) => {
  console.log(`--- List Contact by id #{id}: --- `);
  try {
    return Contact.findById(contactId);
  } catch (error) {
    console.error(error);
  }
};

// TODO DELETE Contact:
const removeContact = async (contactId) => {
  console.log(`--- List Contact by id #{id}: --- `);
  return Contact.findByIdAndDelete(contactId);
};

// TODO CREATE Contact:
const addContact = async (contact) => {
  return Contact.create(contact);
};

// TODO UPDATE Contact By Id:
const updateContact = async (updatedContact, contactId) => {
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
