"use client";
import Header from "../header.jsx";
import Main from "../main.jsx";
import Footer from "../footer.jsx";
import { Etat } from "../comps/etat";
import { useState, useContext, useEffect } from "react";
import { WeatherContext } from "../comps/data";
import { Mode } from "../comps/darkmode";
import OtherDays from "../comps/other_days";
import Map from "../comps/map";


export default function Page() {
  const weatherContext = useContext(WeatherContext);
  const ModeType = useContext(Mode);

  if (!ModeType) return null;
  const { dark } = ModeType;

  if (!weatherContext) return null;

  const { data } = weatherContext;
  const [bg, setBg] = useState("");

  useEffect(() => {
    const found = Etat.find((e) => e.main === data?.weather?.[0].main);
    if (found) setBg(found.image);
  }, [data?.weather]);

  return (
    <div
    className={`${dark ? "brightness-70" : ""} bg-cover bg-center min-h-screen w-full`}
    style={{
      backgroundImage: `url(/${bg})`,
    }}
  >
    <div >
      <Header />
      <Main />
      <OtherDays />
      <Map />
      <Footer />
      
    </div>
  </div>
);
}
