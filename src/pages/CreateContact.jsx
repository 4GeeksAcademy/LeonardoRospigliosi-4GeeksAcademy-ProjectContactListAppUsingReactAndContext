
import React, { useState } from 'react'
import { Link } from "react-router-dom";

const API_URL_BASE = "https://playground.4geeks.com/contact";

const CreateContact = () => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");


    const handleRegisterContact = async () => {
        let newContact = {
            "name": name,
            "phone": phone,
            "email": email,
            "address": address
        }

        try {
            const response = await fetch(API_URL_BASE + '/agendas/AgendaLeonardo/contacts', {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(newContact)
            });

            if (!response.ok) {
                throw new Error("Ocurrio un error al crear el contacto");
            }

            LimpiarFormulario();

        } catch (error) {
            console.log(error);
        }
    };

    const LimpiarFormulario = () => {
        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
    }


    return (
        <div className="container">
            <form >
                <div className="text-center mt-2">
                    <h2 > Add a new Contact </h2>
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
                        placeholder="Ingrese Nombre"
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
                        placeholder="Ingrese Número de Teléfono"
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
                        placeholder="Ingrese email"
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
                        placeholder="Ingrese dirección"
                        value={address}
                        onChange={(e) => { setAddress(e.target.value) }}
                    />
                </div>

                <button type="button" className="btn btn-primary m-2" onClick={() => { handleRegisterContact(); }} >
                    AddContact
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

export default CreateContact