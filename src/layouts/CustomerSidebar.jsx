import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, ReceiptText } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/customer", label: "Home", icon: LayoutDashboard },
  { to: "/customer/shop", label: "Shop", icon: Package },
  { to: "/customer/cart", label: "Cart", icon: ShoppingCart },
  { to: "/customer/orders", label: "Orders", icon: ReceiptText }
];

export default function CustomerSidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-ink-900/80 border-r border-white/10 px-6 py-8 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-aqua-500 via-sun-500 to-ember-500 flex items-center justify-center shadow-card">
          <span className="font-mono text-ink-950 text-sm">CS</span>
        </div>
        <div>
          <p className="text-lg font-semibold">Customer Portal</p>
          <p className="text-xs text-ink-200/70">Shop parts</p>
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
        <p className="text-sm">{user?.name || "Customer"}</p>
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
