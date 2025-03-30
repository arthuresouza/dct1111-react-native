class Contact {
    constructor(name, phone, email) {
        this.id = Date.now();
        this.name = name;
        this.phone = phone;
        this.email = email;
    }
}

export default Contact;
