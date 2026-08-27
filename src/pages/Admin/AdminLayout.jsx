import React, { useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { isAdminLoggedIn, clearAdminSecret } from "../../lib/adminAuth";
import Sidebar from "./components/Sidebar";
import { MobileTopBar, BottomTabBar, MobileDrawer } from "./components/MobileNav";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  const handleLogout = () => {
    clearAdminSecret();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed((c) => !c)} onLogout={handleLogout} />
      <MobileTopBar onOpenDrawer={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onLogout={handleLogout} />

      <main
        className={`transition-all duration-200 pt-14 pb-20 md:pt-0 md:pb-0 ${
          collapsed ? "md:ml-[72px]" : "md:ml-60"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">
          <Outlet />
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
}