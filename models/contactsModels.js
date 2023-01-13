const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve(
  "/Users/aleksandr/nodejs-homework-rest-api/models/contacts.json"
);

let contacts = [];

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    contacts = JSON.parse(data);
    console.log(contacts);
    // return contacts;
    // return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  contacts,
};
