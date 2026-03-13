import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Badge from "../components/Badge";
import { api } from "../lib/api";

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
    phone: ""
  });

  const loadData = async () => {
    const data = await api.getUsers();
    setUsers(data.data || []);
  };

  useEffect(() => {
    loadData().catch(() => setStatus("Failed to load users"));
  }, []);

  const handleRoleChange = async (userId, role) => {
    setStatus("");
    try {
      await api.updateUserRole(userId, { role });
      await loadData();
    } catch (err) {
      setStatus(err.message || "Failed to update role");
    }
  };

  const handleStatusChange = async (userId, isActive) => {
    setStatus("");
    try {
      await api.updateUserStatus(userId, { isActive });
      await loadData();
    } catch (err) {
      setStatus(err.message || "Failed to update status");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      await api.createUser(form);
      setForm({ name: "", email: "", password: "", role: "staff", phone: "" });
      await loadData();
      setStatus("User created");
    } catch (err) {
      setStatus(err.message || "Failed to create user");
    }
  };

  return (
    <div className="space-y-8">
      <Topbar title="Users" subtitle="Admin control" />

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">Create user</h2>
        <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={handleCreate}>
          <input
            className="rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-3 text-sm text-white"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
          />
          <input
            className="rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-3 text-sm text-white"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
          />
          <input
            className="rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-3 text-sm text-white"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          />
          <select
            className="rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-3 text-sm text-white"
            value={form.role}
            onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="customer">Customer</option>
          </select>
          <input
            className="rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-3 text-sm text-white md:col-span-2"
            placeholder="Temporary password"
            type="password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            required
          />
          <div className="md:col-span-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-2xl bg-ember-500 px-4 py-2 text-sm font-semibold text-ink-950 hover:bg-ember-400"
            >
              Create user
            </button>
            <p className="text-xs text-ink-200/70">They can reset password after first login.</p>
          </div>
        </form>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">User directory</h2>
          <Badge text={`${users.length} users`} />
        </div>
        {status ? <p className="mt-3 text-xs text-ink-200/70">{status}</p> : null}
        <div className="mt-4 space-y-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-ink-900/70 p-4"
            >
              <div>
                <p className="text-white font-semibold">{user.name}</p>
                <p className="text-xs text-ink-200/70">{user.email}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <select
                  className="rounded-2xl border border-white/10 bg-ink-900/80 px-3 py-2 text-white"
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="customer">Customer</option>
                </select>
                <button
                  className="rounded-2xl border border-white/10 px-3 py-2 text-xs hover:bg-white/10"
                  onClick={() => handleStatusChange(user._id, !user.isActive)}
                >
                  {user.isActive ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
