import { useNavigate } from "react-router-dom";
import { useStore }    from "../store/useStore";
import WeatherWidget   from "../components/WeatherWidget";
import NewsWidget      from "../components/NewsWidget";
import TimerWidget     from "../components/TimerWidget";
import NotesWidget     from "../components/NotesWidget";

const avatarUrl = (username) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(username)}&backgroundColor=b6e3f4`;

const PILL_BG = {
  Action:   "bg-[#ff6b00]",
  Drama:    "bg-[#ff006e]",
  Romance:  "bg-[#39ff14]",
  Thriller: "bg-[#7b2fff]",
  Western:  "bg-[#ffd700]",
  Horror:   "bg-[#9b59b6]",
  Fantasy:  "bg-[#00b4ff]",
  Music:    "bg-[#ff4757]",
  Fiction:  "bg-[#2ed573]",
};

const PILL_TEXT = {
  Action:   "text-black",
  Drama:    "text-white",
  Romance:  "text-black",
  Thriller: "text-white",
  Western:  "text-black",
  Horror:   "text-white",
  Fantasy:  "text-black",
  Music:    "text-white",
  Fiction:  "text-black",
};

const Dashboard = () => {
  const navigate   = useNavigate();
  const user       = useStore((s) => s.user);
  const categories = useStore((s) => s.categories);

  return (
    <div className="h-screen flex flex-col bg-[#0d0d1a] overflow-hidden relative">

      <div className="flex-1 grid grid-cols-[390px_1fr_480px] gap-4 p-4 overflow-hidden">

        {/* COLUMN 1 — Profile + Weather */}
        <div className="flex flex-col gap-4 overflow-hidden h-[57%]">

          <div
            className="rounded-xl p-4 flex items-center gap-3 flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #2a0060 0%, #4a1080 100%)" }}
          >
            <img
              src={avatarUrl(user.username || "user")}
              alt="avatar"
              className="w-[72px] h-[152px] rounded-full flex-shrink-0 bg-[#b6e3f4] border-2 border-white/20"
            />
            <div className="flex flex-col gap-[5px] overflow-hidden">
              <p className="text-white text-[12px] truncate leading-none">{user.name}</p>

              <p className="text-white/55 text-[10px] truncate leading-none">{user.email}</p>
              <p className="text-white text-[22px] font-extrabold leading-none truncate">{user.username}</p>
              <div className="flex flex-wrap gap-[5px] mt-[2px]">
                {categories.slice(0, 4).map((cat) => (
                  <span
                    key={cat}
                    className={`${PILL_BG[cat] || "bg-white/20"} ${PILL_TEXT[cat] || "text-black"} text-[9px] font-bold px-2 py-[3px] rounded-[3px] leading-none`}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <WeatherWidget />
          </div>

        </div>

        {/* COLUMN 2 — Notes (top) + Timer (bottom) */}
        <div className="flex flex-col gap-4 overflow-hidden h-[57%]">
          <div className="h-[100%] flex-shrink-0">
            <NotesWidget />
          </div>
          <div className="flex-1 overflow-hidden">
            <TimerWidget />
          </div>
        </div>
        

        {/* COLUMN 3 — News full height */}
        <div className="overflow-hidden">
          <NewsWidget />
        </div>

      </div>
      <div className="flex-1 px-4 absolute w-[68%] h-[275px] mt-[440px]">
            <TimerWidget />
          </div>

      {/* Browse button — pinned bottom-right */}
      <div className="absolute bottom-5 right-5 z-10">
        <button
          onClick={() => navigate("/movies")}
          className="bg-[#39ff14] text-black text-[12px] font-extrabold px-6 py-[8px] rounded-full tracking-wide hover:bg-[#2bdd0f] hover:shadow-[0_0_14px_rgba(57,255,20,0.35)] transition-all duration-200"
        >
          Browse
        </button>
      </div>

    </div>
  );
};

export default Dashboard;