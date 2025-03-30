import useContactViewModel from './viewmodels/ContactViewModel';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './App.css';

function App() {
  const { contacts, addContact, deleteContact } = useContactViewModel();

    
  return (
    <div className="container">
        <h1>Agenda de Contatos</h1>
        <ContactForm addContact={addContact} />
        <ContactList contacts={contacts} deleteContact={deleteContact} />
    </div>     
  );
}

export default App;
