const ContactList = ({ contacts, deleteContact }) => {
    return (
        <ul>
            {contacts.map((contact) => (
                <li key={contact.id}>
                    <strong>{contact.name}</strong> - {contact.phone} - {contact.email}
                    <button onClick={() => deleteContact(contact.id)}>❌</button>
                </li>
            ))}
        </ul>
    );
};

export default ContactList;
