export const initialStore = () => {
  return {
    contactsY: [],
    agenda: ""
  }
}

export default function storeReducer(store, action = {}) {
  const API_URL_BASE = 'https://playground.4geeks.com/contact';
  switch (action.type) {

    //Leo: Metodo creado Obtener contactos (forma1)
    case 'update_contacts':
      const { contacts } = action.payload
      const { slug } = action.payload

      // //Imprimiendo en Consola para Debuggear:
      // console.log("Imprimir action.payload:");
      // console.log(action.payload);
      // console.log("Imprimir contactos:");
      // console.log(contacts);
      // console.log("Imprimir Slug");
      // console.log(slug);
      // console.log("Imprimir ...store");

      // if (Array.isArray(store)) {
      //   console.log([...store]); 
      // } else {
      //   console.log("store is not an array:", store); 
      // }
      return { ...store, contactsY: [...contacts], agenda: slug }


    //Leo: Metodo creado Obtener contactos (forma2)
    case 'set_contacts':
      const { contactsX } = action.payload
      return {
        ...store,
        contactsY: contactsX
      }

    default:
      throw Error('Unknown action.');
  }

}


