import { createBrowserRouter } from "react-router";
import { Link } from "react-router";
import { SiteLayout } from "./components/SiteLayout";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { DesignSystem } from "./components/DesignSystem";
import { PrivacyPolicy } from "./components/legal/PrivacyPolicy";
import { CookiePolicy } from "./components/legal/CookiePolicy";
import { TermsAndConditions } from "./components/legal/TermsAndConditions";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1f29] text-white px-4">
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <p className="text-lg text-white/70 mb-8">Pagina nu a fost găsită</p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#d30052] hover:bg-[#b8004a] text-white text-sm font-semibold rounded transition-colors"
      >
        Înapoi acasă
      </Link>
    </div>
  );
}

const devRoutes = import.meta.env.DEV
  ? [{ path: "/design-system", Component: DesignSystem }]
  : [];

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SiteLayout,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/politica-de-confidentialitate",
    Component: PrivacyPolicy,
  },
  {
    path: "/cookies",
    Component: CookiePolicy,
  },
  {
    path: "/termeni-si-conditii",
    Component: TermsAndConditions,
  },
  ...devRoutes,
  {
    path: "*",
    Component: NotFound,
  },
]);
