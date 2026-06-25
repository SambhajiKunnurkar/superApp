import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import CategoryCard from "../components/CategoryCard";

const ALL_CATEGORIES = [
  "Action",   "Drama",   "Romance",
  "Thriller", "Western", "Horror",
  "Fantasy",  "Music",   "Fiction",
];

const Categories = () => {
  const navigate      = useNavigate();
  const setCategories = useStore((s) => s.setCategories);
  const saved         = useStore((s) => s.categories);

  const [selected, setSelected] = useState(saved || []);

  const toggle = (cat) =>
    setSelected((prev) =>
      prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat]
    );

  const handleNext = () => {
    if (selected.length < 3) return;
    setCategories(selected);
    navigate("/dashboard");
  };

  const canProceed = selected.length >= 3;

  return (
    <div className="h-screen w-screen bg-black flex flex-row p-12 lg:p-16 font-sans overflow-hidden box-border">

      {/* LEFT SIDE PANEL */}
      <div className="w-[50%] flex flex-col justify-between pr-10 h-full flex-shrink-0">
        <div className="flex flex-col gap-8">
          {/* Brand Name */}
          <h1 className="text-[#72db41] text-[45px] font-cursive tracking-wider font-normal">
            Super app
          </h1>

          {/* Title Header */}
          <h2 className="text-white text-[52px] font-bold leading-[1.15] tracking-wide max-w-sm">
            Choose your entertainment category
          </h2>

          {/* Active selection tag pills */}
          <div className="flex flex-wrap gap-x-3 gap-y-2.5 max-w-sm mt-2">
            {selected.map((cat) => (
              <div
                key={cat}
                className="bg-[#14a800] text-white text-[14px] px-4 py-2 rounded-full flex items-center gap-2.5 font-medium shadow-sm"
              >
                <span>{cat === "Music" ? "Mucic" : cat}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(cat);
                  }}
                  className="text-black/60 hover:text-black font-bold text-[12px] transition-colors"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic validation error notification */}
        {!canProceed && (
          <div className="flex items-center gap-3 mt-auto">
            <svg
              width="18" height="16"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <path
                d="M7 1L13 12H1L7 1Z"
                fill="#FF0000"
                stroke="#FF0000"
                strokeWidth="0.5"
              />
              <text
                x="7" y="10.5"
                textAnchor="middle"
                fontSize="7"
                fill="white"
                fontWeight="bold"
              >
                !
              </text>
            </svg>
            <p className="text-[#FF0000] text-[15px] tracking-wide">
              Minimum 3 category required
            </p>
          </div>
        )}
      </div>

      {/* RIGHT SIDE GRID & SUBMIT ACTION */}
      <div className="flex-1 flex flex-col justify-between items-end h-full min-w-0">
        
        {/* Forces exactly 3 uniform rows and 3 uniform columns inside the exact bounded height allotment */}
        <div className="grid grid-cols-3 grid-rows-3 gap-4 w-full h-[85%] min-h-0">
          {ALL_CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat}
              category={cat}
              isSelected={selected.includes(cat)}
              onToggle={toggle}
            />
          ))}
        </div>

        {/* Form Submission Action Area */}
        <div className="w-full flex justify-end items-end h-[10%] flex-shrink-0">
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className="px-10 py-2.5 rounded-full text-[16px] font-medium tracking-wide bg-[#14a800] text-white hover:bg-[#118c00] cursor-pointer transition-all"
          >
            Next Page
          </button>
        </div>
      </div>

    </div>
  );
};

export default Categories;