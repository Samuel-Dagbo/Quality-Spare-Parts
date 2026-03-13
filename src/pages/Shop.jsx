import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import StoreProductCard from "../components/StoreProductCard";
import { api } from "../lib/api";

export default function Shop({ embedded = false }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const loadData = async () => {
    const [productData, categoryData, brandData] = await Promise.all([
      api.getProducts("?limit=24"),
      api.getCategories(),
      api.getBrands()
    ]);
    setProducts(productData.data || []);
    setCategories(categoryData.data || []);
    setBrands(brandData.data || []);
  };

  useEffect(() => {
    loadData().catch(() => setProducts([]));
  }, []);

  const filtered = products.filter((product) => {
    const matchesQuery = query
      ? product.name?.toLowerCase().includes(query.toLowerCase()) ||
        product.sku?.toLowerCase().includes(query.toLowerCase())
      : true;
    const matchesCategory = category ? product.category?._id === category : true;
    const matchesBrand = brand ? product.brand?._id === brand : true;
    return matchesQuery && matchesCategory && matchesBrand;
  });

  const content = (
    <div className="space-y-12">
      {!embedded ? <PublicNavbar /> : null}

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-ink-200/70">Shop spare parts</p>
            <h1 className="text-3xl font-semibold text-white">Find the exact part in seconds</h1>
          </div>
          {!embedded ? (
            <Link
              to="/signup"
              className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-ink-200/80"
            >
              Create account
            </Link>
          ) : null}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-[1.5fr_1fr_1fr]">
          <input
            className="rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-3 text-white placeholder:text-ink-200/40"
            placeholder="Search by part name or SKU"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-3 text-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            className="rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-3 text-white"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="">All brands</option>
            {brands.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((product) => (
          <Link key={product._id} to={`/product/${product._id}`}>
            <StoreProductCard product={product} />
          </Link>
        ))}
      </section>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.2),_transparent_55%),radial-gradient(circle_at_30%_40%,_rgba(250,204,21,0.2),_transparent_45%),radial-gradient(circle_at_80%_20%,_rgba(249,115,22,0.2),_transparent_45%)]"></div>
      <main className="relative z-10 px-6 py-12">
        <div className="mx-auto max-w-6xl">{content}</div>
      </main>
    </div>
  );
}
