
import React, { useState } from 'react'
import useGlobalReducer from '../hooks/useGlobalReducer';

const API_URL_BASE = "https://playground.4geeks.com/contact";

const CreateNewContact = () => {

    const { dispatch } = useGlobalReducer();

    const [newContact, setNewContact] = useState({ name: "", phone: "", email: "", address: "" });

    const handleOnChange = (event) => {
            setNewContact({ ...newContact, [event.target.name]: event.target.value })
        }

    const obtenerContactos = async () => {
        try {
            const response = await fetch(API_URL_BASE + '/agendas/AgendaLeonardo');

            if (!response.ok) {
                throw new Error("Ocurrio un error al obtener los contactos");
            }

            const data = await response.json();
            dispatch({ type: "set_contacts", payload: { contactsX: data.contacts } })
        } catch (error) {
            console.log(error);
        }
    };


    const createContact = async () => {
        try {
            const response = await fetch(API_URL_BASE + '/agendas/AgendaLeonardo/contacts', {
                method: "post",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newContact)
            });

            if (!response.ok) {
                throw new Error("Ocurrio un error al crear el contacto");
            }

            obtenerContactos();

        } catch (error) {
            console.log(error);
        }
    };




    return (
        <div><form >
            <div className="mb-3">
                <label htmlFor="exampleInputname" className="form-label">
                    Name
                </label>
                <input
                    type="text"
                    name='name'
                    className="form-control"
                    id="exampleInputname"
                    aria-describedby="emailHelp"
                    value={newContact.name}
                    onChange={handleOnChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputphone" className="form-label">
                    Phone
                </label>
                <input
                    type="text"
                    name='phone'
                    className="form-control"
                    id="exampleInputphone"
                    aria-describedby="emailHelp"
                    value={newContact.phone}
                    onChange={handleOnChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Email
                </label>
                <input
                    type="email"
                    name='email'
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={newContact.email}
                    onChange={handleOnChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputaddress" className="form-label">
                    Address
                </label>
                <input
                    type="text"
                    name='address'
                    className="form-control"
                    id="exampleInputaddress"
                    aria-describedby="emailHelp"
                    value={newContact.address}
                    onChange={handleOnChange}
                />
            </div>

            <button type="button" className="btn btn-primary" onClick={createContact} >
                AddContact
            </button>
        </form>
        </div>

    )
}

export default CreateNewContact