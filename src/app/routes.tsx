import { createBrowserRouter } from "react-router";
import { SiteLayout } from "./components/SiteLayout";
import { AdminDashboard } from "./components/admin/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SiteLayout,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
]);
