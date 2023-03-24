import React, {FC, useState, useRef, useEffect} from 'react';
import { IContact, apiAddContact, apiFetchAllContacts, apiUpdateContact } from '../data/contacts';
import { generateUUID } from "../util/guid";
import {Form, Button, FloatingLabel } from 'react-bootstrap';
import { initialState } from '../App';

interface ContactFormProps {
    titleContactForm: string;
    contacts: IContact[];
    onContactChanged: () => void;
    editingContact: IContact;
    showForm: boolean;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContactForm: FC<ContactFormProps> = ({
        titleContactForm,
        contacts, 
        editingContact,
        onContactChanged,
        showForm,
        setShowForm
    })  => {
    
    const [contact, setContact] = useState<IContact>(initialState);
    const [showNameExistsError, setShowNameExistsError] = useState(false);

    const nameExistsMessage = "This name exists, please enter a different name.";

    const formRef = useRef<HTMLFormElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const ageRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setContact({ ...contact, [e.target.name] : e.target.value});
    }
    
    const onFormSubmit =  (e: React.FormEvent) => {
        e.preventDefault(); 
        
        if (contact.id === "") {
            const existingByName = contacts.find(x => x.name.toLowerCase() === contact.name.toLowerCase());
            if (existingByName){
                console.log("Name exists");
                setShowNameExistsError(true);
                return
            }
            contact.id = generateUUID();
            apiAddContact(contact).then(()=>onContactChanged())
        }
        else if (editingContact) {
            setContact(editingContact);            
            apiUpdateContact(contact).then(()=>onContactChanged());
        }
        setShowForm(false);
        
        setContact(initialState);
        
        if (formRef.current !== null) {
            formRef.current.reset();
        }
        if (nameRef.current !== null) {
            nameRef.current.value = ""
        }
        if (emailRef.current !== null) {
            emailRef.current.value = ""
        }
        if (ageRef.current !== null) {
            ageRef.current.value = ""
        }
        if (phoneRef.current !== null) {
            phoneRef.current.value = ""
        }

        // console.log(JSON.stringify(formContact, null, 3));
      }

    return (
        <>
        <h1 className='mb-3' >{titleContactForm}</h1>
        {/* <form onSubmit={onFormSubmit} ref={formRef}>
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
        </form> */}
         <Form className='formContainer' id='form' 
            onSubmit={onFormSubmit} ref={formRef}>
            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="name"
                    label="Name"
                    className="mb-3"
                >
                <Form.Control 
                    type="text" 
                    name="name" 
                    value= {contact.name} 
                    ref={nameRef}
                    onChange={handleChange} 
                    required/>
                </FloatingLabel>
                {
                    showNameExistsError ? 
                    <Form.Text style={{color:'#3B71CA', fontWeight: 'bold', fontSize: '16px'}}>
                        {nameExistsMessage}
                    </Form.Text>
                    : null
                }
            </Form.Group>
            <Form.Group>
                <FloatingLabel
                    controlId="email"
                    label="Email"
                    className="mb-3"
                >
                <Form.Control 
                    type="text" 
                    name="email" 
                    value= {contact.email}   
                    ref={emailRef}                  
                    onChange={handleChange} />
                </FloatingLabel>
            </Form.Group>
            <Form.Group>
                <FloatingLabel
                    controlId="phone"
                    label="Phone"
                    className="mb-3"
                >
                <Form.Control 
                    type="text" 
                    name="phone" 
                    value= {contact.phone} 
                    ref={phoneRef}
                    onChange={handleChange} />
                </FloatingLabel>
            </Form.Group>
            <Form.Group>
                <FloatingLabel
                    controlId="age"
                    label="Age"
                    className="mb-3"
                >
                <Form.Control 
                    type="number" 
                    name="age" 
                    value= {contact.age} 
                    ref={ageRef}
                    onChange={handleChange}/>
                </FloatingLabel>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form> 
        </>
    );
}