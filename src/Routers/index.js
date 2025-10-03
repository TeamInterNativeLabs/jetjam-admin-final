import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import AppRoutes from "./AppRoutes";

export default function AdminRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {
          AppRoutes.filter(item => !item.isProtected).map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))
        }
        {
          AppRoutes.filter(item => item.isProtected).map((item, index) => (
            <Route key={index} path={item.path} element={<ProtectedRoute>{item.element}</ProtectedRoute>} />
          ))
        }
      </Routes >
    </BrowserRouter>
  );
}