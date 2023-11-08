import * as contactServise from "./index.js";
import yargs from "yargs";
import { listContacts, getContactById, addContact, deleteById } from "./contacts.js"


const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const allContacts = await contactServise.listContacts();
            return console.table(allContacts);
        case 'get':
            const oneContact = await contactServise.getContactById(id);
            return console.table(oneContact);
        case 'add':
            const newContact = await contactServise.addContact({ name, email, phone });
            return console.log(newContact);
        case 'deleteById':
            const deleteContact = await contactServise.deleteById(id);
            return console.table(deleteContact);
        default:
            return console.warn('\x1B[31m Unknown action type!');

    }
}

const { arvg } = yargs(process.argv.slice(2));

invokeAction(arvg);
