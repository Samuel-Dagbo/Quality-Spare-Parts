import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import ProductCard from "../components/ProductCard";
import { api } from "../lib/api";
import { sampleProducts } from "../data/mock";

export default function Catalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .getProducts("?limit=12")
      .then((data) => setProducts(data.data))
      .catch(() => setProducts(sampleProducts));
  }, []);

  return (
    <div className="space-y-8">
      <Topbar title="Storefront" subtitle="E-commerce catalog" />

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-ink-200/70">Filters</p>
            <h2 className="text-xl font-semibold text-white">Curated Parts</h2>
          </div>
          <div className="flex gap-3 text-xs text-ink-200/70">
            <span className="rounded-full bg-white/10 px-3 py-1">All</span>
            <span className="rounded-full bg-white/5 px-3 py-1">Engine</span>
            <span className="rounded-full bg-white/5 px-3 py-1">Braking</span>
            <span className="rounded-full bg-white/5 px-3 py-1">Suspension</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product._id || product.id}
            product={{
              name: product.name,
              sku: product.sku,
              price: product.price,
              category: product.category?.name || product.category || "General",
              brand: product.brand?.name || product.brand || "House",
              image: product.images?.[0]
            }}
          />
        ))}
      </div>
    </div>
  );
}
