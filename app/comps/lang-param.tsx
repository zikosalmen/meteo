"use client";

import { initTranslations } from "../i18n";
import { useParams } from "next/navigation";
import { useEffect, useState, createContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
interface LangContextType {
  t: ((key: string) => string) | null;
  setT: (t: (key: string) => string) => void;
}

interface LangueProps {

  children: ReactNode;
}

export const Lang = createContext<LangContextType | null>(null);

export default function Langue({  children }: LangueProps) {
  const router = useRouter();
  const [t, setT] = useState<((key: string) => string) | null>(null);
  const param = useParams();
  const id = Array.isArray(param?.local) ? param.local[0] : param?.local || "ar";

  useEffect(() => {
    const ln = localStorage.getItem("langue");
    if (ln && ln !== id) {
      router.push("/" + ln);
    } else if (!ln) {
      router.push("/ar");
    }
  }, []); 


  useEffect(() => {
    if (id) localStorage.setItem("langue", id);
  }, [id]);

  



  useEffect(() => {
    const loadTranslations = async () => {
      const i18n = await initTranslations(id, ["common"]);
      const tt = i18n.getFixedT(id, "common");
      setT(() => tt);
    };

    loadTranslations();
  }, [id]);

  return (
    <Lang.Provider value={{ t, setT }}>
      {children}
    </Lang.Provider>
  );
}
