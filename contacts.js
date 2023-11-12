import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";


const contactsPath = path.resolve("db", "contacts.json");

const writeContacts = async (contacts) => {
    return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

export const listContacts = async () => {
    const result = await fs.readFile(contactsPath);
    return JSON.parse(result);
}

export const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId);
    return result || null;
}

export const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await writeContacts(contacts);
    return newContact;
}

export const deleteById = async (contactId) => {
    const contacts = await listContacts();
    const i = contacts.findIndex(contact => contact.id === contactId);
    if (i === -1) {
        return null;
    }
    const [result] = contacts.splice(i, 1);
    await writeContacts(contacts);
    return result;
}
