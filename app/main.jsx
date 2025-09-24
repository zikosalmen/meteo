"use client";
import { WeatherContext } from "./comps/data";
import { TimeContext } from "./comps/time";
import {   useContext, useEffect, useState } from "react";
import TemperatureChart from "./comps/courbe";
import { Mode} from "./comps/darkmode";
import {Icons} from "./comps/icons"
import Image from 'next/image'
import Flech from "./comps/fleche";



export default function Main() {
  const { data, ville} = useContext(WeatherContext);
  const realDate=useContext(TimeContext)
  const{dark}=useContext(Mode)

  function Card({ children, className }) {
    return (
      <div
        className={` backdrop-invert backdrop-opacity-5 rounded-3xl shadow-2xl p-4 text-xl ${className}
           ${dark?
          ` bg-black/30 text-white   `:' bg-white/30 text-black'
        }`}
      >
        {children}
      </div>
    );
  }
  const [etat,setetat]=useState("nuages .png")

  useEffect(()=>{
    Icons.map((a)=>{
      if(a.main===data?.weather?.[0].main){setetat(a.image)}
    })
  },[data?.weather])


  return (
    <>
      <div className=" text-white p-2.5 rounded-14xl w-full grid grid-cols-4 gap-4 ">
        <Card className={"col-span-2 "}>
          <div className=" flex gap-20 ">
            <span>
              <p className="text-5xl text-left flex gap-5">
                {data?.main.temp?.toFixed(0)} °C{" "}
                 <Image
      src="/termo.png"
      width={200}
      height={100}
      alt="Picture of the author"
      className={`w-16 h-20 ${dark?`sepia`:``}`}
    />
              </p>
              <br />
              
            </span>

            <span>
              <div className="flex gap-3">
              <p className="text-4xl font-bold"> {ville}</p>
              <Image
      src="/loc.png"
      width={200}
      height={100}
      alt="Picture of the author"
      className={`w-8 h-10 ${dark?`sepia`:``}`}
    /></div>

              <p className="text-xl flex gap-3">
                {realDate?.date}<Image
      src="/date.png"
      width={200}
      height={100}
      alt="Picture of the author"
      className={`w-6 h-8 ${dark?`sepia`:``}`}
    />
              </p>
              <p className="text-xl flex gap-3">
                {realDate?.time}<Image
      src="/time.png"
      width={200}
      height={100}
      alt="Picture of the author"
      className={`w-6 -8 ${dark?`sepia`:``}`}
    />
              </p>

               
            </span>
          </div>
        </Card>

        <Card className={"col-span-2 row-span-2"}>
          <TemperatureChart />
        </Card>
        <Card >
          <div className=" flex items-center gap-12  " >
            <p>{data?.weather[0].description}{" "}</p>

            <Image
      src={`/${etat}`}
      width={200}
      height={100}
      alt="Picture of the author"
      className={`w-16 -16 ${dark?`brightness-70`:``}`}
    />

          
          </div>
          <div className=" flex items-center gap-12  ">
          <p>Humidité : {data?.main.humidity}%</p>
           <Image
      src="/humidite.png"
      width={200}
      height={100}
      alt="Picture of the author"
      className={`w-16 -16 ${dark?`sepia`:``}`}
    /></div>
          
        </Card>

        <Card >
          <div className=" flex gap-12">
          
         <p className=" whitespace-nowrap"> Vent : {data?.wind.speed} m/s</p>
          <Image
      src="/vent-light.png"
      width={200}
      height={100}
      alt="Picture of the author"
      className={`w-180 h-20 ${dark?`sepia`:``}`}
    />
    </div>
    <div className=" flex items-cente gap-2" >
    <p className="text-lg">direction : {data?.wind.deg} deg</p>
    <Flech angle={data?.wind.deg}  />
    </div>
    
    
          
          
        </Card>
      </div>
    </>
  );
}
