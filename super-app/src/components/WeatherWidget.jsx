import { useEffect, useState } from "react";
import { fetchCurrentWeather } from "../services/apiServices";

const getIcon = (main = "") => {
  const c = main.toLowerCase();
  if (c.includes("thunder")) return "⛈";
  if (c.includes("rain"))    return "🌧";
  if (c.includes("drizzle")) return "🌦";
  if (c.includes("snow"))    return "❄";
  if (c.includes("mist") || c.includes("fog")) return "🌫";
  if (c.includes("cloud"))   return "☁";
  if (c.includes("clear"))   return "☀";
  return "🌤";
};

const pad = (n) => String(n).padStart(2, "0");

const formatDate = (d) =>
  `${pad(d.getMonth() + 1)}-${pad(d.getDate())}-${d.getFullYear()}`;

const formatTime = (d) => {
  const h    = d.getHours();
  const ampm = h >= 12 ? "PM" : "AM";
  return `${pad(h % 12 || 12)}:${pad(d.getMinutes())} ${ampm}`;
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [error,   setError]   = useState(false);
  const [now,     setNow]     = useState(new Date());

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    fetchCurrentWeather("London")
      .then(setWeather)
      .catch(() => setError(true));
  }, []);

  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3 w-full h-[200px]"
      style={{
        background: "linear-gradient(135deg, #1a0533 0%, #2d0b6e 100%)",
        border:     "1px solid rgba(123, 47, 255, 0.35)",
      }}
    >

      {/* Date / time bar */}
      <div className="flex justify-between items-center bg-[#ff006e] rounded-lg px-3 py-[9px] flex-shrink-0">
        <span className="text-white font-bold text-[13px] tracking-wide">{formatDate(now)}</span>
        <span className="text-white font-bold text-[13px] tracking-wide">{formatTime(now)}</span>
      </div>

      {error ? (
        <p className="text-gray-500 text-[12px] text-center py-3">Weather unavailable</p>
      ) : !weather ? (
        <p className="text-gray-500 text-[12px] text-center py-3">Loading weather…</p>
      ) : (
        <>
          {/* Icon + temp */}
          <div className="flex items-center gap-3 px-1 flex-shrink-0">
            <span className="text-[38px] leading-none">{getIcon(weather.weather?.[0]?.main)}</span>
            <div className="flex flex-col">
              <span className="text-white text-[26px] font-extrabold leading-none">
                {Math.round(weather.main?.temp)}°C
              </span>
              <span className="text-gray-400 text-[11px] capitalize mt-[3px]">
                {weather.weather?.[0]?.description}
              </span>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex justify-between items-start px-1 mt-auto">
            <div className="flex flex-col items-center gap-[3px]">
              <span className="text-[18px]">💨</span>
              <span className="text-white text-[11px] font-semibold">{weather.wind?.speed} km/h</span>
              <span className="text-gray-500 text-[10px]">Wind</span>
            </div>
            <div className="w-px bg-white/10 self-stretch mx-1" />
            <div className="flex flex-col items-center gap-[3px]">
              <span className="text-[18px]">🔵</span>
              <span className="text-white text-[11px] font-semibold">{weather.main?.pressure} mbar</span>
              <span className="text-gray-500 text-[10px]">Pressure</span>
            </div>
            <div className="w-px bg-white/10 self-stretch mx-1" />
            <div className="flex flex-col items-center gap-[3px]">
              <span className="text-[18px]">💧</span>
              <span className="text-white text-[11px] font-semibold">{weather.main?.humidity}%</span>
              <span className="text-gray-500 text-[10px]">Humidity</span>
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default WeatherWidget;