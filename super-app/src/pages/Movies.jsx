import { useEffect, useState } from "react";
import { useNavigate }         from "react-router-dom";
import { useStore }            from "../store/useStore";
import { searchMovieByGenre }  from "../services/apiServices";
import MovieCard               from "../components/MovieCard";
import MovieModal              from "../components/MovieModal";

// ── deterministic avatar — same seed as Dashboard ────────────────────────
const avatarUrl = (username) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
    username
  )}&backgroundColor=b6e3f4`;

const Movies = () => {
  const navigate   = useNavigate();
  const user       = useStore((s) => s.user);
  const categories = useStore((s) => s.categories);

  // key: category string  →  value: array of OMDB movie objects
  const [moviesByCat, setMoviesByCat] = useState({});

  // tracks which categories are still loading
  const [loadingCats, setLoadingCats] = useState([]);

  // the movie whose modal is open — null means modal closed
  const [activeMovie, setActiveMovie] = useState(null);

  // ── fetch movies for every selected category ──────────────────────────
  
  useEffect(() => {
    if (!categories.length) return;

    setLoadingCats([...categories]);

    const fetchAll = async () => {
      for (const cat of categories) {
        try {
          const results = await searchMovieByGenre(cat);
          // keep up to 4 per category — matches Figma 4-column grid
          const top4 = results.slice(0, 4);
          setMoviesByCat((prev) => ({ ...prev, [cat]: top4 }));
        } catch {
          // on error store an empty array so the category still renders
          setMoviesByCat((prev) => ({ ...prev, [cat]: [] }));
        } finally {
          // remove this category from the loading list
          setLoadingCats((prev) => prev.filter((c) => c !== cat));
        }
      }
    };

    fetchAll();
  }, [categories]);

  // ── are ALL categories still loading? ────────────────────────────────
  const allLoading =
    loadingCats.length === categories.length && categories.length > 0;

  return (
    
    <div className="h-screen flex flex-col bg-[#111120] overflow-hidden">

      
      <div
        className="
          flex items-center justify-between
          px-7 py-[14px]
          bg-[#0d0d1a] border-b border-[#1e1e35]
          flex-shrink-0
        "
      >
        {/* brand + subtitle */}
        <div className="flex flex-col gap-[3px]">
          <span className="text-[#39ff14] text-[16px] font-extrabold tracking-wide">
            Super app
          </span>
          <span className="text-gray-400 text-[11px]">
            Entertainment according to your choice
          </span>
        </div>

        {/* avatar — click goes back to dashboard */}
        <img
          src={avatarUrl(user.username || "user")}
          alt="avatar"
          onClick={() => navigate("/dashboard")}
          title="Back to Dashboard"
          className="
            w-10 h-10 rounded-full
            bg-[#b6e3f4]
            border-2 border-[#39ff14]
            cursor-pointer
            hover:shadow-[0_0_12px_rgba(57,255,20,0.4)]
            transition-all duration-200
          "
        />
      </div>

      {/* ════════════════════════════════════════════════════════════════
          SCROLLABLE CONTENT AREA
      ════════════════════════════════════════════════════════════════ */}
      <div
        className="
          flex-1 overflow-y-auto
          px-7 py-6
          flex flex-col gap-8
          [&::-webkit-scrollbar]:w-[4px]
          [&::-webkit-scrollbar-thumb]:bg-[#7b2fff60]
          [&::-webkit-scrollbar-thumb]:rounded-full
          
        "
      >

        {/* ── full-page loading spinner ── */}
        {allLoading && (
          <div className="flex-1 flex items-center justify-center h-64">
            <p className="text-gray-500 text-[13px] animate-pulse">
              Fetching movies for you…
            </p>
          </div>
        )}

        {/* ── one section per category ── */}
        {categories.map((cat) => {
          const movies    = moviesByCat[cat];
          const isFetching = loadingCats.includes(cat);

          return (
            <div key={cat} className="flex flex-col gap-3">

              {/* ── category heading — matches Figma grey label ── */}
              <h3 className="text-gray-400 text-[13px] font-semibold tracking-wide">
                {cat}
              </h3>

              {/* ── per-category loading row ── */}
              {isFetching && (
                <div className="h-[180px] flex items-center">
                  <p className="text-gray-600 text-[12px] animate-pulse">
                    Loading {cat} movies…
                  </p>
                </div>
              )}

              {/* ── movie grid — 4 columns, matches Figma page 5 ── */}
              {!isFetching && movies && movies.length > 0 && (
                
                <div className="grid grid-cols-4 gap-3">
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      onClick={setActiveMovie}
                    />
                  ))}
                </div>
              )}

              {/* ── empty state — API returned no results ── */}
              {!isFetching && movies && movies.length === 0 && (
                <p className="text-gray-600 text-[12px] py-2">
                  No results found for {cat}.
                </p>
              )}

            </div>
          );
        })}

      </div>

      {/* ── movie detail modal — rendered outside scroll container ── */}
     
      
      {activeMovie && (
        <MovieModal
          movie={activeMovie}
          onClose={() => setActiveMovie(null)}
        />
      )}

    </div>
  );
};

export default Movies;