class ContactController {
    static addContact(event) {
        event.preventDefault();
        
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;

        if (name && phone && email) {
            const newContact = new Contact(name, phone, email);
            ContactModel.addContact(newContact);
            ContactView.displayContacts();
            document.getElementById("contactForm").reset();
        }
    }

    static deleteContact(event) {
        if (event.target.classList.contains("delete-btn")) {
            const id = parseInt(event.target.getAttribute("data-id"));
            ContactModel.deleteContact(id);
            ContactView.displayContacts();
        }
    }
}
