import { useEffect, useRef, useState } from "react";

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

const TimerWidget = () => {
  const [inputH, setInputH] = useState(5);
  const [inputM, setInputM] = useState(9);
  const [inputS, setInputS] = useState(0);

  const [remaining, setRemaining] = useState(0);
  const [totalSec,  setTotalSec]  = useState(0);
  const [running,   setRunning]   = useState(false);
  const [finished,  setFinished]  = useState(false);

  const intervalRef = useRef(null);

  const dispH = Math.floor(remaining / 3600);
  const dispM = Math.floor((remaining % 3600) / 60);
  const dispS = remaining % 60;

  const RADIUS      = 45;
  const CIRCUMF     = 2 * Math.PI * RADIUS;
  const progress    = totalSec > 0 ? remaining / totalSec : 0;
  const strokeOffset = CIRCUMF - progress * CIRCUMF;

  const handleStart = () => {
    const total = inputH * 3600 + inputM * 60 + inputS;
    if (total === 0) return;
    setTotalSec(total);
    setRemaining(total);
    setFinished(false);
    setRunning(true);
  };

  const handlePause = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleResume = () => {
    if (remaining > 0) setRunning(true);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setRemaining(0);
    setTotalSec(0);
    setFinished(false);
    setInputH(0);
    setInputM(0);
    setInputS(0);
  };

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          setFinished(true);
          setTimeout(() => alert("⏰ Time's up!"), 100);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const adjust = (setter, delta, max) => {
    if (running) return;
    setter((prev) => Math.min(max, Math.max(0, prev + delta)));
  };

  const showStart  = !running && remaining === 0 && !finished;
  const showPause  = running;
  const showResume = !running && remaining > 0 && !finished;
  const showReset  = (!running && remaining > 0 && !finished) || finished;

  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-4 w-full h-full"
      style={{
        background: "linear-gradient(135deg, #12002a 0%, #1a0040 100%)",
        border:     "1px solid rgba(123, 47, 255, 0.5)",
      }}
    >

      {/* TOP ROW: circle left + spinners right */}
      <div className="flex items-center gap-6 flex-1">

        {/* Circle */}
        <div className="relative w-[120px] h-[120px] flex-shrink-0 flex items-center justify-center">
          <svg width="120" height="120" viewBox="0 0 110 110" className="absolute inset-0">
            <circle cx="55" cy="55" r={RADIUS} fill="none" stroke="#2a1a3e" strokeWidth="8" />
            <circle
              cx="55" cy="55" r={RADIUS}
              fill="none"
              stroke="#ff006e"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRCUMF}
              strokeDashoffset={remaining > 0 ? strokeOffset : CIRCUMF}
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "55px 55px",
                transition: "stroke-dashoffset 1s linear",
              }}
            />
          </svg>
          <span className="text-[#ff006e] text-[12px] font-extrabold tracking-wider z-10 text-center">
            {running || remaining > 0
              ? `${pad(dispH)}:${pad(dispM)}:${pad(dispS)}`
              : "00:00:00"
            }
          </span>
        </div>

        {/* Spinners */}
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex justify-around">
            {["Hours", "Minutes", "Seconds"].map((label) => (
              <span key={label} className="text-gray-400 text-[10px] text-center w-14">{label}</span>
            ))}
          </div>

          <div className="flex items-center justify-around gap-2">
            {[
              { label: "Hours",   val: inputH, set: setInputH, max: 23 },
              { label: "Minutes", val: inputM, set: setInputM, max: 59 },
              { label: "Seconds", val: inputS, set: setInputS, max: 59 },
            ].map(({ label, val, set, max }, i) => (
              <div key={label} className="flex flex-col items-center gap-[2px]">
                <button
                  onClick={() => adjust(set, 1, max)}
                  disabled={running}
                  className={`w-8 h-5 flex items-center justify-center rounded-[3px] text-[10px] transition-colors ${running ? "text-gray-600 cursor-not-allowed" : "text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white"}`}
                >▲</button>

                <div className="flex items-center gap-1">
                  <span className="text-white text-[22px] font-bold w-10 text-center leading-none py-[2px]">
                    {pad(val)}
                  </span>
                  {i < 2 && (
                    <span className="text-white text-[18px] font-bold leading-none pb-[2px]">:</span>
                  )}
                </div>

                <button
                  onClick={() => adjust(set, -1, max)}
                  disabled={running}
                  className={`w-8 h-5 flex items-center justify-center rounded-[3px] text-[10px] transition-colors ${running ? "text-gray-600 cursor-not-allowed" : "text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white"}`}
                >▼</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM: full-width control button */}
      <div className="flex gap-2 flex-shrink-0">
        {showStart && (
          <button onClick={handleStart} className="flex-1 bg-[#ff006e] text-white text-[13px] font-extrabold py-[11px] rounded-[6px] hover:bg-[#e0005e] hover:shadow-[0_0_16px_rgba(255,0,110,0.4)] transition-all duration-200">
            Start
          </button>
        )}
        {showPause && (
          <button onClick={handlePause} className="flex-1 bg-[#ff6b00] text-black text-[13px] font-extrabold py-[11px] rounded-[6px] hover:bg-[#e55e00] transition-colors">
            Pause
          </button>
        )}
        {showResume && (
          <button onClick={handleResume} className="flex-1 bg-[#ff006e] text-white text-[13px] font-extrabold py-[11px] rounded-[6px] hover:bg-[#e0005e] transition-colors">
            Resume
          </button>
        )}
        {showReset && (
          <button onClick={handleReset} className="flex-1 border border-[#2a2a4a] text-gray-400 text-[13px] py-[11px] rounded-[6px] hover:border-[#ff006e] hover:text-[#ff006e] transition-colors">
            Reset
          </button>
        )}
        {finished && (
          <button onClick={handleReset} className="flex-1 bg-[#ff006e] text-white text-[13px] font-extrabold py-[11px] rounded-[6px] hover:bg-[#e0005e] transition-colors">
            Restart
          </button>
        )}
      </div>

    </div>
  );
};

export default TimerWidget;