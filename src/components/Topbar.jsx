import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Topbar({ title, subtitle, onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="p-1 -ml-1 text-ink-200 hover:text-white lg:hidden">
          <Menu size={24} />
        </button>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-white tracking-tight">{title || "SpareParts"}</h2>
          {subtitle && <p className="text-xs text-ink-400">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-xs font-medium text-ink-300 bg-ink-800 px-2 py-1 rounded border border-ink-700">
          {user?.role?.toUpperCase()}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20 transition-colors"
        >
          <LogOut size={14} />
          Log Out
        </button>
      </div>
    </div>
  );
}