import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  //Outlet -> Renderiza la ruta hija ej: Dashboard
  return <Outlet />;
};
