import React, {  FormEvent, useState } from 'react'
import useClima from '../hooks/useClima'

export const Formulario = () => {
    const [alerta, setAlerta] = useState('')
    const {busqueda, datosBusqueda, consultarClima}  = useClima();

    const {ciudad, pais} = busqueda;

    const handleSubmit = (e :FormEvent) => {
      e.preventDefault();
      if(Object.values(busqueda).includes('')){
        setAlerta('Todos los campos son obligatorios');
        return
      }
      setAlerta('');
      consultarClima(busqueda);
    }
  return (
    <div className='contenedor'>
      {alerta && <p>{alerta}</p>}
      <form action="" onSubmit={handleSubmit}>
        <div className='campo'>
          <label htmlFor="ciudad">Ciudad</label>
          <input  id="ciudad" name="ciudad" type="text" onChange={datosBusqueda} value={ciudad} />
        </div>
        <div className='campo'>
          <label htmlFor="pais">Pais</label>
          <select name="pais" id="pais" onChange={datosBusqueda} value={pais}>
            <option >- seleccione un pais -</option>
            <option value="US">Estados Unidos</option>
            <option value="CL">Chile</option>
            <option value="MX">Mexico</option>
            <option value="AR">Argentina</option>
            <option value="CO">Colombia</option>
            <option value="ES">España</option>
            <option value="VE">Venezuela</option>
          </select>
        </div>

        <input type="submit" value="Consultar Clima" />
      </form>

    </div>
  )
}
