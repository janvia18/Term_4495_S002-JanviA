import { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Modules from "./pages/Modules";
import ModulePhishing from "./pages/ModulePhishing";
import Login from "./pages/LoginPage.jsx";
import Signup from "./pages/SignupPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import { supabase } from "./lib/supabaseClient";

const avatarEmoji = {
  bear: "🐻",
  horse: "🐴",
  cat: "🐱",
  dog: "🐶",
  fox: "🦊",
  panda: "🐼",
  rabbit: "🐰",
  tiger: "🐯",
  lion: "🦁",
  monkey: "🐵",
  koala: "🐨",
  penguin: "🐧",
  frog: "🐸",
  owl: "🦉",
  unicorn: "🦄",
  dragon: "🐲",
};

export default function App() {
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  useEffect(() => {
    const load = () => {
      const saved = localStorage.getItem("profile");
      setProfile(saved ? JSON.parse(saved) : null);
    };
    load();
    window.addEventListener("storage", load);

    const t = setInterval(load, 400);
    return () => {
      window.removeEventListener("storage", load);
      clearInterval(t);
    };
  }, 
  []);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="page">
      <nav className="nav">
        <div className="navLeft">
          <div
            style={{
              fontWeight: 900,
              padding: "8px 12px",
              borderRadius: 14,
              background:
                "linear-gradient(135deg, rgba(108,99,255,0.20), rgba(63,182,255,0.14))",
              border: "1px solid rgba(108,99,255,0.18)",
            }}
          >
            <div className="brand">CyberAware ✨</div>
          </div>

          <NavLink to="/" className={({ isActive }) => (isActive ? "link active" : "link")}>
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            About
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/modules"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Modules
          </NavLink>
        </div>

        <div className="navRight" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {profile?.name ? (
            <div className="profileChip">
              <span className="chipEmoji">{avatarEmoji[profile.avatar] || "🙂"}</span>
              <span>Hi, {profile.name}</span>
            </div>
          ) : (
            <div className="profileChip muted">No profile yet</div>
          )}

          {session ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "link active" : "link")}
            >
              Login
            </NavLink>
          )}
        </div>
      </nav>

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/modules" element={<Modules />} />
          <Route path="/modules/phishing" element={<ModulePhishing />} />
        </Routes>
      </div>
    </div>
  );
}
