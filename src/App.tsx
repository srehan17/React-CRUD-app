import {FC, useState, useEffect} from 'react';
import './App.css';
import { ContactForm } from './components/ContactForm';
import { IContact, apiFetchAllContacts, apiAddContact, apiDeleteContact, apiUpdateContact } from './data/contacts';
import Button from 'react-bootstrap/Button';
import { ContactsList } from './components/ContactsList';
import { getContacts } from './data/contacts/storage';

export const initialState = {
  id:"", name:"", phone: "", email: "", age: 0
}

const App: FC = () => {

  const [contacts, setContacts] = useState<IContact[]>(getContacts);

  // const [currentFormContact, setCurrentFormContact] = useState<IContact>(initialState);
  // const [currentFormContact, setCurrentFormContact] = useState<IContact | null>(null);
  const [editingContact, setEditingContact] = useState<IContact>(initialState);

  const [showForm, setShowForm] = useState(false);

  const reloadContacts = () => {
    apiFetchAllContacts()
        .then((res) => {
          const sortedContacts = res.sort((a, b) => a.name.localeCompare(b.name));
          setContacts(sortedContacts);
      });
  }

  useEffect(() => {
    reloadContacts(); 
  }, []);


  const onContactChanged = () => {
    reloadContacts();
  }

  const handleAddContact = () => {
    setShowForm(true);
  }


  useEffect(() => {
    console.log("Contacts", contacts);
  }, []);


  const onEditContact = (contact: IContact) => {
    editingContact.id = contact.id;
    editingContact.name = contact.name;
    editingContact.phone = contact.phone;
    editingContact.email = contact.email;
    editingContact.age = contact.age;
    apiUpdateContact(editingContact).then(()=> reloadContacts())
    setShowForm(true);
  };

  const onDeleteContact = (id: string) => {
    console.log('Delete Clicked', id)
    apiDeleteContact(id).then(()=> reloadContacts())
  };

  return (
    <div className="container">
      {
        !showForm 
        && 
        <Button 
          variant="primary" 
          onClick={handleAddContact}
          className="mb-3"
        >
          Add Contact
        </Button>
      }
      {
        showForm 
        &&
        <ContactForm 
          onContactChanged={onContactChanged}
          // currentFormContact={currentFormContact}  
          // setCurrentFormContact={setCurrentFormContact}     
          editingContact={editingContact}
          contacts={contacts}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      }
      {
        !showForm 
        &&
        <ContactsList 
          contacts={contacts} 
          onEditContact={onEditContact} 
          onDeleteContact={onDeleteContact}
        />
      }
  </div>
  );
}

export default App;
