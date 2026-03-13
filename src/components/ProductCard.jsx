import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 hover:border-white/20 transition">
      <div className="h-36 w-full overflow-hidden rounded-2xl bg-white/5 mb-4">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-xs text-ink-200/60">
            No image
          </div>
        )}
      </div>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-lg text-white font-semibold">{product.name}</p>
          <p className="text-xs text-ink-200/70">SKU: {product.sku}</p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{product.category}</span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-ink-200/70">{product.brand}</p>
          <p className="text-xl font-semibold text-white">${product.price}</p>
        </div>
        <button className="flex items-center gap-2 rounded-2xl bg-ember-500 px-4 py-2 text-sm font-semibold text-ink-950 hover:bg-ember-400 transition">
          <ShoppingCart size={16} />
          Add
        </button>
      </div>
    </div>
  );
}
