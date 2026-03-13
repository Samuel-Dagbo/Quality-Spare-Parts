﻿import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({ label, type = "text", ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <label className="flex flex-col gap-2 text-sm text-ink-200/80">
      {label}
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className="w-full rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-2 text-white placeholder:text-ink-200/40 focus:outline-none focus:ring-2 focus:ring-steel-400/60 pr-10"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </label>
  );
}
