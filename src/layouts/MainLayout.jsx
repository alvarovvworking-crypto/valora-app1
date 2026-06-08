import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, Calculator, FileText, Settings, User } from 'lucide-react';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-[#080808] text-white font-inter">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0f0f0f] border-r border-[#222222] flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-syne font-bold text-white">V</div>
          <span className="font-syne font-bold text-xl tracking-tight">VALORA</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem to="/" icon={<LayoutDashboard size={20}/>} label="Dashboard" />
          <NavItem to="/calculator" icon={<Calculator size={20}/>} label="Calculadora" />
          <NavItem to="/projects" icon={<FileText size={20}/>} label="Presupuestos" />
          <NavItem to="/settings" icon={<Settings size={20}/>} label="Configuración" />
        </nav>

        <div className="p-4 border-t border-[#222222]">
          <div className="flex items-center gap-3 p-2 hover:bg-[#161616] rounded-lg cursor-pointer transition-all">
            <div className="w-8 h-8 bg-purple-900/30 border border-purple-500/50 rounded-full flex items-center justify-center text-purple-400"><User size={16}/></div>
            <span className="text-sm font-medium">Mi Cuenta</span>
          </div>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

const NavItem = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-[#161616] hover:text-purple-400 transition-all text-sm font-medium">
    {icon} {label}
  </Link>
);

export default MainLayout;
