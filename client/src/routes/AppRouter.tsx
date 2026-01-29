import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { PrivateRoute } from "./PrivateRoute";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { VehiclesPage } from "../pages/VehiclesPage";
import { VehicleDetailPage } from "../pages/VehicleDetailPage";

export const AppRouter = () => {
  return (
    <Routes>
      {/* Publicas */}
      <Route path="/login" element={<LoginPage />} />

      {/* Privadas */}
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
        </Route>
      </Route>

      {/* Redirecciones */}
      {/* Si alguien entra a la raiz "/" redirigirlo a dashboard o login*/}
      <Route path="/" element={<Navigate to="/dashboard" />} />
      {/* Ruta comodín */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
