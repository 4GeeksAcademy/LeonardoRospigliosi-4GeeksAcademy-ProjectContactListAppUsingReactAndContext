
import React, { useEffect, useState } from 'react'
import useGlobalReducer from '../hooks/useGlobalReducer';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

const API_URL_BASE = "https://playground.4geeks.com/contact";

const EditContact = () => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const params = useParams();
    console.log(params.contactID);
    const { store } = useGlobalReducer()

    const handleUpdateContact = async (contact_id) => {
        let editedContact = {
            "name": name,
            "phone": phone,
            "email": email,
            "address": address
        }
        try {
            //https://playground.4geeks.com/contact/agendas/AgendaLeonardo/contacts/9
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/AgendaLeonardo/contacts/${contact_id}`, {
                method: "PUT",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(editedContact)
            });

            if (!response.ok) {
                throw new Error("Ocurrio un error al editar el contacto" + contact_id);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        //Filtrar del "store", que es global por el valor del parámetro que viene en la URL
        const contact = store.contactsY.find((item) => item.id == params.contactID);
        console.log("ImprimrFIltrado");
        console.log(contact);

        //Setear los valores del contacto filtrado
        setName(contact.name);
        setPhone(contact.phone);
        setEmail(contact.name);
        setAddress(contact.address);

    }, []);

    return (
        <div className="container">
            <form >
            <div className="text-center mt-2">
                    <h2 > Edit Contact </h2>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputname" className="form-label">
                        Name:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputname"
                        aria-describedby="emailHelp"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputphone" className="form-label">
                        Phone:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputphone"
                        aria-describedby="emailHelp"
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value) }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email:
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputaddress" className="form-label">
                        Address:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputaddress"
                        aria-describedby="emailHelp"
                        value={address}
                        onChange={(e) => { setAddress(e.target.value) }}
                    />
                </div>

                <button type="button" className="btn btn-primary m-2" onClick={() => { handleUpdateContact(params.contactID); }} >
                    Save
                </button>
                <Link to={'/'} >
                    <button type="button" className="btn btn-primary" >
                        Regresar
                    </button>
                </Link>
            </form>
        </div>

    )
}

export default EditContact;