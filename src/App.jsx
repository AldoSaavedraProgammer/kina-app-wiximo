import { useState } from 'react'
import './App.css'
import { postUser, postProfile, getAmount } from './services/kuna'
import Maps from './components/Maps'

function App() {
  const [userId, setUserId] = useState('')
  const [vtexID, setVtexId] = useState('')
  const [loan, setLoan] = useState(0)
  const [location, setLocation] = useState({})
  const [status, setStatus] = useState(null)

  const getLocation = location => {
    setLocation(location)
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()

    console.log('location', `${import.meta.env.VITE_URI_BACKEND}`)
    const fd = new FormData(e.target)
    try {
      const response = await postUser(fd, location)
      const responseObj = await response.json()
      console.log(responseObj)
      if (!responseObj.success && !response.data.userId) throw new Error('No hay id')
      setUserId(responseObj.data.userId)
    } catch (error) {
      console.error('Error al crear usuario', error)
    }
  }

  const handleCreateProfile = async (event) => {
    event.preventDefault()
    const code = event.target.code.value
    console.log('creando prefil con id:', userId, 'y', `${code}`)
    try {
      const response = await postProfile(code, userId)
      const responseObj = await response.json()
      console.log(responseObj?.data)
      if(!responseObj.success) throw new Error('No hay perfilado')
      setStatus(responseObj?.data.profileResult)
    } catch (error) {
      console.error('Error al crear el perfil', error)
    }
  }

  const handleLoan = async (e) => {
    e.preventDefault()
    try {
      const response = await getAmount(userId)
      const responseObj = await response.json()
      console.log(responseObj)
      if (!responseObj.success) throw new Error('NO existe monto')
      setLoan(responseObj.data.maxAmount)
    } catch (error) {
      console.log('Error al traer el monto', error)
    }
  }

  

  return (
    <main>
      <form className='userForm' onSubmit={handleCreateUser}>
        <h2 className='title'>Crear usuario</h2>
        <div className='data'>
          <article className='data-personal'>
            <h4 className='title'>Datos personales</h4>
            <input type="text" name="name" placeholder="nombre" />
            <input type="text" name="mid_name" placeholder="segundo nombre" />
            <input type="text" name="first_surname" placeholder="apellido paterno" />
            <input type="text" name="second_surname" placeholder="apellido materno" />
            <input type="date" name="birthdate" placeholder="fecha de nacimiento" />
            <label><input type="radio" name="gender" value='man' defaultChecked />Maculino</label>
            <label><input type="radio" name="gender" value='woman' /> Femenino</label>
            <input type="text" name='rfc' placeholder='RFC con homoclave' />
            <input type="email" name="email" placeholder='email' />
            <input type="tel" name="phone" placeholder='telefono' />
          </article>


          <article className='data-financial'>
            <h4 className='title'>Datos financieros</h4>
            <input type="number" name='payment' placeholder='pago mensual' />
            <input type="number" name='init_payment' placeholder='pago inicial' min={40000} />
            <input type="number" name='entry' placeholder='ingreso neto mensual' />
            <input type="number" name='dependents' min="0" max="10" placeholder='dependientes economicos' />
          </article>
        </div>

        <article className='data-location'>
          <h4 className='title'>Ubicación</h4>
          <div className='location-maps'>
            <Maps getLocation={getLocation}/>
            <div>
              <input type="text" name='street' placeholder='calle' />
              <input type="text" name='neighborhood' placeholder='barrio' />
              <input type="text" name='outside' placeholder='numero exterior' />
              <input type="text" name='inside' placeholder='numero interior' />
              <input type="text" name='cp' placeholder='codigo postal' />
              <input type="text" name='city' placeholder='municipio' />
              <input type="text" name='state' placeholder='estado' />
            </div>
          </div>
        </article>

        <button>Enviar</button>
      </form>

      <input type="text" name="id_vtex" placeholder='ID Vtex' style={{margin: '5rem 0'}}/>

      <form className='userForm' onSubmit={handleCreateProfile}>
        <h2 className='title'>Perfilar usuario</h2>
        <p style={{color: `${status === 'APPROVED' ? '#138636': '#C91439'}`}}>{status}</p>
        <input type="number" name='code' placeholder='codigo' />
        <button>Enviar</button>
      </form>

      <form className='userForm'>
        <h2 className='title'>solicitar credito</h2>
        <p>{loan}</p>
        <button onClick={handleLoan}>Pedir prestamo</button>
      </form>
    </main>
  )
}

export default App
