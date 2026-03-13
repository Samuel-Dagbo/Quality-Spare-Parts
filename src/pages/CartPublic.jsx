import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import Button from "../components/Button";
import { useCart } from "../context/CartContext";
import { formatCedis } from "../lib/currency";
import { useAuth } from "../context/AuthContext";

export default function CartPublic() {
  const { items, subtotal, updateItem, removeItem, clearCart } = useCart();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.2),_transparent_55%),radial-gradient(circle_at_30%_40%,_rgba(250,204,21,0.2),_transparent_45%),radial-gradient(circle_at_80%_20%,_rgba(249,115,22,0.2),_transparent_45%)]"></div>
      <main className="relative z-10 px-6 py-12">
        <div className="mx-auto max-w-5xl space-y-10">
          <PublicNavbar />

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold text-white">Your cart</h1>
                <p className="text-sm text-ink-200/70">Review your selected parts.</p>
              </div>
              <button
                className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-ink-200/80"
                onClick={clearCart}
              >
                Clear cart
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-sm text-ink-200/70">
                  Your cart is empty. <Link to="/shop" className="text-ember-400">Browse parts</Link>.
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-ink-900/70 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-2xl bg-ink-900/60 overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        ) : null}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{item.name}</p>
                        <p className="text-xs text-ink-200/70">SKU: {item.sku}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min={1}
                        className="w-20 rounded-2xl border border-white/10 bg-ink-900/80 px-3 py-2 text-sm text-white"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, Number(e.target.value))}
                      />
                      <span className="text-sm text-white">{formatCedis(item.price * item.quantity)}</span>
                      <button
                        className="text-xs text-ember-400"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
              <p className="text-sm text-ink-200/70">Subtotal</p>
              <p className="text-2xl font-semibold text-white">{formatCedis(subtotal)}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/shop">
                <Button label="Continue shopping" variant="ghost" />
              </Link>
              {user ? (
                <Link to="/customer/checkout">
                  <Button label="Proceed to checkout" />
                </Link>
              ) : (
                <Link to="/login">
                  <Button label="Sign in to checkout" />
                </Link>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
