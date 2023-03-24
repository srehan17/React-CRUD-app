import React, {FC, useState, useRef, useEffect} from 'react';
import { IContact, apiAddContact, apiFetchAllContacts, apiUpdateContact } from '../data/contacts';
import { generateUUID } from "../util/guid";
import {Form, Button, FloatingLabel } from 'react-bootstrap';
import { initialState } from '../App';
interface ContactFormProps {
    contacts: IContact[];
    // currentFormContact: IContact | null;
    // setCurrentFormContact: React.Dispatch<React.SetStateAction<IContact | null>>;
    onContactChanged: () => void;
    editingContact: IContact;
    showForm: boolean;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContactForm: FC<ContactFormProps> = ({
        contacts, 
        // currentFormContact, 
        // setCurrentFormContact,
        editingContact,
        onContactChanged,
        showForm,
        setShowForm
    })  => {
    
    const [contact, setContact] = useState<IContact>(initialState);
    
    const formRef = useRef<HTMLFormElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    if (nameRef.current !== null) {
        nameRef.current.value = contact.name
    }
    const ageRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setContact({ ...contact, [e.target.name] : e.target.value});
    }
    
    const onFormSubmit =  (e: React.FormEvent) => {
        e.preventDefault(); 
        const existingByName = contacts.find(x => x.name.toLowerCase() === contact.name.toLowerCase());
        if (existingByName){
            console.log("Name exists");
            return;
        }
        if (contact.id === "") {
            contact.id = generateUUID();
            apiAddContact(contact).then(()=>onContactChanged())
        }
        else if (editingContact) {
            setContact(editingContact);            
            apiUpdateContact(contact).then(()=>onContactChanged());
        }
        setShowForm(false);
            console.log(showForm)
        
        // setContact(initialState);
        if (formRef.current !== null) {
            formRef.current.reset();
            
        }
        // console.log(JSON.stringify(formContact, null, 3));
      }

    return (
        <form onSubmit={onFormSubmit} ref={formRef}>
            <input 
                type="text" 
                name="name" 
                value= {contact.name} 
                onChange={handleChange}
                placeholder="Name" 
                required
                ref={nameRef}
                />
            <input
                type="text" 
                name="email" 
                value={contact.email} 
                onChange={handleChange} 
                placeholder="Email"
                ref={emailRef}
            />
            <input
                type="text" 
                name="phone" 
                value={contact.phone} 
                onChange={handleChange} 
                placeholder="Phone"
                ref={phoneRef}
            />
            <input
                type="number" 
                name="age" 
                value={contact.age} 
                onChange={handleChange}
                placeholder="Age"
                ref={ageRef}
            />
            <Button variant="dark" type="submit">
                Submit
            </Button>
        </form>
        // <Form className='formContainer' id='form' 
        //     onSubmit={onFormSubmitted} 
        //     >
        //     <Form.Group className="mb-3">
        //         <FloatingLabel
        //             controlId="name"
        //             label="Name"
        //             className="mb-3"
        //         >
        //         <Form.Control 
        //             type="text" 
        //             name="name" 
        //             value={editContact.name} 
        //             onChange={handleChange} 
        //             required/>
        //         </FloatingLabel>
        //     </Form.Group>
            // <Form.Group>
            //     <FloatingLabel
            //         controlId="email"
            //         label="Email"
            //         className="mb-3"
            //     >
            //     <Form.Control 
            //         type="text" 
            //         name="email" 
            //         value={editContact.email} 
            //         onChange={handleChange} />
            //     </FloatingLabel>
            // </Form.Group>
            // <Form.Group>
            //     <FloatingLabel
            //         controlId="phone"
            //         label="Phone"
            //         className="mb-3"
            //     >
            //     <Form.Control 
            //         type="text" 
            //         name="phone" 
            //         value={editContact.phone} 
            //         onChange={handleChange} />
            //     </FloatingLabel>
            // </Form.Group>
            // <Form.Group>
            //     <FloatingLabel
            //         controlId="age"
            //         label="Age"
            //         className="mb-3"
            //     >
            //     <Form.Control 
            //         type="number" 
            //         name="age" 
            //         value={editContact.age} 
            //         onChange={handleChange}/>
            //     </FloatingLabel>
            // </Form.Group>
        //     <Button variant="dark" type="submit">
        //         Submit
        //     </Button>
        // </Form> 
    );
}