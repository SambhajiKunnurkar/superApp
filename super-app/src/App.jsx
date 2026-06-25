// temporarily replace App.jsx content
import WeatherWidget from "./components/WeatherWidget";
import NotesWidget   from "./components/NotesWidget";

function App() {
  return (
    <div className="min-h-screen bg-[#0d0d1a] p-8 flex gap-6 items-start">
      <div className="w-[280px]">
        <WeatherWidget />
      </div>
      <div className="w-[220px] h-[220px]">
        <NotesWidget />
      </div>
    </div>
  );
}

export default App;