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
    fetch(`api/weather?ville=${ville}&lang=${langue}`)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, [ville, langue]);

  return (
    <WeatherContext.Provider value={{ data, ville, setVille }}>
      {children}
    </WeatherContext.Provider>
  );
}
