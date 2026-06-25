import { useEffect, useState } from "react";
import { fetchMovieDetails }   from "../services/apiServices";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=70";

const MovieModal = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  // ── fetch full details on mount ───────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchMovieDetails(movie.imdbID)
      .then(setDetails)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [movie.imdbID]);

  // ── close on Escape key ───────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // ── lock body scroll while modal is open ─────────────────────────────
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // ── poster with fallback ──────────────────────────────────────────────
  const poster =
    details?.Poster && details.Poster !== "N/A"
      ? details.Poster
      : PLACEHOLDER;

  return (
   
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-50
        bg-black/80 backdrop-blur-sm
        flex items-center justify-center
        p-5
      "
    >
      {/* ── modal box ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          bg-[#1f1f3a] border border-[#2a2a4a]
          rounded-2xl
          w-full max-w-[680px] max-h-[90vh]
          overflow-y-auto
          [&::-webkit-scrollbar]:w-[4px]
          [&::-webkit-scrollbar-thumb]:bg-[#7b2fff80]
          [&::-webkit-scrollbar-thumb]:rounded-full
        "
        style={{
          animation: "modalIn .22s ease",
        }}
      >

        {/* keyframe injected inline — no CSS file needed */}
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.93); }
            to   { opacity: 1; transform: scale(1);    }
          }
        `}</style>

        {/* ── close button — top right ── */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 z-10
            w-8 h-8 rounded-full
            bg-white/10 hover:bg-[#ff006e]
            text-white text-[13px]
            flex items-center justify-center
            transition-colors duration-150
          "
        >
          ✕
        </button>

        {/* ── loading state ── */}
        {loading && (
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-gray-500 text-[13px]">Loading details…</p>
          </div>
        )}

        {/* ── error state ── */}
        {!loading && error && (
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-gray-500 text-[13px]">
              Could not load movie details.
            </p>
          </div>
        )}

        {/* ── content — only rendered when details loaded ── */}
        {!loading && !error && details && (
          <div className="flex gap-6 p-7">

            {/* ── LEFT — poster ── */}
            <div className="flex-shrink-0">
              <img
                src={poster}
                alt={details.Title}
                className="w-[175px] rounded-xl object-cover"
                style={{ aspectRatio: "2/3" }}
                onError={(e) => {
                  e.target.src = PLACEHOLDER;
                }}
              />
            </div>

            {/* ── RIGHT — all text info ── */}
            <div className="flex flex-col gap-3 flex-1 min-w-0">

              {/* title */}
              <h2 className="text-white text-[20px] font-extrabold leading-snug">
                {details.Title}
              </h2>

              {/* meta badges row — year · runtime · rating */}
              <div className="flex flex-wrap gap-2">

                {details.Year && (
                  <span className="bg-white/8 border border-[#2a2a4a] text-gray-300 text-[11px] px-3 py-[4px] rounded-full">
                    {details.Year}
                  </span>
                )}

                {details.Runtime && details.Runtime !== "N/A" && (
                  <span className="bg-white/8 border border-[#2a2a4a] text-gray-300 text-[11px] px-3 py-[4px] rounded-full">
                    {details.Runtime}
                  </span>
                )}

                {details.imdbRating && details.imdbRating !== "N/A" && (
                  <span className="bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 text-[11px] px-3 py-[4px] rounded-full">
                    ⭐ {details.imdbRating} / 10
                  </span>
                )}

              </div>

              {/* genre */}
              {details.Genre && details.Genre !== "N/A" && (
                <div className="flex flex-col gap-[3px]">
                  <span className="text-gray-500 text-[10px] uppercase tracking-widest">
                    Genre
                  </span>
                  <p className="text-gray-300 text-[12px]">
                    {details.Genre}
                  </p>
                </div>
              )}

              {/* cast */}
              {details.Actors && details.Actors !== "N/A" && (
                <div className="flex flex-col gap-[3px]">
                  <span className="text-gray-500 text-[10px] uppercase tracking-widest">
                    Cast
                  </span>
                  <p className="text-gray-300 text-[12px]">
                    {details.Actors}
                  </p>
                </div>
              )}

              {/* divider */}
              <div className="w-full h-px bg-[#2a2a4a]" />

              {/* plot */}
              {details.Plot && details.Plot !== "N/A" && (
                <div className="flex flex-col gap-[5px]">
                  <span className="text-gray-500 text-[10px] uppercase tracking-widest">
                    Plot
                  </span>
                  <p className="text-gray-400 text-[12px] leading-relaxed">
                    {details.Plot}
                  </p>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MovieModal;