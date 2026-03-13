import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PublicNavbar from "../components/PublicNavbar";
import Button from "../components/Button";
import StoreProductCard from "../components/StoreProductCard";
import { api } from "../lib/api";
import { heroImages } from "../data/marketing";
import { Star, User } from "lucide-react";

const roleHome = (role) => {
  if (role === "admin") return "/admin";
  if (role === "staff") return "/staff";
  return "/customer";
};

export default function Home() {
  const { user } = useAuth();
  const [featured, setFeatured] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);
  const [loadingHighlights, setLoadingHighlights] = useState(true);

  useEffect(() => {
    api
      .getProducts("?limit=6")
      .then((data) => setFeatured(data.data || []))
      .catch(() => setFeatured([]));

    api
      .getStoreHighlights()
      .then((payload) => {
        setBestSellers(payload.data?.bestSellers || []);
        setNewArrivals(payload.data?.newArrivals || []);
      })
      .catch(() => {
        setBestSellers([]);
        setNewArrivals([]);
      })
      .finally(() => setLoadingHighlights(false));

    api
      .getReviews("?limit=3&approved=true")
      .then((data) => setRecentReviews(data.docs || data.data || []))
      .catch(() => setRecentReviews([]));
  }, []);

  if (user) {
    return <Navigate to={roleHome(user.role)} replace />;
  }

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.25),_transparent_55%),radial-gradient(circle_at_30%_40%,_rgba(250,204,21,0.22),_transparent_45%),radial-gradient(circle_at_80%_20%,_rgba(249,115,22,0.25),_transparent_45%)]"></div>
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-aqua-400/20 blur-3xl animate-floaty"></div>
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-ember-500/30 blur-3xl animate-floaty"></div>

      <main className="relative z-10 px-6 py-12">
        <div className="mx-auto max-w-6xl space-y-20">
          <PublicNavbar />

          <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-ink-200/70">Auto parts marketplace</p>
              <h1 className="text-4xl md:text-6xl font-semibold text-white">
                Buy spare parts fast. <span className="text-gradient">Delivered in Accra & beyond.</span>
              </h1>
              <p className="text-base text-ink-200/70">
                Search by part name or SKU, see real-time stock, and order in minutes.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/shop">
                  <Button label="Shop now" />
                </Link>
                <Link to="/signup">
                  <Button label="Create account" variant="ghost" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-ink-200/70">
                <span className="rounded-full border border-white/10 px-3 py-1">Live stock visibility</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Verified suppliers</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Pay on delivery</span>
              </div>
            </div>
            <div className="grid gap-4">
              {heroImages.map((src) => (
                <img key={src} src={src} alt="Spare parts" className="h-40 w-full rounded-3xl object-cover" />
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-ink-200/70">Featured parts</p>
                <h2 className="text-2xl font-semibold text-white">Top selling spare parts</h2>
              </div>
              <Link to="/shop" className="text-sm text-ember-400">Browse all</Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {featured.map((product) => (
                <Link key={product._id} to={`/product/${product._id}`}>
                  <StoreProductCard product={product} />
                </Link>
              ))}
            </div>
            {featured.length === 0 ? (
              <p className="text-sm text-ink-200/70">No products loaded yet.</p>
            ) : null}
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-ink-200/70">Based on live orders & sales</p>
                <h2 className="text-2xl font-semibold text-white">Best Sellers</h2>
              </div>
              <Link to="/shop" className="text-sm text-ember-400">View all</Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {bestSellers.map((item, idx) => {
                const product = item.product || item;
                return (
                  <div key={product._id || idx} className="relative">
                    <span className="absolute left-4 top-4 rounded-full bg-sun-400 text-ink-900 px-3 py-1 text-xs font-semibold shadow-lg shadow-sun-500/30">
                      Sold {item.qtySold}+ 
                    </span>
                    <Link to={`/product/${product._id}`}>
                      <StoreProductCard product={product} />
                    </Link>
                  </div>
                );
              })}
            </div>
            {!loadingHighlights && bestSellers.length === 0 ? (
              <p className="text-sm text-ink-200/70">Sales data is still warming up—check back soon.</p>
            ) : null}
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-ink-200/70">Fresh stock just added</p>
                <h2 className="text-2xl font-semibold text-white">New Arrivals</h2>
              </div>
              <Link to="/shop?sort=newest" className="text-sm text-ember-400">See what's new</Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {newArrivals.map((product) => (
                <Link key={product._id} to={`/product/${product._id}`}>
                  <StoreProductCard product={product} />
                </Link>
              ))}
            </div>
            {!loadingHighlights && newArrivals.length === 0 ? (
              <p className="text-sm text-ink-200/70">New arrivals will appear as soon as products are added.</p>
            ) : null}
          </section>

          <section id="features" className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Real-time availability",
                body: "Only list parts that are actually in stock.",
                accent: "from-ember-500/40 to-sun-400/10"
              },
              {
                title: "Instant checkout",
                body: "Fast cart experience with clear delivery options.",
                accent: "from-aqua-500/40 to-ember-500/10"
              },
              {
                title: "Trusted sourcing",
                body: "Built-in supplier management keeps quality high.",
                accent: "from-sun-500/40 to-aqua-500/10"
              }
            ].map((item) => (
              <div key={item.title} className={`rounded-3xl border border-white/10 bg-gradient-to-br ${item.accent} p-6`}> 
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-ink-200/80">{item.body}</p>
              </div>
            ))}
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-ink-200/70">Customer Reviews</p>
                <h2 className="text-2xl font-semibold text-white">Trusted by workshops and fleets</h2>
              </div>
              <Link to="/reviews" className="text-xs text-ember-400">View all reviews</Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {recentReviews.length > 0 ? (
                recentReviews.map((review) => (
                  <div key={review._id} className="rounded-3xl border border-white/10 bg-ink-900/70 p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < review.rating ? "text-sun-400 fill-sun-400" : "text-ink-600"} />
                        ))}
                      </div>
                      <p className="text-sm text-ink-100 italic">“{review.comment}”</p>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-xs text-ink-200/70">
                      <User size={14} />
                      <span className="font-semibold text-white">{review.user?.name || "Customer"}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-ink-200/70 col-span-3 text-center py-8">Reviews coming soon...</p>
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-ink-900/90 to-ink-800/70 p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Ready to order parts today?</h2>
                <p className="text-sm text-ink-200/70">Shop in seconds and track delivery.</p>
              </div>
              <Link to="/shop">
                <Button label="Start shopping" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
