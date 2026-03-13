import { Search, Bell, UserCircle2, LogOut, Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Topbar({ title, subtitle }) {
  const { user, logout } = useAuth();

  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between pr-4 lg:pr-0">
      <div className="flex items-center gap-4 flex-1">
        <button className="lg:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20">
          <Menu size={20} />
        </button>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-ink-200/70">{subtitle}</p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white">{title}</h1>
          <div className="mt-1 h-1 w-16 sm:w-20 rounded-full bg-gradient-to-r from-aqua-500 via-sun-500 to-ember-500"></div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <label className="flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 border border-white/10">
          <Search size={16} className="text-ink-200/70" />
          <input
            className="bg-transparent text-sm text-white placeholder:text-ink-200/40 focus:outline-none"
            placeholder="Search inventory, orders, SKU"
          />
        </label>
        <div className="flex items-center gap-3">
          <button className="rounded-2xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition" type="button">
            <Bell size={18} />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 min-w-[150px]">
              <UserCircle2 size={18} />
              <span className="text-sm truncate max-w-[110px]">{user?.name || "Account"}</span>
            </div>
            <button
              className="flex items-center gap-2 rounded-2xl bg-ember-500 px-3 py-2 text-xs font-semibold text-ink-950 hover:bg-ember-400 transition"
              onClick={logout}
              type="button"
              title="Logout"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
