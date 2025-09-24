'use client';
import { createContext, ReactNode ,useContext} from 'react';
import {WeatherContext} from "./data"

type Props = {
  children: ReactNode;
};

type Datetype = {
  date: string;
  time:string
};

export const TimeContext = createContext<Datetype | undefined>(undefined);

export default function DateProvider({ children }: Props) {
  const weatherContext = useContext(WeatherContext);

  if (!weatherContext) return null; 

  const { data } = weatherContext; 

const nowUtc = Date.now();

const localMillis = nowUtc + (data?.timezone ?? 0) * 1000;
const localTime = new Date(localMillis);


const value: Datetype = { 
  date: localTime.toLocaleString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",}),
  time:localTime.toLocaleString("fr-FR",{
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC" 
  })
};

  return (
    <TimeContext.Provider value={value}>
      {children}
    </TimeContext.Provider>
  );
}
