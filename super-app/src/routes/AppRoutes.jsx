import { Routes, Route, Navigate } from "react-router-dom";
import { useStore }    from "../store/useStore";
import Register        from "../pages/Register";
import Categories      from "../pages/Categories";
import Dashboard       from "../pages/Dashboard";
import Movies          from "../pages/Movies";



// ─────────────────────────────────────────────────────────────────────────
const ProtectedRoute = ({ children, requireUser, requireCategories }) => {
  const user       = useStore((s) => s.user);
  const categories = useStore((s) => s.categories);

  const hasUser       = user.name.trim() !== "";
  const hasCategories = categories.length >= 3;

  // ── level 1 — must have registered ───────────────────────────────────
  if (requireUser && !hasUser) {
    return <Navigate to="/" replace />;
  }

  // ── level 2 — must have picked 3+ categories ─────────────────────────
  
  if (requireCategories && !hasCategories) {
    return <Navigate to="/categories" replace />;
  }

  // ── all checks passed — render the protected page ────────────────────
  return children;
};

// ─────────────────────────────────────────────────────────────────────────
// AppRoutes
// ─────────────────────────────────────────────────────────────────────────
const AppRoutes = () => {
  return (
    <Routes>

      {/* ── public ── */}
      <Route
        path="/"
        element={<Register />}
      />

      {/* ── requires registration ── */}
      <Route
        path="/categories"
        element={
          <ProtectedRoute requireUser>
            <Categories />
          </ProtectedRoute>
        }
      />

      {/* ── requires registration + 3 categories ── */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requireUser requireCategories>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ── requires registration + 3 categories ── */}
      <Route
        path="/movies"
        element={
          <ProtectedRoute requireUser requireCategories>
            <Movies />
          </ProtectedRoute>
        }
      />

      {/* ── catch-all — any unknown path goes back to register ── */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
};

export default AppRoutes;