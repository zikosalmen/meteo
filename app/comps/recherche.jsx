"use client";
import AsyncSelect from "react-select/async";
import { useState, useEffect, useCallback ,useContext } from "react";
import { WeatherContext } from "../comps/data";
import { Mode } from "../comps/darkmode";
import { Lang } from "../comps/lang-param";


 function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

export default function Recherche() {
  const [mounted, setMounted] = useState(false);
  const {  ville, setVille } = useContext(WeatherContext);
  const { dark} = useContext(Mode);
  const { t } = useContext(Lang);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function loadRegions(valeur) {
      const rl=`api/city?valeur=${valeur}`
        const res=await fetch(rl)
        const data=await res.json()
        return (data)
    }


  const loadOptions = useCallback(
    debounce((valeur, callback) => {
      loadRegions(valeur).then(callback);
    }, 400),[]
  );


const handvill=((i)=>{
  if(i?.value!="" && i?.value!=null ){
  setVille(i.value.stateName)}
  
})

  if (!mounted) return null;
console.log("ville: "+ville)
  return (
 <div className={`flex justify-center items-center w-[60%] py-1`}><p>{t("ville")}</p>
  <div
    className={`w-[60%] sm:w-[50%] md:w-[40%] lg:w-[30%] bg-transparent  ${
      dark ? "text-white" : "text-black"
    }`}
  >
    <AsyncSelect
  cacheOptions
  loadOptions={loadOptions}
  defaultOptions={[]}
  value={ville}
  onChange={handvill}
  placeholder="Tapez au moins 3 lettres..."
  isClearable
  noOptionsMessage={() => "Aucune région trouvée"}
  menuPortalTarget={document.body}
  styles={{
    control: (base) => ({
      ...base,
      backgroundColor: dark ? "#1e1e1e" : "rgba(255, 255, 255, 0.9)",
      color: dark ? "white" : "black",
      borderColor: dark ? "#555" : "rgba(135, 206, 235, 0.5)", 
      minHeight: "40px",
      height: "40px",
      fontSize: "13px",
      borderRadius: "10px",
      boxShadow: "0 0 6px rgba(135, 206, 235, 0.3)",
      transition: "all 0.2s ease-in-out",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0 10px",
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
      color: dark ? "white" : "black",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "4px",
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: "4px",
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      backgroundColor: dark ? "#2a2a2a" : "rgba(240, 248, 255, 0.9)",
      fontSize: "13px",
      borderRadius: "10px",
      color: dark ? "white" : "black",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      backdropFilter: "blur(10px)",
    }),
    option: (base, { isFocused, isSelected, data }) => ({
      ...base,
      padding: "10px 15px",
      backgroundColor: isFocused
        ? "rgba(135, 206, 250, 0.4)" 
        : isSelected
        ? "rgba(135, 206, 235, 0.6)" 
        : "transparent",
      color: dark ? "white" : "black",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontWeight: isSelected ? "bold" : "normal",
      transition: "background-color 0.2s ease",
    }),
  }}
  components={{
    Option: (props) => {
      return (
        <div
          {...props.innerProps}
          style={props.getStyles("option", props)}
          ref={props.innerRef}
        >
          <span >📍</span> 
          {props.children}
        </div>
      );
    },
  }}
/>
  </div>
</div>


  );
}