import { ChangeEvent, createContext, ReactNode, useState } from "react";
import { BusquedaI, ClimaI } from "../interfaces";
import axios from 'axios';

interface ContextProps {
    busqueda: BusquedaI;
    resultado: ClimaI;
    cargando: boolean;
    noResultado: string;
    datosBusqueda: (e:ChangeEvent<HTMLSelectElement | HTMLInputElement>)=>void;
    consultarClima: (datos:BusquedaI) => void;
}

type Props = {
    children: ReactNode;
}

const climaContext = createContext({} as ContextProps);






const ClimaProvider = ({children}:Props) =>{

    const [busqueda, setBusqueda] = useState<BusquedaI>({ciudad:'', pais: ''});
    const [resultado, setResultado] = useState({} as ClimaI);
    const [cargando, setCargando] = useState(false);
    const [noResultado, setNoResultado] = useState('')

    const datosBusqueda = (e:ChangeEvent<HTMLSelectElement| HTMLInputElement>) =>{
        setBusqueda({...busqueda, [e.target.name] : e.target.value});
    }

    const consultarClima = async(datos:BusquedaI) =>{
        setNoResultado('');
        setResultado({} as ClimaI);
        setCargando(true);
        try {
            const {ciudad, pais} = datos;
            const appId = import.meta.env.VITE_API_KEY;
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`;

            const {data} = await axios(url);
            const {lat, lon} = data[0];
            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

            const {data:clima} = await axios(urlClima);

            setResultado(clima);
        } catch (error) {
            console.log(error);
            setNoResultado('No hay Resultado');
        }finally{
            setCargando(false);
        }

    }

    return(
        <climaContext.Provider value={{busqueda, datosBusqueda, consultarClima, resultado, cargando, noResultado}}>
            {children}
        </climaContext.Provider>
    )
}


export {ClimaProvider};


export default climaContext;