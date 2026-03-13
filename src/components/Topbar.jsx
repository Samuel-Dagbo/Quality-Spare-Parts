import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Topbar({ title, subtitle }) {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex flex-col">
        <h2 className="text-lg font-bold text-white tracking-tight">{title || "SpareParts"}</h2>
        {subtitle && <p className="text-xs text-ink-400">{subtitle}</p>}
      </div>
      <div className="text-xs font-medium text-ink-300 bg-ink-800 px-2 py-1 rounded border border-ink-700">
        {user?.role?.toUpperCase()}
      </div>
    </div>
  );
}