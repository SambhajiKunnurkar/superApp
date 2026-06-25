import WeatherWidget from "./components/WeatherWidget";
import NotesWidget   from "./components/NotesWidget";
import NewsWidget    from "./components/NewsWidget";
import TimerWidget   from "./components/TimerWidget";

function App() {
  return (
    <div className="min-h-screen bg-[#0d0d1a] p-6 flex gap-4 items-start">
      <div className="w-[260px] flex flex-col gap-4">
        <WeatherWidget />
        <TimerWidget />
      </div>
      <div className="w-[260px] h-[480px]">
        <NewsWidget />
      </div>
      <div className="w-[200px] h-[200px]">
        <NotesWidget />
      </div>
    </div>
  );
}

export default App;