import { Navigate } from "react-router-dom";
import { useSessionContext } from "../../hooks/useSessionContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useSessionContext();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};
