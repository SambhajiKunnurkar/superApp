import { useEffect, useState } from "react";
import { fetchTopHeadlines } from "../services/apiServices";

const NewsWidget = () => {
  const [articles, setArticles] = useState([]);
  const [idx,      setIdx]      = useState(0);
  const [error,    setError]    = useState(false);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    fetchTopHeadlines("general")
      .then((data) => {
        const valid = data.filter((a) => a.urlToImage && a.title);
        setArticles(valid.slice(0, 12));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (articles.length === 0) return;
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % articles.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [articles]);

  if (loading) {
    return (
      <div className="rounded-xl bg-[#16213e] border border-[#2a2a4a] flex items-center justify-center h-full w-full">
        <p className="text-gray-500 text-[12px]">Loading news…</p>
      </div>
    );
  }

  if (error || articles.length === 0) {
    return (
      <div className="rounded-xl bg-[#16213e] border border-[#2a2a4a] flex items-center justify-center h-full w-full">
        <p className="text-gray-500 text-[12px]">News unavailable</p>
      </div>
    );
  }

  const article = articles[idx];
  const published = article.publishedAt
    ? `${article.publishedAt.slice(0, 10)} | ${article.publishedAt.slice(11, 16)}`
    : "";

  return (
    <div className="rounded-xl bg-[#0d0d1a] border border-[#2a2a4a] overflow-hidden flex flex-col h-full w-full">

      {/* Hero image — top 42% */}
      <div className="relative w-full flex-shrink-0 overflow-hidden" style={{ height: "42%" }}>
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.parentElement.style.display = "none"; }}
          />
        )}
        {article.source?.name && (
          <span
            className="absolute bottom-2 right-2 text-white text-[11px] font-extrabold px-3 py-[5px] rounded-[4px]"
            style={{ background: "#ff006e" }}
          >
            {article.source.name}
          </span>
        )}
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-[8px] p-4 flex-1 overflow-hidden">
        <h4
          className="text-white text-[13px] font-bold leading-snug"
          style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {article.title}
        </h4>
        <p className="text-gray-500 text-[10px] flex-shrink-0">{published}</p>
        <p
          className="text-gray-400 text-[11px] leading-relaxed flex-1"
          style={{ display: "-webkit-box", WebkitLineClamp: 7, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {article.description}
        </p>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center items-center gap-[5px] pb-3 flex-shrink-0">
        {articles.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`rounded-full transition-all duration-300 ${i === idx ? "bg-[#39ff14] w-[10px] h-[5px]" : "bg-gray-600 w-[5px] h-[5px]"}`}
          />
        ))}
      </div>

    </div>
  );
};

export default NewsWidget;