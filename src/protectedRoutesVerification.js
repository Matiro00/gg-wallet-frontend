import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export const ProtectedRoutesVerification = () => {
  const { user, loading } = useAuth();
  
  if (loading) return <h1>Loading...</h1>;
  if (!user && !loading) return <Navigate to="/" replace />;
  return <Outlet />;
};