import { Navigate } from "react-router-dom";
import { useSessionContext } from "../../hooks/useSessionContext";

export const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useSessionContext();
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
};
