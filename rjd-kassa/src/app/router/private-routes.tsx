import { Navigate, Outlet } from "react-router-dom";
import { routes } from "@/constants/routes.ts";


export const PrivateRoutes = () => {
  const isLoggedIn = false;

  return isLoggedIn ? <Outlet /> : <Navigate to={routes.login} />;
};
