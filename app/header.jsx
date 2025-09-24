'use client'
import Link from "next/link";
import Image from "next/image";
import { gouvs } from "./comps/gouvs";
import { WeatherContext } from "./comps/data";
import { useEffect, useState, useContext } from "react";
import { Mode} from "./comps/darkmode";

export default function Header() {
  const { data, ville, setVille } = useContext(WeatherContext);
 const handville = (e) => {
  setVille(e.target.value);
};

  const {dark,setDark}=useContext(Mode)

  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header
      className={`flex items-center justify-between backdrop-invert p-3 ${
        dark
          ? "bg-black/30 text-white backdrop-opacity-10 "
          : "bg-white/30 backdrop-opacity-10 text-black "
      }`}
    >
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo-meteo.png"
          alt="Meteo Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <p className="text-xl font-bold">{dark ? "Meteo 🌙" : "Meteo ☀️"}</p>
      </Link>

      <span className={`flex items-center gap-1 py-1 px-3 rounded text-sm
       backdrop-invert backdrop-opacity-5 ${dark? `text-white  bg-black/30 `:` bg-white/30 text-black`}  `}>
        ville:
        <select
          value={ville}
          onChange={handville}
          className={` bg-transparent ${dark?` text-white`:`text-black`}`}
        >
          {gouvs.map((g) => (
            <option  
            className={` bg-transparent ${dark?` text-black`:`text-black`}`} key={g.id} > {g.name}</option>
          ))}
        </select>
      </span>

      <button
        className="flex items-center gap-1 py-1 px-3 rounded bg-gray-200 bg-opacity-60 hover:bg-opacity-80 text-black text-sm"
        onClick={() => setDark(!dark)}
      >
        <span>{dark ? "🌙 Dark" : "☀️ Light"}</span>
      </button>
    </header>
  );
}
