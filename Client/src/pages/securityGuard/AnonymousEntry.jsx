import { useState, useEffect } from "react"
import { usePopup } from "../../components/PopupContext";
import axios from 'axios';

const AnonymousEntry = () => {
  const { showPopup } = usePopup();
  const [formData, setFormData] = useState({
    identifier: '',
    motive: ''
  });

  const submitHandler = (e) => {
    e.preventDefault();
    // Aqui va la logica para el POST a una API

    // Guardar en la base de datos
    // Abrir la puerta de acceso
    axios.get('http://localhost:8080/mqtt/publish', { params: { message: 'open' } })
      .then((response) => { console.log(response) })

    if (formData.identifier == "" || formData.motive == "") {
      showPopup("Campos vacios", false)
    }

  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (

    <>
      <div className="max-w-4xl mx-auto mt-5 px-4 font-roboto_mono">
        <h1 className="text-3xl mb-4 text-center mt-8 text-sky-700">Crear entrada anónima</h1>
        <section className="shadow-md rounded p-6 mb-8 font-roboto_mono">
          <div className="justify-center mb-6 md:container md:mx-auto container mx-auto px-4 font-roboto_mono">
            <p className="font-bold text-center mb-4">Complete los siguientes campos</p>
            <form className="mt-5" onSubmit={submitHandler}>
              <label className="block text-gray-700 text-sm font-semibold mb-5">Identificador:</label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.identifier}
                onChange={handleChange}
                name="identifier"
              />
              <label className="mt-3 block text-gray-700 text-sm font-semibold mb-5">Motivo de ingreso:</label>
              <textarea
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.motive}
                onChange={handleChange}
                name="motive"
              />
              <button type="submit" className="bg-yellow-400 hover:bg-sky-700 font-roboto_mono font-semibold py-2 px-4 mt-5 rounded-md w-full sm:w-auto border border-stone-950">
                <span className="hover:text-black font-regular text-gray-500 p-3">Enviar Solicitud</span>
              </button>
            </form>
          </div>
        </section>
      </div>
    </>

  )
}

export default AnonymousEntry