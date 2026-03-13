﻿import { NavLink } from "react-router-dom";
import { LayoutDashboard, Warehouse, ShoppingCart, Boxes, Users, ClipboardList, Shield, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Boxes },
  { to: "/admin/categories", label: "Categories", icon: ClipboardList },
  { to: "/admin/brands", label: "Brands", icon: ClipboardList },
  { to: "/admin/suppliers", label: "Suppliers", icon: ClipboardList },
  { to: "/admin/inventory", label: "Adjustments", icon: Warehouse },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { to: "/admin/users", label: "Users", icon: Shield }
];

export default function AdminSidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-ink-900/95 border-r border-white/10 backdrop-blur-xl lg:translate-x-0 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-ember-500 to-steel-400 flex items-center justify-center shadow-card">
            <span className="font-mono text-ink-950 text-sm">SP</span>
          </div>
          <div>
            <p className="text-lg font-semibold">Admin Console</p>
            <p className="text-xs text-ink-200/70">Inventory + Commerce</p>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden text-ink-400 hover:text-white"><X size={20} /></button>
      </div>

      <nav className="mt-10 flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
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
        <p className="text-sm">{user?.name || "Admin"}</p>
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
