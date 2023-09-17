import {useState, useEffect} from 'react'
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {

  const [paciente, setPaciente] = useState([])
  const [paciente1, setPaciente1] = useState({})


  useEffect(() => {
    const obtenerlS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? []

      setPaciente(pacientesLS)
    }

    obtenerlS()
  },[])


  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(paciente))
  }, [paciente])


  const eliminarPaciente = (id) => {
    const pacientesActualizados = paciente.filter( paciente => paciente.id !== id)

    setPaciente(pacientesActualizados)
  }

  return (
    <div className="container mx-auto mt-20">
    <Header/>

      <div className="mt-12 md:flex">
        <Formulario
          paciente={paciente}
          setPaciente={setPaciente}
          paciente1={paciente1}
          setPaciente1={setPaciente1}
        />
        <ListadoPacientes
          paciente={paciente}
          setPaciente1={setPaciente1}
          eliminarPaciente={eliminarPaciente}
        />    
      </div>

    </div>
  )
}

export default App