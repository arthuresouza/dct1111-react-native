class ContactView {
    static displayContacts() {
        const contacts = ContactModel.getContacts();
        const list = document.getElementById("contactList");
        list.innerHTML = "";
        
        contacts.forEach(contact => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${contact.name}</strong> - ${contact.phone} - ${contact.email}
                <button class="delete-btn" data-id="${contact.id}">❌</button>
            `;
            list.appendChild(li);
        });
    }
}