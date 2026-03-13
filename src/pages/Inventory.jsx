import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { api } from "../lib/api";
import { sampleProducts } from "../data/mock";

export default function Inventory() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .getProducts("?limit=8")
      .then((data) => setProducts(data.data))
      .catch(() => setProducts(sampleProducts));
  }, []);

  return (
    <div className="space-y-8">
      <Topbar title="Inventory" subtitle="Warehouse intelligence" />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-ink-200/70">Stock accuracy</p>
          <h2 className="text-2xl font-semibold text-white">Live SKU overview</h2>
        </div>
        <Button label="New Item" />
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <div className="grid grid-cols-5 gap-4 border-b border-white/10 px-6 py-4 text-xs uppercase tracking-[0.2em] text-ink-200/60">
          <span>Product</span>
          <span>Category</span>
          <span>Brand</span>
          <span>Stock</span>
          <span>Price</span>
        </div>
        <div className="divide-y divide-white/5">
          {products.map((product) => (
            <div key={product._id || product.id} className="grid grid-cols-5 gap-4 px-6 py-4">
              <div>
                <p className="text-white font-semibold">{product.name}</p>
                <p className="text-xs text-ink-200/70">SKU: {product.sku}</p>
              </div>
              <p className="text-sm text-ink-200/80">
                {product.category?.name || product.category}
              </p>
              <p className="text-sm text-ink-200/80">{product.brand?.name || product.brand}</p>
              <div>
                {product.stockQty <= 10 || product.stock <= 10 ? (
                  <Badge text="Low" tone="warn" />
                ) : (
                  <Badge text="Healthy" tone="success" />
                )}
              </div>
              <p className="text-sm text-white font-semibold">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
