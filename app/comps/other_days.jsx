import { useContext, useEffect ,useState ,useRef  } from "react"
import {Mode} from "./darkmode"
import { WeatherContext } from "./data";
import { jours,mois } from "./moins-jours";
import {Description} from "./etat"
import Image from 'next/image'


export default function OtherDays(){
    const { ville } = useContext(WeatherContext);
    const[donne,setdonne]=useState([])
    const {dark}=useContext(Mode)
    const containerRef = useRef(null);
    const [desc,setdesc]=useState("")

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
  const Jour = jours.find(i => i.name.toLowerCase() === ch.substring(0,3).toLowerCase())
  const Mois = mois.find(i => i.name.toLowerCase() === ch.substring(4,7).toLowerCase())
  const Day = ch.substring(8,10).trim()
  const Anne = ch.substring(11).trim()

  return (
    <p className="text-3xl font-sans">
      { Jour.desc} {Day} {Mois.desc } {Anne}
    </p>
  );
};


    
      

  const scrollNext = () => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.firstChild.offsetWidth; 
      containerRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.firstChild.offsetWidth;
      containerRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
      
    }
  };

function Card({etat}){
  let des=""
  Description.map((e)=>{
      if(etat===e.desc){des=e.src}
  })

  return(
    <>
    <Image
            src={`/${des}`}
             height={200}
             width={100}
             alt="image not found"
            
            />

    </>
  )
}
    


    return(    <div className="relative w-full  overflow-hidden">

      <button 
        onClick={scrollPrev} 
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-700 text-white p-2 rounded-full"
      >
        ←
      </button>


      <div
        ref={containerRef}
        className="overflow-hidden scrollbar-none  flex space-x-4 px-12"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {donne.map((e, indx) => (
          <div
            key={indx}
            className={`rounded-4xl min-w-[480px]   grid grid-cols-3 gap-4 bg-blue-200/30 p-4  scroll-snap-align-start
              ${dark?`bg-gray-700/30`:`bg-blue-300/30`}`}
          >
            <div className={`col-span-3 ${dark?`text-slate-300`:`text-slate-800`}`}>
             <Days ch={e.date}/>
             </div>
             
             <div className={` ${dark?`text-white`:`text-stone-700`}`} >
            <p className="flex text-3xl items-center gap-1 ">{e.temp_max} °C 
              <Image
            src="/haute-temperature.png"
             height={100}
             width={50}
             alt="image not found"
            
            />
                   
                </p>
            
            <p className="flex text-3xl items-center gap-1 ">{e.temp_min} °C<Image
            src="/basse-temperature.png"
             height={100}
             width={50}
             alt="image not found"
            
            />
            </p></div>
            <div className="row-span-2 col-span-2 flex justify-center items-center"><Card etat={e.etat}/></div>
            <p  className={`text-2xl col-span-3 ${dark?`text-white`:`text-black`}`} >{e.etat} </p>
            
          </div>
        ))}
      </div>

      <button 
        onClick={scrollNext} 
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-700 text-white p-2 rounded-full"
      >
        →
      </button>
    </div>
  );
}