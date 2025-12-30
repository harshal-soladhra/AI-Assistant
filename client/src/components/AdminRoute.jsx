import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/auth";

const AdminRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (!user || user.isAdmin !== true) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
