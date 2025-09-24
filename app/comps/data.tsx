"use client"
import { createContext, useState, useEffect, ReactNode } from "react";


interface WeatherData {
   dt?: number; 
  name?: string;
  weather?: { main: string; description: string }[];
  main?: { temp: number };
   timezone?: number;
}

interface WeatherContextType {
  data?: WeatherData | null;
  ville?: string;
  setVille?: (ville: string) => void;
}


export const WeatherContext = createContext<WeatherContextType | null>(null);


interface WeatherProviderProps {
  children: ReactNode;
}


export default function WeatherProvider({ children }: WeatherProviderProps) {
  
  const [data, setData] = useState<WeatherData | null>(null);
  const langue = "fr";
   useEffect(()=>{
    const vl=localStorage.getItem("ville")
    if(vl){
    setVille(JSON.parse(vl))
  }else{setVille(JSON.parse("Tunis"))}

  },[])
  const [ville, setVille] = useState<string>("");
 
  
 useEffect(()=>{
    localStorage.setItem("ville",JSON.stringify(ville))
    console.log("ville set:"+ville)
  },[ville])

  useEffect(() => {
    if (ville) {
      const lien = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=4d541dde75c61a4d8667a35fdd72ea60&units=metric&lang=${langue}`;
      fetch(lien)
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((err) => console.error(err));
    }
  }, [ville]);

  return (
    <WeatherContext.Provider value={{ data, ville, setVille }}>
      {children}
    </WeatherContext.Provider>
  );
}
