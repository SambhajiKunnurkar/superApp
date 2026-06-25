// ── fallback poster when OMDB returns "N/A" or request fails ─────────────
const PLACEHOLDER =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=70";

const MovieCard = ({ movie, onClick }) => {
  const poster =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : PLACEHOLDER;

  return (
    
    <div
      onClick={() => onClick(movie)}
      className="
        relative rounded-lg overflow-hidden cursor-pointer
        aspect-[10/4]
        
        group
        transition-transform duration-200
        hover:scale-[1.05] hover:z-10
        hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)]
        bg-[#16213e]
        
      "
    >

      {/* ── poster image — fills the card ── */}
      <img
        src={poster}
        alt={movie.Title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          e.target.src = PLACEHOLDER;
        }}
      />

      
      <div
        className="
          absolute inset-0
          bg-black/65
          flex flex-col items-center justify-center gap-2
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
        "
      >
        {/* movie title — truncated, white, above the button */}
        <p
          className="
            text-white text-[11px] font-semibold text-center
            px-3 leading-snug
            max-w-full
          "
          style={{
            display:         "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow:        "hidden",
          }}
        >
          {movie.Title}
        </p>

        {/* year badge */}
        <p className="text-gray-300 text-[10px]">
          {movie.Year}
        </p>

        {/* View Details pill — neon green, matches Figma hover state */}
        <span
          className="
            bg-[#39ff14] text-black
            text-[11px] font-extrabold
            px-4 py-[6px] rounded-[4px]
            mt-1
          "
        >
          View Details
        </span>
      </div>

    </div>
  );
};

export default MovieCard;