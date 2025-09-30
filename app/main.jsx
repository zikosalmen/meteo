"use client";
import { WeatherContext } from "./comps/data";
import { TimeContext } from "./comps/time";
import { useContext, useEffect, useState } from "react";
import TemperatureChart from "./comps/courbe";
import { Mode } from "./comps/darkmode";
import { Icons } from "./comps/icons";
import Image from "next/image";
import Flech from "./comps/fleche";
import { Lang } from "./comps/lang-param";

export default function Main() {
  const { data, ville } = useContext(WeatherContext);
  const realDate = useContext(TimeContext);
  const { dark } = useContext(Mode);
  const { t } = useContext(Lang);

  function Card({ children, className }) {
    return (
      <div
        className={`backdrop-invert backdrop-opacity-5 rounded-3xl shadow-2xl p-3 sm:p-4 text-base sm:text-xl ${className}
           ${dark ? ` bg-black/30 text-white` : " bg-white/30 text-black"}`}
      >
        {children}
      </div>
    );
  }

  const [etat, setetat] = useState("/nuages.png");

  useEffect(() => {
    Icons.map((a) => {
      if (a.main === data?.weather?.[0].main) {
        setetat(a.image);
      }
    });
  }, [data?.weather]);

  if (!t) return "landing ...";

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2.5">
      <Card className="lg:col-span-2">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6 sm:gap-12">
          <span>
            <div className="flex items-center gap-3 sm:gap-5">
              <p className="text-4xl sm:text-5xl">{data?.main?.temp?.toFixed(0)}</p>
              {t("c")}
              <Image
                src="/termo.png"
                width={200}
                height={100}
                alt="temp"
                className={`w-12 h-16 sm:w-16 sm:h-20 ${dark ? `sepia` : ``}`}
              />
            </div>
          </span>

          <span className="flex flex-col gap-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <p className="text-2xl sm:text-3xl font-bold">{t(ville)}</p>
              <Image
                src="/loc.png"
                width={200}
                height={100}
                alt="loc"
                className={`w-6 h-8 sm:w-8 sm:h-10 ${dark ? `sepia` : ``}`}
              />
            </div>

            <p className="text-lg sm:text-xl flex items-center gap-2 sm:gap-3">
              {realDate?.date}
              <Image
                src="/date.png"
                width={200}
                height={100}
                alt="date"
                className={`w-5 h-6 sm:w-6 sm:h-8 ${dark ? `sepia` : ``}`}
              />
            </p>

            <p className="text-lg sm:text-xl flex items-center gap-2 sm:gap-3">
              {realDate?.time}
              <Image
                src="/time.png"
                width={200}
                height={100}
                alt="time"
                className={`w-5 h-6 sm:w-6 sm:h-8 ${dark ? `sepia` : ``}`}
              />
            </p>
          </span>
        </div>
      </Card>

      <Card className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
        <TemperatureChart />
      </Card>

      <Card>
        <div className="flex items-center justify-between gap-4">
          <p className="text-base sm:text-lg">{t(data?.weather?.[0]?.description ?? "—")}</p>
          <Image
            src={`/${etat}`}
            width={200}
            height={200}
            alt="etat"
            className={`w-12 h-12 sm:w-16 sm:h-16 ${dark ? `brightness-70` : ``}`}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-base sm:text-lg">
            {t("humidite")} : {data?.main?.humidity ?? "-"}%
          </p>
          <Image
            src="/humidite.png"
            width={200}
            height={100}
            alt="humidite"
            className={`w-12 h-12 sm:w-16 sm:h-16 ${dark ? `sepia` : ``}`}
          />
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between gap-4">
          <p className="text-base sm:text-lg whitespace-nowrap">
            {t("vent")} : {data?.wind?.speed} {t("m/s")}
          </p>
          <Image
            src="/vent-light.png"
            width={200}
            height={100}
            alt="vent"
            className={`w-12 h-12 sm:w-20 sm:h-20 ${dark ? `sepia` : ``}`}
          />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <p className="text-sm sm:text-lg">
            {t("direction")} : {data?.wind?.deg ?? "-"} {t("c")}
          </p>
          <Flech angle={data?.wind?.deg ?? "-"} />
        </div>
      </Card>
    </div>
  );
}
