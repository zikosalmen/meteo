import { Mode} from "./darkmode";
import {   useContext} from "react";
export default function Compass({ angle }) {
    const{dark}=useContext(Mode)
  return (
    <div className="flex flex-col items-center gap-4">

      <div className={`relative w-30 h-30 flex items-center justify-center rounded-full border-4
      ${dark?
          ` border-stone-500`:' border-blue-300'
        }`}>

        <svg
          className="w-12 h-12 transform transition-transform duration-500 text-2xl"
          style={{ rotate: `${angle}deg` }}
          viewBox="0 0 24 24"
          fill="none"
          stroke={`${dark?`#EDDEA4`:`black`}`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          
          
        >
          <line x1="12" y1="2" x2="12" y2="22" />
          <polyline points="5,15 12,22 19,15" />
        </svg>

      
        <span className="absolute top-2 left-1/2 transform text-sm -translate-x-1/2 font-bold">N</span>
        <span className="absolute bottom-2 left-1/2 transform text-sm -translate-x-1/2 font-bold">S</span>
        <span className="absolute top-1/2 right-2 transform text-sm -translate-y-1/2 font-bold">E</span>
        <span className="absolute top-1/2 left-2 transform text-sm -translate-y-1/2 font-bold">W</span>
      </div>

     
  
    
    </div>
  );
}
