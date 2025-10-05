import { useContext } from "react";
import { Mode} from "./comps/darkmode";
import {Lang} from "./comps/lang-param";
export default function Footer(){
    const{dark}=useContext(Mode)
    const { t} = useContext(Lang);
    if(!t)return null

    return(
        <>
        <hr />
        <p className={`text-xl  text-center ${dark? `text-white`:`text-black`}`}>{t("rights")}</p>
        </>
    )
}