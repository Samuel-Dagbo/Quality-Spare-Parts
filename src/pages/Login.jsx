import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";
import PublicNavbar from "../components/PublicNavbar";

const roleHome = (role) => {
  if (role === "admin") return "/admin";
  if (role === "staff") return "/staff";
  return "/customer";
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login({ email, password });
      const redirect = location.state?.from?.pathname || roleHome(user.role);
      navigate(redirect);
    } catch (err) {
      setError(err.message || "Login failed");
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
            <div className="space-y-6 rounded-3xl border border-white/10 bg-gradient-to-br from-aqua-500/15 via-ink-900/70 to-ink-900 p-8 shadow-card">
              <p className="text-xs uppercase tracking-[0.25em] text-ink-200/70">Account access</p>
              <h1 className="text-4xl font-semibold text-white leading-tight">
                Welcome back to <span className="text-gradient">SpareParts Hub</span>
              </h1>
              <p className="text-sm text-ink-200/70">
                Manage inventory, fulfil orders, or keep shopping — all from one account.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-ink-200/70">
                <span className="rounded-full border border-white/10 px-3 py-1">Single sign-on for all roles</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Secure JWT sessions</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Pay-on-delivery friendly</span>
              </div>
            </div>

            <form className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-4 shadow-card" onSubmit={handleSubmit}>
              <div>
                <p className="text-sm text-ink-200/70">Sign in</p>
                <h2 className="text-2xl font-semibold text-white">Enter your credentials</h2>
              </div>
              <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error ? <p className="text-sm text-ember-400">{error}</p> : null}
              <Button label={loading ? "Signing in..." : "Sign in"} type="submit" />
              <p className="text-xs text-ink-200/70">
                New here? <Link to="/signup" className="text-ember-400">Create an account</Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
