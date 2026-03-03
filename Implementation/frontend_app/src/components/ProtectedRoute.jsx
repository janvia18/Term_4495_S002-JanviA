import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ session, authReady, children }) {
  const location = useLocation();

  const saved = localStorage.getItem("profile");
  const hasProfile = !!(saved && JSON.parse(saved)?.name);

  if (!authReady) return <div className="cardWide">Checking access...</div>;
  if (session || hasProfile) return children;
  return <Navigate to="/login" replace state={{ from: location }} />;
}