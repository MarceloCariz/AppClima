import { useContext } from "react";
import climaContext from "../context/ClimaProvider";





const useClima = () =>  useContext(climaContext);



export default useClima;