import { Routes, Route } from "react-router-dom";
import Register   from "../pages/Register";
import Categories from "../pages/Categories";
import Dashboard  from "../pages/Dashboard";

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
      <Route path="/"           element={<Register />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/dashboard"  element={<Dashboard />} />
      <Route path="/movies"     element={<Soon label="Movies" />} />
    </Routes>
  );
};

export default AppRoutes;