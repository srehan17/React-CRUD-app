import { FC } from 'react';
import {IContact} from "../data/contacts";
import { Button, Table } from "react-bootstrap";

export interface ContactListProps{
    contacts: IContact[];
    onEditContact: (contact: IContact) => void;
    onDeleteContact: (id: string) => void;
  }
  
export const ContactsList: FC<ContactListProps> = ({
        contacts, 
        onEditContact, 
        onDeleteContact
    })  => {
    return (
        <div >
            {(contacts.length === 0) ?
            null :                
            <Table>
                <thead>
                    <tr className="tableHeadings">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Age</th>  
                        <th>Actions</th>  
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.age}</td>  
                            <td>
                                <Button 
                                    onClick={() => onEditContact(item)}>Edit</Button> 
                                 {" "}
                                 <Button variant="danger" 
                                    onClick={() => onDeleteContact(item.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>}
        </div> 
    );
}