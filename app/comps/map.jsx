"use client"
import { useEffect , useState } from "react";
export default function Map(){
    const[vil,setvil]=useState();
    const ville=" gafsa tunisia"
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(ville)}`;
    useEffect(()=>{
        fetch(url).then((rs)=>rs.json())
        .then((data)=>(setvil(data[0]?.display_name || "Pas trouvé")))
    },[ville])
    return(
        <>
        <h1>{vil}</h1>
        </>
    )
}
