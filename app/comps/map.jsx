"use client";

import { useContext, useEffect, useState } from "react";
import {WeatherContext} from "./data"
export default function Map() {
  const [lat, setLat] = useState(0);  
  const [lon, setLon] = useState(0);   
  const [localisation, setLocalisation] = useState({ gouvernorat: "", pays: "" });
  const {data,ville ,setVille}=useContext(WeatherContext)

  useEffect(() => {
    if (!lat || !lon) return;

    const lien = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    fetch(lien, {
      headers: {
        "User-Agent": "MonApp/1.0 (salmen5@gmail.com)"
      }
    })
      .then((res) => res.json())
      .then((res) => {
        const gouvernorat = res.address?.state || res.address?.county || "—";
        const pays = res.address?.country || "—";
        setLocalisation({ gouvernorat, pays });
      })
      .catch((err) => console.error(err));
  }, [lat, lon]);
  

  useEffect(() => {
    if ("geolocation" in navigator) {
      let ville=""
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat( pos.coords.latitude)
          setLon( pos.coords.longitude,)
          let ville=localisation.gouvernorat.substring(12,16)
          if(localisation.gouvernorat && localisation.gouvernorat!=="" ){setVille(ville);
           localStorage.setItem("ville",JSON.stringify(ville))
           console.log("vl"+ville)}
        },
      );
    }
  }, []);
  
  

  return (
    <>
    </>
  );
}
