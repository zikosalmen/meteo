"use client"
import { WeatherContext } from "./data";
import { useEffect, useState , useContext } from "react"
import Image from 'next/image'
import { Cloud } from 'lucide-react';


export default function Photo(){
    const [Data,setData]=useState((JSON))
    const { ville } = useContext(WeatherContext);
    useEffect(()=>{
        fetch(`api/photos?ville=${ville}`)
        .then(res=>res.json())
        .then(data=>{
            if(!data)return "photo not found"
            setData(data)
            

    })
    },[ville])
    console.log(Data)
    const pages = Data?.query?.pages;
    if (!pages) {
  return (
    <Cloud className="w-16 h-16 text-blue-800 animate-pulse" />
  );
}
    const pageId = Object.keys(pages)[0];
    const imageUrl = pages[pageId].imageinfo[0].url;

    return(<>
    {imageUrl? (
  <Image src={imageUrl} alt="erreur connexion" className="rounded-3xl w-full h-full object-cover"  height={200} width={200} />
) : (
  <Cloud className="w-16 h-16 text-blue-800 animate-pulse" />
)}
    
    </>)
}