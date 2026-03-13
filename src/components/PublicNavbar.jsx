import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import Button from "./Button";
import { useCart } from "../context/CartContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ink-950/80 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-ember-500 via-sun-400 to-aqua-400 flex items-center justify-center shadow-card">
            <span className="font-mono text-ink-950 text-sm">SP</span>
          </div>
          <div>
            <p className="text-lg font-semibold text-white">SpareParts Nexus</p>
            <p className="text-xs text-ink-200/70">Inventory + Commerce</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-ink-200/70">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-white transition">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="p-2 text-ink-200 hover:text-white rounded-xl hover:bg-white/10 transition relative">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-ember-500 text-[10px] font-bold text-ink-950">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button label="Sign in" variant="ghost" />
          </Link>
          <Link to="/signup">
            <Button label="Get started" />
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-ink-200 hover:text-white rounded-xl hover:bg-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-ink-950 px-6 py-6 shadow-2xl">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-ink-200/70 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/10">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button label="Sign in" variant="ghost" className="w-full justify-center" />
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                <Button label="Get started" className="w-full justify-center" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
