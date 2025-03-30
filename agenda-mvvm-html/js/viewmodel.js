class ContactViewModel {
    constructor() {
        this.contacts = ContactModel.getContacts();
        this.onContactsChanged = null;
    }

    addContact(name, phone, email) {
        if (name && phone && email) {
            const newContact = new Contact(name, phone, email);
            this.contacts.push(newContact);
            ContactModel.saveContacts(this.contacts);
            this.notifyChange();
        }
    }

    deleteContact(id) {
        this.contacts = this.contacts.filter(contact => contact.id !== id);
        ContactModel.saveContacts(this.contacts);
        this.notifyChange();
    }

    notifyChange() {
        if (this.onContactsChanged) {
            this.onContactsChanged(this.contacts);
        }
    }
}
