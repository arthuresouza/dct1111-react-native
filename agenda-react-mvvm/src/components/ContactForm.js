import { useState } from "react";

const ContactForm = ({ addContact }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name && phone && email) {
            addContact(name, phone, email);
            setName("");
            setPhone("");
            setEmail("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">Adicionar</button>
        </form>
    );
};

export default ContactForm;
