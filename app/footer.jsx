import { useContext } from "react";
import { Mode} from "./comps/darkmode";
export default function Footer(){
    const{dark}=useContext(Mode)

    return(
        <>
        <hr />
        <p className={`text-xl  text-center ${dark? `text-white`:`text-black`}`}>© 2025 Meteo. All rights reserved</p>
        </>
    )
}