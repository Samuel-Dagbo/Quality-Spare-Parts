import Button from "./Button";
import { formatCedis } from "../lib/currency";
import { useCart } from "../context/CartContext";
import { getFallbackImage } from "../data/shopImages";

export default function StoreProductCard({ product }) {
  const { addItem } = useCart();
  const image = product.images?.[0] || getFallbackImage(product.name?.length || 0);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 hover:border-white/20 transition">
      <div className="h-44 w-full overflow-hidden rounded-2xl bg-ink-900/70">
        <img src={image} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-lg text-white font-semibold">{product.name}</p>
          <p className="text-xs text-ink-200/70">Part No: {product.partNumber || product.sku}</p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
          {product.category?.name || "General"}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-ink-200/70">{product.brand?.name || "House"}</p>
          <p className="text-xl font-semibold text-white">{formatCedis(product.price || 0)}</p>
        </div>
        <Button
          label="Add to cart"
          onClick={() =>
            addItem({
              id: product._id,
              name: product.name,
              price: product.price || 0,
              image,
              sku: product.partNumber || product.sku
            })
          }
        />
      </div>
    </div>
  );
}
