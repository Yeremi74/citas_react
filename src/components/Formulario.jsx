import {useState, useEffect} from 'react'
import Error from './Error'

function Formulario({ paciente,setPaciente,paciente1,setPaciente1 }) {

  const [nombre, setNombre] = useState("")
  const [propietario, setPropietario] = useState("")
  const [email, setEmail] = useState("")
  const [fecha, setFecha] = useState("")
  const [sintomas, setSintomas] = useState("")

  const [error, setError] = useState(false)

  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente1.nombre)
      setPropietario(paciente1.propietario)
      setEmail(paciente1.email)
      setFecha(paciente1.fecha)
      setSintomas(paciente1.sintomas)
    }
  },[paciente1])


  const generarid = () => {
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)

    return random + fecha
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    // validacion del formulario

    if([nombre,propietario,email,fecha,sintomas].includes('')) {
      console.log('hay almenos un campo vacio');

      setError(true)
      return
    }
    setError(false)

    // objeto de paciente
    const objetoPaciente ={
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    if(paciente1.id) {
      // editando el registro
      objetoPaciente.id = paciente1.id

      const pacientesActualizados = paciente.map( pacienteState => pacienteState.id === paciente1.id ? objetoPaciente : pacienteState)

      setPaciente(pacientesActualizados)
      setPaciente1({})

    }else{
      // nuevo registro
      objetoPaciente.id = generarid()
      setPaciente([...paciente, objetoPaciente])
    }


    // reiniciar form
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  return (
      <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

        <p className="text-lg mt-5 text-center mb-10">Añade Pacientes y 
        <span className="text-indigo-600 font-bold "> Administralos</span></p>

        <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        >

      {/* si error es true, imprime el mensaje */}
          {error &&
           <Error
           mensaje="Todos los campos son obligatorios"
          />}
            
          <div className="mb-5">
            <label 
            className="block text-gray-700 uppercase font-bold" 
            htmlFor="mascota">Nombre Mascota</label>
            
            <input 
              id="mascota"
              type="text"
              placeholder="Nombre de la Mascota"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={nombre}
              onChange={ (e) => {setNombre(e.target.value)} }
              />
              
          </div>


          <div className="mb-5">
            <label 
            className="block text-gray-700 uppercase font-bold" 
            htmlFor="propietario">Nombre Propietario</label>

            <input 
              id="propietario"
              type="text"
              placeholder="Nombre del Propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={propietario}
              onChange={ (e) => {setPropietario(e.target.value)} }
              />
          </div>


          <div className="mb-5">
            <label 
            className="block text-gray-700 uppercase font-bold" 
            htmlFor="email">Email</label>

            <input 
              id="email"
              type="email"
              placeholder="Email Contacto Propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={email}
              onChange={ (e) => {setEmail(e.target.value)} }
              />
          </div>


          <div className="mb-5">
            <label 
            className="block text-gray-700 uppercase font-bold" 
            htmlFor="alta">Alta</label>

            <input 
              id="alta"
              type="date"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={fecha}
              onChange={ (e) => {setFecha(e.target.value)} }
              />
          </div>


          <div className="mb-5">
            <label 
            className="block text-gray-700 uppercase font-bold" 
            htmlFor="sintomas">Sintomas</label>

              <textarea 
                id="sintomas"
                cols="30"
                rows="10"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Describe los sintomas"
                value={sintomas}
              onChange={ (e) => {setSintomas(e.target.value)} }
              ></textarea>
          </div>

          <input 
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
            value={paciente1.id ? "Editar paciente" : "Agregar paciente"}
           />
        </form>
      </div>
      
    )
}

export default Formulario