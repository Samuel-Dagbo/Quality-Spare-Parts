import Topbar from "../components/Topbar";
import Button from "../components/Button";
import { useCart } from "../context/CartContext";
import { formatCedis } from "../lib/currency";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, subtotal, updateItem, removeItem, clearCart } = useCart();

  return (
    <div className="space-y-8">
      <Topbar title="Cart" subtitle="Customer checkout" />

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
        {items.length === 0 ? (
          <p className="text-ink-200/70">Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4 p-4 border border-white/10 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-xl bg-ink-900/50 overflow-hidden flex-shrink-0">
                  {item.image && <img src={item.image} alt={item.name} className="h-full w-full object-cover" />}
                </div>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-ink-200/70">SKU: {item.sku || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  className="w-16 rounded-xl border border-white/10 bg-ink-900/50 px-2 py-1 text-sm"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, parseInt(e.target.value) || 1)}
                />
                <span className="font-semibold">{formatCedis(item.price * item.quantity)}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-rose-400 hover:text-rose-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
        <div className="border-t border-white/10 pt-6 flex items-center justify-between">
          <p className="text-sm text-ink-200/70">Subtotal</p>
          <p className="text-2xl font-bold">{formatCedis(subtotal)}</p>
        </div>
        <div className="flex gap-3 pt-4">
          <button
            onClick={clearCart}
            className="flex-1 rounded-xl border border-white/10 px-6 py-3 text-sm font-medium bg-ink-900/50 hover:bg-ink-900"
          >
            Clear Cart
          </button>
          <Link to="/checkout">
            <Button label="Proceed to Checkout" />
          </Link>
        </div>
      </div>
    </div>
  );
}
