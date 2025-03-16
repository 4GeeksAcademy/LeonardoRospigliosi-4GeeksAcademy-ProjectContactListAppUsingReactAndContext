import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";


const API_URL_BASE = "https://playground.4geeks.com/contact";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const obtenerContactos = async () => {
		try {
			const response = await fetch(API_URL_BASE + '/agendas/AgendaLeonardo');

			if (!response.ok) {
				throw new Error("Ocurrio un error al obtener los contactos");
			}

			const data = await response.json();
			console.log(data);

			// dispatch({ type: "set_contacts", payload: { contacts: data.contacts } })
			dispatch({ type: "update_contacts", payload: data })
		} catch (error) {
			console.log(error);
		}
	};

	const EliminarContacto = async (contactId) => {
		if (window.confirm("¿Estás seguro de eliminar este contacto?")) {
			try {
				//https://playground.4geeks.com/contact/agendas/AgendaLeonardo/contacts/9
				const response = await fetch(`https://playground.4geeks.com/contact/agendas/AgendaLeonardo/contacts/${contactId}`, {
					method: "DELETE"
				});

				if (!response.ok) {
					throw new Error("Ocurrio un error al eliminar el contacto" + contactId);
				}

				obtenerContactos();

			} catch (error) {
				console.log(error);
			}
		}
	};

	const CrearAgenda = async () => {
		try {
			//https://playground.4geeks.com/contact/agendas/AgendaLeonardo
			const response = await fetch(`https://playground.4geeks.com/contact/agendas/AgendaLeonardo`, {
				method: "POST"
			});

			if (!response.ok) {
				throw new Error("Ocurrio un error al Crear Agenda: AgendaLeonardo");
			}
			obtenerContactos();
		} catch (error) {
			console.log(error);
		}
	};


	useEffect(() => {
		obtenerContactos();
	}, []);

	return (
		<div className="container text-center mt-5">
			<h2>Lista de Contactos</h2>
			<div className="d-flex justify-content-end mt-3">
				<Link to={`/create-contact`} >
					{!(store.agenda == "") ? (<button type="button" className="btn btn-success" >
						AddContact
					</button>) : ""}

				</Link>
			</div>

			{store.contactsY && store.contactsY.length > 0 ? (
				<div className="list-group mt-2">
					{store.contactsY.map((item) => {
						return (
							<div key={item.id} className="list-group-item p-2">
								<div className="row w-100 align-items-center m-0" >
									<div className="col-3 ">
										<img src="https://picsum.photos/120" className="img-fluid rounded-circle me-3 " alt="Foto de perfil"></img>
									</div>
									<div className="col-6 text-start">
										<h5 className="mb-1">{item.name}</h5>
										<p className="mb-1">📍 {item.address}</p>
										<p className="mb-1"> 📞 {item.phone}</p>
										<p className="mb-1"> 📧 {item.email}</p>
									</div>
									<div className="col-3 d-flex align-items-end align-self-start justify-content-end p-0">
										<Link to={`/edit-contact/${item.id}`} >
											<i className="fa-solid fa-pen-to-square m-3"></i>
										</Link>

										<i className="fa-solid fa-trash-can m-3"
											style={{ cursor: "pointer" }}
											onClick={() => { EliminarContacto(item.id); }} >
										</i>
									</div>
								</div>
							</div>
						)
					})}
				</div>)
				:
				(
					<div>
						<p className="mt-4 text-muted">No hay contactos disponibles.</p>
						{store.agenda == "" ? (<button type="button" className="btn btn-primary m-2" onClick={() => { CrearAgenda(); }} >
							CrearAgenda
						</button>) : ""}
					</div>
				)}

		</div >
	);
}; 