'use client'
import Link from "next/link";
import Image from "next/image";
import { gouvs } from "./comps/gouvs";
import { WeatherContext } from "./comps/data";
import { useEffect, useState, useContext } from "react";
import { Mode} from "./comps/darkmode";
import {Lang} from "./comps/lang-param";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";


export default function Header() {
  const { ville, setVille } = useContext(WeatherContext);
  const {dark,setDark}=useContext(Mode)
  const [mounted, setMounted] = useState(false);
  const { t  } = useContext(Lang);
  const router = useRouter();

  const param = useParams();
  const langue = Array.isArray(param?.local) ? param.local[0] : param?.local || "ar";
    
 const handville = (e) => {
  setVille(e.target.value);
};
  useEffect(() => {
    setMounted(true);
  }, []);
 const handLang=(e)=>{
  router.push(e.target.value)
 }
 
  if(!t)return "landing ...";
  if (!mounted) return null;
  return (<header
  className={`flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 
              backdrop-invert p-3 
              ${dark
                ? "bg-black/30 text-white backdrop-opacity-10"
                : "bg-white/30 text-black backdrop-opacity-10"}`}
>
  <Link href="/" className="flex items-center gap-2 sm:gap-3">
    <Image
      src="/logo-meteo.png"
      alt="Meteo Logo"
      width={40}
      height={40}
      className="object-contain"
    />
    <p className="text-lg sm:text-xl font-bold">
      {t("meteo") + (dark ? " 🌙" : " ☀️")}
    </p>
  </Link>

  <span className={`flex items-center gap-1 sm:gap-2 py-1 px-3 rounded text-sm
                   backdrop-invert backdrop-opacity-5 ${dark? "text-white bg-black/30":"bg-white/30 text-black"}`}>
    {t("ville")}
    <select
      value={ville}
      onChange={handville}
      className={`bg-transparent ${dark? "text-white" : "text-black"}`}
    >
      {gouvs.map((g) => (
        <option
          className={`bg-transparent ${dark? "text-black" : "text-black"}`}
          key={g.id}
        >
          {t(g.name)}
        </option>
      ))}
    </select>
  </span>

  <span>
    <select
      name=""
      id=""
      value={langue}
      onChange={handLang}
      className="text-sm sm:text-base"
    >
      {t("langues")}
      <option className={`bg-transparent ${dark? "text-black" : "text-black"}`} value="fr">francais</option>
      <option className={`bg-transparent ${dark? "text-black" : "text-black"}`} value="ar">arabe</option>
      <option className={`bg-transparent ${dark? "text-black" : "text-black"}`} value="en">anglais</option>
    </select>
  </span>

  <button
    className="flex items-center gap-1 py-1 px-3 rounded bg-gray-200 bg-opacity-60 hover:bg-opacity-80 text-black text-sm sm:text-base"
    onClick={() => setDark(!dark)}
  >
    <span>{dark ? "🌙" + t("dark-mode") : "☀️" + t("light-mode")}</span>
  </button>
</header>

  );
}
