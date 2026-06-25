import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import CategoryCard from "../components/CategoryCard";


/* ── placeholder screens so every route renders something ── */
const Soon = ({ label }) => (
  <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
    <p className="text-[#39ff14] text-2xl font-extrabold tracking-widest">
      {label}
    </p>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/"            element={<Register />} />
      {/* <Route path="/categories"  element={<Soon label="Categories" />} /> */}
      <Route path="/categories" element={
  <div className="min-h-screen bg-[#111120] p-8 grid grid-cols-3 gap-4 max-w-lg mx-auto">
    {["Action","Drama","Romance","Thriller","Western","Horror"].map(c => (
      <CategoryCard key={c} category={c} isSelected={c === "Action"} onToggle={() => {}} />
    ))}
  </div>
} />
      <Route path="/dashboard"   element={<Soon label="Dashboard" />} />
      <Route path="/movies"      element={<Soon label="Movies" />} />
    </Routes>
  );
};

export default AppRoutes;