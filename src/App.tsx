import {FC, useState, useEffect} from 'react';
import './App.css';
import { ContactForm } from './components/ContactForm';
import { IContact, apiFetchAllContacts, apiAddContact, apiDeleteContact, apiUpdateContact } from './data/contacts';
import {Button} from 'react-bootstrap';
import { ContactsList } from './components/ContactsList';
import { getContacts } from './data/contacts/storage';

export const initialState = {
  id:"", name:"", phone: "", email: "", age: 0
}

const App: FC = () => {

  const [contacts, setContacts] = useState<IContact[]>(getContacts);
  const [editingContact, setEditingContact] = useState<IContact>(initialState);
  const [showForm, setShowForm] = useState(false);
  const [titleContactForm, setTitleContactForm] = useState("");
  const [submitButtonName, setSubmitButtonName] = useState("");

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
    setTitleContactForm("Add Contact");
    editingContact.id = ""
    editingContact.name = ""
    editingContact.phone = ""
    editingContact.email = ""
    editingContact.age = undefined
    // setEditingContact(initialState)
    setShowForm(true);
  }

  useEffect(() => {
    console.log("Contacts", contacts);
  }, []);


  const onEditContact = (contact: IContact) => {
    setTitleContactForm("Edit Contact");
    setSubmitButtonName("Update");
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
    <>
      <h1 className="heading text-light bg-secondary bg-gradient text-white">Contact Manager</h1>

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
          titleContactForm={titleContactForm}
          onContactChanged={onContactChanged}    
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
  </>
  );
}

export default App;
