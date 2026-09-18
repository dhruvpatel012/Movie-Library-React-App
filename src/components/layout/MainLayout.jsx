import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080d10] text-white">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <main className="lg:ml-60">{children}</main>
    </div>
  );
}

export default MainLayout;
