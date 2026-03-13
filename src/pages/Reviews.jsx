import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import { Star, User, Calendar } from "lucide-react";

export default function Reviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ product: "", rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadReviews();
    loadProducts();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await api.getReviews("?limit=50&approved=true");
      setReviews(data.docs || data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await api.getProducts("?limit=20");
      setProducts(data.data || []);
    } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !formData.product || !formData.comment) return;

    setSubmitting(true);
    try {
      await api.createReview(formData);
      setFormData({ product: "", rating: 5, comment: "" });
      loadReviews();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center">
        <div className="text-ink-200">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100 relative overflow-hidden">
      <PublicNavbar />
      <main className="relative z-10 px-6 py-12 lg:py-20">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-wider text-ink-200/70">Customer Reviews</p>
            <h1 className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-white to-ink-200 bg-clip-text text-transparent">
              Real feedback from buyers
            </h1>
          </div>

          {user && (
            <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-ink-900/50 p-8">
              <h2 className="text-2xl font-semibold mb-6">Leave a review</h2>
              <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium mb-2 text-ink-200">Product</label>
                  <select
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-ink-900/50 px-4 py-3 text-white focus:outline-none focus:border-aqua-400"
                    required
                  >
                    <option value="">Select product</option>
                    {products.map((p) => (
                      <option key={p._id} value={p._id}>{p.name} ({p.sku})</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`p-2 rounded-lg transition ${
                        formData.rating >= star
                          ? "text-sun-400 bg-sun-400/20"
                          : "text-ink-600 hover:text-sun-400"
                      }`}
                      onClick={() => setFormData({ ...formData, rating: star })}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-ink-200">Comment</label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-ink-900/50 px-4 py-3 text-white focus:outline-none focus:border-aqua-400 resize-vertical"
                    rows="4"
                    placeholder="Share your experience..."
                    required
                  />
                </div>
                <Button
                  label={submitting ? "Submitting..." : "Post Review"}
                  className="w-full max-w-md"
                  disabled={submitting || !formData.product || !formData.comment}
                />
              </form>
            </section>
          )}

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-ink-200/70">Approved Reviews ({reviews.length})</p>
              </div>
            </div>
            {reviews.length === 0 ? (
              <div className="text-center py-20 rounded-3xl border-2 border-dashed border-white/10">
                <p className="text-ink-400 mb-2">No reviews yet</p>
                <p className="text-sm text-ink-500">Be the first to share your experience</p>
                {!user && (
                  <Link to="/login" className="mt-4 inline-block text-ember-400 hover:text-ember-300">
                    Sign in to review
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review) => (
                  <div key={review._id} className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={i < review.rating ? "text-sun-400 fill-sun-400" : "text-ink-600"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-ink-100 mb-4 leading-relaxed">"{review.comment}"</p>
                    <div className="flex items-center gap-3 text-xs text-ink-400">
                      <div className="flex items-center gap-2">
                        <User size={14} />
                        <span>{review.user?.name || "Anonymous"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {review.product && (
                      <p className="text-xs text-ember-400 mt-2">
                        {review.product.name}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
