const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const contactsPath = './db/contacts.json';

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Błąd przy odczycie kontaktów:', err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    return contact || null;
  } catch (err) {
    console.error(`Błąd przy szukaniu kontaktu o ID ${contactId}:`, err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);

    if (contacts.length === updatedContacts.length) {
      console.log(`Nie znaleziono kontaktu o ID ${contactId}`);
      return;
    }

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    console.log(`Kontakt o ID ${contactId} został usunięty.`);
  } catch (err) {
    console.error(`Błąd przy usuwaniu kontaktu o ID ${contactId}:`, err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log('Kontakt został dodany:', newContact);
  } catch (err) {
    console.error('Błąd przy dodawaniu kontaktu:', err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
