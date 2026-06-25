import { useEffect, useRef, useState } from "react";

// ── pad single digit to two chars ─────────────────────────────────────────
const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

const TimerWidget = () => {
  // input values — what the user sets before starting
  const [inputH, setInputH] = useState(5);
  const [inputM, setInputM] = useState(9);
  const [inputS, setInputS] = useState(0);

  // runtime state
  const [remaining, setRemaining] = useState(0);   // seconds left
  const [totalSec,  setTotalSec]  = useState(0);   // total seconds set
  const [running,   setRunning]   = useState(false);
  const [finished,  setFinished]  = useState(false);

  const intervalRef = useRef(null);

  // ── derived display values from remaining ─────────────────────────────
  const dispH = Math.floor(remaining / 3600);
  const dispM = Math.floor((remaining % 3600) / 60);
  const dispS = remaining % 60;

  // ── SVG circle progress ───────────────────────────────────────────────
  const RADIUS      = 45;
  const CIRCUMF     = 2 * Math.PI * RADIUS;
  const progress    = totalSec > 0 ? remaining / totalSec : 0;
  const strokeOffset = CIRCUMF - progress * CIRCUMF;

  // ── start — converts inputs to seconds, begins countdown ─────────────
  const handleStart = () => {
    const total = inputH * 3600 + inputM * 60 + inputS;
    if (total === 0) return;
    setTotalSec(total);
    setRemaining(total);
    setFinished(false);
    setRunning(true);
  };

  // ── pause — freezes the interval without resetting remaining ──────────
  const handlePause = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  // ── resume — restarts interval from current remaining ─────────────────
  const handleResume = () => {
    if (remaining > 0) setRunning(true);
  };

  // ── reset — wipes everything back to zero ────────────────────────────
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

  // ── the actual countdown interval ────────────────────────────────────
  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          setFinished(true);
          // small delay so state settles before alert blocks the thread
          setTimeout(() => alert("⏰ Time's up!"), 100);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // cleanup when running flips to false or component unmounts
    return () => clearInterval(intervalRef.current);
  }, [running]);

  // ── spinner adjuster — clamps to [0, max] ────────────────────────────
  const adjust = (setter, delta, max) => {
    if (running) return;   // don't allow changes while timer is going
    setter((prev) => Math.min(max, Math.max(0, prev + delta)));
  };

  // ── which control buttons to show ────────────────────────────────────
  const showStart  = !running && remaining === 0 && !finished;
  const showPause  = running;
  const showResume = !running && remaining > 0 && !finished;
  const showReset  = (!running && remaining > 0 && !finished) || finished;

  return (
    /*
      Card — dark purple gradient matching Figma page 4 timer widget.
    */
    <div
      className="rounded-xl p-5 flex flex-col items-center gap-4 w-full"
      style={{
        background: "linear-gradient(135deg, #12002a 0%, #1a0040 100%)",
        border:     "1px solid rgba(123, 47, 255, 0.4)",
      }}
    >

      {/* ── circular SVG progress ring ── */}
      
      <div className="relative w-[110px] h-[110px] flex items-center justify-center">
        <svg
          width="110"
          height="110"
          viewBox="0 0 110 110"
          className="absolute inset-0"
        >
          {/* background track */}
          <circle
            cx="55" cy="55" r={RADIUS}
            fill="none"
            stroke="#2a1a3e"
            strokeWidth="8"
          />
          {/* progress arc */}
          <circle
            cx="55" cy="55" r={RADIUS}
            fill="none"
            stroke="#ff006e"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRCUMF}
            strokeDashoffset={remaining > 0 ? strokeOffset : CIRCUMF}
            style={{
              transform:       "rotate(-90deg)",
              transformOrigin: "55px 55px",
              transition:      "stroke-dashoffset 1s linear",
            }}
          />
        </svg>

        {/* time display centred inside the ring */}
        <span className="text-[#ff006e] text-[13px] font-extrabold tracking-wider z-10">
          {running || remaining > 0
            ? `${pad(dispH)}:${pad(dispM)}:${pad(dispS)}`
            : "00:00:00"
          }
        </span>
      </div>

      {/* ── H / M / S spinner columns ── */}
    
      <div className="flex items-start gap-5">
        {[
          { label: "Hours",   val: inputH, set: setInputH, max: 23 },
          { label: "Minutes", val: inputM, set: setInputM, max: 59 },
          { label: "Seconds", val: inputS, set: setInputS, max: 59 },
        ].map(({ label, val, set, max }) => (
          <div key={label} className="flex flex-col items-center gap-[3px]">

            {/* up arrow */}
            <button
              onClick={() => adjust(set, 1, max)}
              disabled={running}
              className={`
                w-7 h-[18px] flex items-center justify-center rounded-[3px]
                text-[10px] transition-colors
                ${running
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              ▲
            </button>

            {/* current value */}
            <span className="text-white text-[20px] font-bold w-8 text-center leading-none py-[2px]">
              {pad(val)}
            </span>

            {/* down arrow */}
            <button
              onClick={() => adjust(set, -1, max)}
              disabled={running}
              className={`
                w-7 h-[18px] flex items-center justify-center rounded-[3px]
                text-[10px] transition-colors
                ${running
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              ▼
            </button>

            {/* label */}
            <span className="text-gray-500 text-[9px] mt-[2px]">
              {label}
            </span>

          </div>
        ))}
      </div>

      {/* ── control buttons ── */}
      <div className="flex gap-2 flex-wrap justify-center">

        {showStart && (
          <button
            onClick={handleStart}
            className="bg-[#39ff14] text-black text-[13px] font-extrabold px-8 py-[9px] rounded-[4px] hover:bg-[#2bdd0f] hover:shadow-[0_0_16px_rgba(57,255,20,0.4)] transition-all duration-200"
          >
            Start
          </button>
        )}

        {showPause && (
          <button
            onClick={handlePause}
            className="bg-[#ff6b00] text-black text-[13px] font-extrabold px-7 py-[9px] rounded-[4px] hover:bg-[#e55e00] transition-colors"
          >
            Pause
          </button>
        )}

        {showResume && (
          <button
            onClick={handleResume}
            className="bg-[#39ff14] text-black text-[13px] font-extrabold px-6 py-[9px] rounded-[4px] hover:bg-[#2bdd0f] transition-colors"
          >
            Resume
          </button>
        )}

        {showReset && (
          <button
            onClick={handleReset}
            className="border border-[#2a2a4a] text-gray-400 text-[13px] px-6 py-[9px] rounded-[4px] hover:border-[#ff006e] hover:text-[#ff006e] transition-colors"
          >
            Reset
          </button>
        )}

        {finished && (
          <button
            onClick={handleReset}
            className="bg-[#39ff14] text-black text-[13px] font-extrabold px-7 py-[9px] rounded-[4px] hover:bg-[#2bdd0f] transition-colors"
          >
            Restart
          </button>
        )}

      </div>

    </div>
  );
};

export default TimerWidget;