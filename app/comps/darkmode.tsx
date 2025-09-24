"use client";
import { useState, createContext, ReactNode, useEffect } from "react";

type modeType = {
  dark?: boolean;
  setDark?: (ville: boolean) => void;
};
export const Mode = createContext<undefined | modeType>(undefined);

type props = {
  children: ReactNode;
};

export default function InfoMode({ children }: props) {

const [dark, setDark] = useState<false | true>(false);
    useEffect(()=>{
    const save=localStorage.getItem("dark")
    if(save){
        setDark(JSON.parse(save))
        
    }},[])
useEffect(() => {
  localStorage.setItem("dark", JSON.stringify(dark));
}, [dark]);


  return (
    <>
      <Mode.Provider value={{ dark, setDark }}>{children}</Mode.Provider>
    </>
  );
}
