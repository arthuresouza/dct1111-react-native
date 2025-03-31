import { useState, useEffect } from "react";
import Contact from "../models/Contact";

const useContactViewModel = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
        setContacts(storedContacts);
    }, []);

    const addContact = (name, phone, email) => {
        const newContact = new Contact(name, phone, email);
        const updatedContacts = [...contacts, newContact];
        setContacts(updatedContacts);
        localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    };

    const deleteContact = (id) => {
        const tmpContacts = contacts.filter(contact => contact.id !== id);
        setContacts(tmpContacts);
        localStorage.setItem("contacts", JSON.stringify(tmpContacts));
    };

    return { contacts, addContact, deleteContact };
};

export default useContactViewModel;
