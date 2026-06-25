
const IMAGES = {
  Action:   "https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&q=75",
  Drama:    "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=75",
  Romance:  "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&q=75",
  Thriller: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=75",
  Western:  "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&q=75",
  Horror:   "https://images.unsplash.com/photo-1604849329105-e1a78f18a5b3?w=400&q=75",
  Fantasy:  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=75",
  Music:    "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400&q=75",
  Fiction:  "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&q=75",
};


const BADGE_BG = {
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


const BADGE_TEXT = {
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


const BORDER = {
  Action:   "border-[#ff6b00]",
  Drama:    "border-[#ff006e]",
  Romance:  "border-[#39ff14]",
  Thriller: "border-[#7b2fff]",
  Western:  "border-[#ffd700]",
  Horror:   "border-[#9b59b6]",
  Fantasy:  "border-[#00b4ff]",
  Music:    "border-[#ff4757]",
  Fiction:  "border-[#2ed573]",
};


const CHECK_BG = {
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

const CategoryCard = ({ category, isSelected, onToggle }) => {
  return (
    <div
      onClick={() => onToggle(category)}
      className={`
        relative rounded-xl overflow-hidden cursor-pointer
        border-2 transition-all duration-200
        aspect-square
        ${isSelected
          ? `${BORDER[category]} scale-[1.02] shadow-lg`
          : "border-transparent"
        }
        hover:scale-[1.04]
      `}
    >
      {/* ── background image ── */}
      <img
        src={IMAGES[category]}
        alt={category}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* ── subtle dark overlay so badge is always readable ── */}
      <div className="absolute inset-0 bg-black/20" />

      {/* ── coloured label badge — top-left, matches Figma ── */}
      <div className="absolute top-2 left-2 z-10">
        <span
          className={`
            ${BADGE_BG[category]} ${BADGE_TEXT[category]}
            text-[11px] font-bold px-2.5 py-[3px] rounded-[3px]
            leading-none
          `}
        >
          {category}
        </span>
      </div>

      {/* ── checkmark bubble — top-right, only when selected ── */}
      {isSelected && (
        <div
          className={`
            absolute top-2 right-2 z-10
            ${CHECK_BG[category]}
            w-[22px] h-[22px] rounded-full
            flex items-center justify-center
            shadow-md
          `}
        >
          <svg
            width="11" height="9"
            viewBox="0 0 11 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 4L4 7L10 1"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;