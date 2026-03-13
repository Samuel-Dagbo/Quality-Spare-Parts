import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import Button from "../components/Button";
import { api } from "../lib/api";
import { formatCedis } from "../lib/currency";
import { useCart } from "../context/CartContext";
import { getFallbackImage } from "../data/shopImages";

export default function ProductDetails() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api
      .getProduct(id)
      .then((data) => setProduct(data.data))
      .catch(() => setProduct(null));
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-ink-950 text-ink-100 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <PublicNavbar />
          <p className="mt-12 text-sm text-ink-200/70">Loading product...</p>
        </div>
      </div>
    );
  }

  const mainImage = product.images?.[0] || getFallbackImage(product.name?.length || 0);

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.2),_transparent_55%),radial-gradient(circle_at_30%_40%,_rgba(250,204,21,0.2),_transparent_45%),radial-gradient(circle_at_80%_20%,_rgba(249,115,22,0.2),_transparent_45%)]"></div>
      <main className="relative z-10 px-6 py-12">
        <div className="mx-auto max-w-5xl space-y-10">
          <PublicNavbar />

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="h-80 w-full overflow-hidden rounded-2xl bg-ink-900/70">
                <img src={mainImage} alt={product.name} className="h-full w-full object-cover" />
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[mainImage, ...(product.images || [])].slice(0, 3).map((img) => (
                  <img key={img} src={img} alt="thumbnail" className="h-20 w-full rounded-2xl object-cover" />
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
              <p className="text-xs text-ink-200/70">{product.category?.name || "Category"}</p>
              <h1 className="text-3xl font-semibold text-white">{product.name}</h1>
              <p className="text-sm text-ink-200/70">Part No: {product.partNumber || product.sku}</p>
              <p className="text-2xl font-semibold text-white">{formatCedis(product.price || 0)}</p>
              <p className="text-sm text-ink-200/70">{product.description || "No description yet."}</p>

              <div className="flex flex-wrap gap-3">
                <Button
                  label="Add to cart"
                  onClick={() =>
                    addItem({
                      id: product._id,
                      name: product.name,
                      price: product.price || 0,
                      image: mainImage,
                      sku: product.partNumber || product.sku
                    })
                  }
                />
                <Link to="/cart" className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-ink-200/80">
                  View cart
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-ink-900/70 p-4 text-sm text-ink-200/70">
                Stock: {product.stockQty} • Brand: {product.brand?.name || "House"}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
