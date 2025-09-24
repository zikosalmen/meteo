"use client"
import Header from "./header.jsx"
import Main from "./main.jsx"
import Footer from "./footer.jsx"
import {Etat} from "./comps/etat"
import { useState , useContext , useEffect } from "react"
import {WeatherContext} from "./comps/data"
import { Mode} from "./comps/darkmode";
import OtherDays from "./comps/other_days"



export default function Page(){
  const weatherContext = useContext(WeatherContext);
  const ModeType=useContext(Mode)

  if (!ModeType)return null;
  const{dark }=ModeType;

if (!weatherContext) return null; 

const { data} = weatherContext; 
  const [bg, setBg] = useState("");

useEffect(() => {
  const found = Etat.find(e => e.main === data?.weather?.[0].main);
  if (found) setBg(found.image);
}, [data?.weather]);



 

  return(
    <>
    <div className={`${dark?`brightness-70`:``}`} style={{ backgroundImage: `url(/${bg})`, backgroundSize: "cover", backgroundPosition: "center", height:"120vh" }}>
    <Header />
    <Main/>
    <OtherDays/>
    <Footer/>
    </div>
    
    </>
  )
}