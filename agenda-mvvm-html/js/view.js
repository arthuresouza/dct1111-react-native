class ContactView {
    constructor(viewModel) {
        this.viewModel = viewModel;
        this.form = document.getElementById("contactForm");
        this.list = document.getElementById("contactList");

        this.form.addEventListener("submit", (event) => this.handleFormSubmit(event));
        this.list.addEventListener("click", (event) => this.handleDelete(event));

        this.viewModel.onContactsChanged = (contacts) => this.render(contacts);
        this.render(this.viewModel.contacts);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;

        this.viewModel.addContact(name, phone, email);
        this.form.reset();
    }

    handleDelete(event) {
        if (event.target.classList.contains("delete-btn")) {
            const id = parseInt(event.target.getAttribute("data-id"));
            this.viewModel.deleteContact(id);
        }
    }

    render(contacts) {
        this.list.innerHTML = "";
        contacts.forEach(contact => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${contact.name}</strong> - ${contact.phone} - ${contact.email}
                <button class="delete-btn" data-id="${contact.id}">❌</button>
            `;
            this.list.appendChild(li);
        });
    }
}
