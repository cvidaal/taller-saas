import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  return (
    <Routes>
      {/* Publicas */}
      <Route path="/login" element={<LoginPage />} />

      {/* Privadas */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>

      {/* Redirecciones */}
      {/* Si alguien entra a la raiz "/" redirigirlo a dashboard o login*/}
      <Route path="/" element={<Navigate to="/dashboard" />} />
      {/* Ruta comodín */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
