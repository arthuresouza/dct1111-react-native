class Contact {
    constructor(name, phone, email) {
        this.id = Date.now();
        this.name = name;
        this.phone = phone;
        this.email = email;
    }
}

class ContactModel {
    static getContacts() {
        return JSON.parse(localStorage.getItem("contacts")) || [];
    }

    static saveContacts(contacts) {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }

    static addContact(contact) {
        const contacts = ContactModel.getContacts();
        contacts.push(contact);
        ContactModel.saveContacts(contacts);
    }

    static deleteContact(id) {
        let contacts = ContactModel.getContacts();
        contacts = contacts.filter(contact => contact.id !== id);
        ContactModel.saveContacts(contacts);
    }
}
