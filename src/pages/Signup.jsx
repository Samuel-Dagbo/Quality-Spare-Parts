import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";
import PublicNavbar from "../components/PublicNavbar";

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
      const redirect = location.state?.from?.pathname || "/customer";
      navigate(redirect);
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.2),_transparent_55%),radial-gradient(circle_at_30%_40%,_rgba(250,204,21,0.2),_transparent_45%),radial-gradient(circle_at_80%_20%,_rgba(249,115,22,0.2),_transparent_45%)]"></div>
      <main className="relative z-10 px-6 py-12">
        <div className="mx-auto max-w-4xl space-y-10">
          <PublicNavbar />
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div className="space-y-6 rounded-3xl border border-white/10 bg-gradient-to-br from-ember-500/10 via-ink-900/70 to-ink-900 p-8 shadow-card">
              <p className="text-xs uppercase tracking-[0.25em] text-ink-200/70">Create account</p>
              <h1 className="text-4xl font-semibold text-white leading-tight">
                Join the <span className="text-gradient">SpareParts</span> marketplace
              </h1>
              <p className="text-sm text-ink-200/70">
                One login for shopping, tracking deliveries, and managing your carts.
              </p>
              <div className="grid gap-3 text-sm text-ink-200/80">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Live stock visibility</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Order tracking & updates</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Saved carts and history</div>
              </div>
            </div>

            <form className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-4 shadow-card" onSubmit={handleSubmit}>
              <div>
                <p className="text-sm text-ink-200/70">Step 1</p>
                <h2 className="text-2xl font-semibold text-white">Create your login</h2>
              </div>
              <Input label="Full name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
              <Input label="Email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
              <Input
                label="Password"
                type="password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <Input label="Phone (optional)" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
              {error ? <p className="text-sm text-ember-400">{error}</p> : null}
              <Button label={loading ? "Creating..." : "Create account"} type="submit" />
              <p className="text-xs text-ink-200/70">
                Already have an account? <Link to="/login" className="text-ember-400">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
