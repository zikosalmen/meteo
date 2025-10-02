import { useContext, useEffect ,useState ,useRef  } from "react"
import {Mode} from "./darkmode"
import { WeatherContext } from "./data";
import {Description} from "./etat"
import Image from 'next/image'
import {Lang} from "./lang-param";

export default function OtherDays(){
  const { ville } = useContext(WeatherContext);
  const[donne,setdonne]=useState([])
  const {dark}=useContext(Mode)
  const containerRef = useRef(null);
  const { t } = useContext(Lang);
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)

  useEffect(() => {
    if (!ville) return;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=4d541dde75c61a4d8667a35fdd72ea60&units=metric&lang=fr`)
      .then(res => res.json())
      .then(Data => {
        const dailyData = [];
        if(Data.list)for (let i = 0; i < Data.list.length; i += 8) {
          const dayData = Data.list.slice(i, i + 8);
          const temps = dayData.map(item => item.main.temp);
          dailyData.push({
            date: new Date(dayData[0].dt * 1000).toDateString(),
            temp_min: Math.round(Math.min(...temps)),
            temp_max: Math.round(Math.max(...temps)),
            etat: dayData[0].weather[0].description
          });
        }
        setdonne(dailyData);
      })
  }, [ville]);

  const Days = ({ ch }) => {
    const Jour = ch.substring(0,3).toLowerCase()
    const Mois = ch.substring(4,7).toLowerCase()
    const Day = ch.substring(8,10).trim()
    const Anne = ch.substring(11).trim()
    return (
      <p className="text-3xl font-sans">
        { t(Jour)} {Day} {t(Mois) } {Anne}
      </p>
    );
  };

  function Card({etat}){
    let des=""
    Description.map((e)=>{
      if(etat===e.desc){des=e.src}
    })
    return(
      <Image
        src={`/${des}`}
        height={200}
        width={100}
        alt="image not found"
        draggable={false}
      />
    )
  }

  const onPointerDown = (e) => {
    isDraggingRef.current = true
    startXRef.current = e.clientX
    scrollLeftRef.current = containerRef.current.scrollLeft
  }
  const onPointerMove = (e) => {
    if(!isDraggingRef.current) return
    const x = e.clientX
    const walk = (x - startXRef.current)
    containerRef.current.scrollLeft = scrollLeftRef.current - walk
  }
  const onPointerUp = () => {
    isDraggingRef.current = false
  }

  return(
    <div 
      ref={containerRef}
      className="flex gap-4 overflow-x-auto overflow-y-hidden px-4 py-2 cursor-grab active:cursor-grabbing"
      style={{scrollbarWidth:"none", msOverflowStyle:"none"}}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <style jsx>{`
        div::-webkit-scrollbar{display:none;}
      `}</style>
      {donne.map((e, indx) => (
        <div
          key={indx}
          className={`rounded-4xl min-w-[480px] grid grid-cols-3 gap-4 p-4 
            ${dark?`bg-gray-700/30 text-slate-300`:`bg-blue-300/30 text-slate-800`}`}
        >
          <div className="col-span-3"><Days ch={e.date}/></div>
          <div className={`${dark?`text-white`:`text-stone-800`}`} >
            <p className="flex text-3xl items-center gap-1 ">{e.temp_max} <p className="text-xl">{t("c")}</p>
              <Image src="/haute-temperature.png" height={100} width={50} alt="not found" draggable={false}/>
            </p>
            <p className="flex text-3xl items-center gap-1 ">{e.temp_min} <p className="text-xl">{t("c")}</p>
              <Image src="/basse-temperature.png" height={100} width={50} alt="not found" draggable={false}/>
            </p>
          </div>
          <div className="row-span-2 col-span-2 flex justify-center items-center"><Card etat={e.etat}/></div>
          <p className={`text-2xl col-span-3 ${dark?`text-white`:`text-black`}`} >{t(e.etat)} </p>
        </div>
      ))}
    </div>
  )
}
