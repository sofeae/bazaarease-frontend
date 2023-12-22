import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function RequireAuth({ children }) {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/login" replace />;
  } else if (user) {
    return <>{children}</>;
  }
}
