const contacts = require('./contacts');
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts()
        .then(data => console.log('Lista kontaktów:', data))
        .catch(err => console.error(err.message));
      break;

    case "get":
      contacts.getContactById(id)
        .then(contact => {
          if (contact) {
            console.log('Kontakt o podanym ID:', contact);
          } else {
            console.log('Kontakt nie znaleziony.');
          }
        })
        .catch(err => console.error(err.message));
      break;

    case "add":
      contacts.addContact(name, email, phone)
        .then(() => contacts.listContacts())
        .then(updatedContacts => console.log('Zaktualizowana lista kontaktów:', updatedContacts))
        .catch(err => console.error(err.message));
      break;

    case "remove":
      contacts.removeContact(id)
        .then(() => contacts.listContacts())
        .then(updatedContacts => console.log('Lista po usunięciu kontaktu:', updatedContacts))
        .catch(err => console.error(err.message));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
