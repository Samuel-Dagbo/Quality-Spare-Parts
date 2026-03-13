﻿import { NavLink } from "react-router-dom";
import { LayoutDashboard, Warehouse, ShoppingCart, Boxes, ClipboardList, Receipt } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/staff", label: "Dashboard", icon: LayoutDashboard },
  { to: "/staff/pos", label: "POS", icon: Receipt },
  { to: "/staff/inventory", label: "Inventory", icon: Warehouse },
  { to: "/staff/products", label: "Products", icon: Boxes },
  { to: "/staff/orders", label: "Orders", icon: ShoppingCart },
  { to: "/staff/adjustments", label: "Adjustments", icon: ClipboardList }
];

export default function StaffSidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-ink-900/95 border-r border-white/10 backdrop-blur-xl lg:translate-x-0 transform -translate-x-full transition-transform duration-300 ease-in-out">
      <div className="flex items-center gap-3 p-6 border-b border-white/10">
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-aqua-500 via-sun-500 to-lime-500 flex items-center justify-center shadow-card">
          <span className="font-mono text-ink-950 text-sm">ST</span>
        </div>
        <div>
          <p className="text-lg font-semibold">Staff Hub</p>
          <p className="text-xs text-ink-200/70">Operations</p>
        </div>
      </div>

      <nav className="mt-10 flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition ${
                  isActive
                    ? "bg-white/10 text-white shadow-card"
                    : "text-ink-200/80 hover:bg-white/5"
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs text-ink-200/70">Signed in</p>
        <p className="text-sm">{user?.name || "Staff"}</p>
        <button
          className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-ink-200/80 hover:bg-white/10"
          onClick={logout}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
