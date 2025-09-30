"use client"
import { createContext, useState, useEffect, ReactNode} from "react";
import { useParams } from "next/navigation";



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
  const param = useParams();
  const langue = Array.isArray(param?.local) ? param.local[0] : param?.local || "ar";
  
  const [data, setData] = useState<WeatherData | null>(null);

   useEffect(()=>{
    const vl=localStorage.getItem("ville")
    if(vl){
    setVille(JSON.parse(vl))
  }else{setVille("Tunis")}

  },[])
  const [ville, setVille] = useState<string>("");
 
  
 useEffect(()=>{
    localStorage.setItem("ville",JSON.stringify(ville))
  },[ville,langue])



  useEffect(() => {
    if (ville) {
      const lien = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=4d541dde75c61a4d8667a35fdd72ea60&units=metric&lang=${langue}`;
      fetch(lien)
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((err) => console.error(err));
    }
  }, [ville,langue]);

  return (
    <WeatherContext.Provider value={{ data, ville, setVille }}>
      {children}
    </WeatherContext.Provider>
  );
}
