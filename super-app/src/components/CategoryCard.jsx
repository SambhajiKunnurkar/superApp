// ── per-category Unsplash images ──────────────────────────────────────────
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

const CARD_BG = {
  Action:   "bg-[#ff4e00]",
  Drama:    "bg-[#d7a4ff]",
  Romance:  "bg-[#14a8ff]",
  Thriller: "bg-[#74c2ff]",
  Western:  "bg-[#a62e00]",
  Horror:   "bg-[#7358ff]",
  Fantasy:  "bg-[#ff4ee3]",
  Music:    "bg-[#e11d48]",
  Fiction:  "bg-[#6ee7b7]",
};

const BORDER = {
  Action:   "border-[#14a800]",
  Drama:    "border-[#14a800]",
  Romance:  "border-[#14a800]",
  Thriller: "border-[#14a800]",
  Western:  "border-[#14a800]",
  Horror:   "border-[#14a800]",
  Fantasy:  "border-[#14a800]",
  Music:    "border-[#14a800]",
  Fiction:  "border-[#14a800]",
};

const CategoryCard = ({ category, isSelected, onToggle }) => {
  return (
    <div
      onClick={() => onToggle(category)}
      className={`
        relative rounded-2xl p-4 flex flex-col justify-between cursor-pointer
        border-[4px] transition-all duration-200 h-full w-full box-border select-none
        ${CARD_BG[category]}
        ${isSelected ? `${BORDER[category]}` : "border-transparent"}
      `}
    >
      {/* Category Text Title */}
      <h3 className="text-white text-[22px] font-bold tracking-wide leading-tight">
        {category}
      </h3>

      {/* Internal Image container — scales automatically based on remaining row space */}
      <div className="w-full flex-1 min-h-0 rounded-xl overflow-hidden mt-3">
        <img
          src={IMAGES[category]}
          alt={category}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default CategoryCard;