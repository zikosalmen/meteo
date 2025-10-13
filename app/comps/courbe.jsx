"use client";
import {Area,ComposedChart,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,} from "recharts";
import { useState, useEffect, useContext } from "react";
import { WeatherContext } from "./data";
import { Mode } from "./darkmode";
import { Lang } from "./lang-param";

export default function TemperatureChart() {
  const [TimeNow, setTimeNow] = useState({});
  const [det, setdet] = useState([]);
  const { data, ville } = useContext(WeatherContext);
  const { dark } = useContext(Mode);
  const { t } = useContext(Lang);

  useEffect(() => {
    if (!ville) return;

    fetch(`api/forecast?ville=${ville}`)
      .then((res) => res.json())
      .then((Data) => {
        if (!Data.list) return;

        const part1 = Data.list.slice(0, 3).map((item) => ({
          temp: item.main.temp,
          time: new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
        const part2 = Data.list.slice(4, 7).map((item) => ({
          temp: item.main.temp,
          time: new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
        const cityTime = new Date((data.dt + data.timezone) * 1000);
        const hours = cityTime.getUTCHours();     
        const minutes = cityTime.getUTCMinutes();
        const nowValue = {
          temp: data?.main?.temp?.toFixed(0),
          time: `${hours}:${minutes}`,
        };
        setTimeNow(nowValue);
        setdet([...part2, nowValue, ...part1]);
      });
  }, [ville]);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h2
        className={` rounded-2xl  p-6 text-xl text-center
      ${dark ? ` text-white ` : ` text-black`} `}
      >
        {t("Évolution des températures")}
      </h2>
      <div className="w-full h-[240px] sm:h-[85%] lg:h-[115%]">
        <ResponsiveContainer width="100%" height="100%" className="sm:h-[85%]">
          <ComposedChart
            data={det}
            margin={{ top: 20, right: 5, bottom: 20, left: 5 }}
          >
            <CartesianGrid stroke="transparent" />
            <XAxis
              dataKey="time"
              scale="point"
              tickMargin={16}
              tick={(props) => {
                const { x, y, payload } = props;
                const color =
                  payload.value === TimeNow.time
                    ? "red"
                    : dark
                    ? "#fff"
                    : "#000";
                return (
                  <text x={x} y={y} fill={color} textAnchor="middle">
                    {payload.value}
                  </text>
                );
              }}
            />
            <YAxis
              tick={{ fill: dark ? "#fff" : "#000" }}
              unit="°C"
              tickMargin={6}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: dark ? "#1f2937" : "#fff",
                border: `1px solid ${dark ? "#fff" : "#ccc"}`,
                borderRadius: "10px",
              }}
            />
            <Area
              type="monotone"
              dataKey="temp"
              fill={dark ? "#4b5563" : "#dbeafe"}
              stroke={dark ? "#6366f1" : "#8884d8"}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
