import { useStore } from "../store/useStore";

const NotesWidget = () => {
  const notes    = useStore((s) => s.notes);
  const setNotes = useStore((s) => s.setNotes);

  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-2 h-full w-full"
      style={{ background: "#ffd700" }}
    >
      <h4 className="text-black font-extrabold text-[15px] leading-none flex-shrink-0">
        All notes
      </h4>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write a quick note…"
        spellCheck={false}
        className={`
          flex-1 bg-transparent border-none outline-none resize-none
          text-black text-[12px] leading-relaxed
          placeholder-[#7a6a00]
          min-h-0
          overflow-y-auto
          [&::-webkit-scrollbar]:w-[3px]
          [&::-webkit-scrollbar-thumb]:bg-[#b8960080]
          [&::-webkit-scrollbar-thumb]:rounded-full
        `}
      />

      <div className="flex justify-between items-center flex-shrink-0">
        <button
          onClick={() => setNotes("")}
          disabled={!notes}
          className={`
            text-[11px] font-bold px-3 py-[5px] rounded-[3px] transition-colors duration-150
            ${notes
              ? "bg-black/15 text-black hover:bg-black/25 cursor-pointer"
              : "bg-black/5 text-black/30 cursor-not-allowed"
            }
          `}
        >
          Clear
        </button>
        <span className="text-[9px] text-[#7a6a00] font-medium">Auto-saved</span>
      </div>
    </div>
  );
};

export default NotesWidget;