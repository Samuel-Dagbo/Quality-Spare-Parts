import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Button from "../components/Button";
import Input from "../components/Input";
import Badge from "../components/Badge";
import { api } from "../lib/api";

const emptyForm = { name: "", contactName: "", phone: "", email: "", address: "" };

export default function SuppliersAdmin() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  const loadData = async () => {
    const data = await api.getSuppliers();
    setSuppliers(data.data || []);
  };

  useEffect(() => {
    loadData().catch(() => setStatus("Failed to load suppliers"));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    try {
      if (editingId) {
        await api.updateSupplier(editingId, form);
        setStatus("Supplier updated");
      } else {
        await api.createSupplier(form);
        setStatus("Supplier created");
      }
      setForm(emptyForm);
      setEditingId(null);
      await loadData();
    } catch (err) {
      setStatus(err.message || "Failed to save supplier");
    }
  };

  const handleEdit = (supplier) => {
    setEditingId(supplier._id);
    setForm({
      name: supplier.name || "",
      contactName: supplier.contactName || "",
      phone: supplier.phone || "",
      email: supplier.email || "",
      address: supplier.address || ""
    });
  };

  const handleDelete = async (id) => {
    setStatus("");
    try {
      await api.deleteSupplier(id);
      await loadData();
    } catch (err) {
      setStatus(err.message || "Failed to delete supplier");
    }
  };

  return (
    <div className="space-y-8">
      <Topbar title="Suppliers" subtitle="Admin control" />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Supplier list</h2>
            <Badge text={`${suppliers.length} items`} />
          </div>
          <div className="mt-4 space-y-3">
            {suppliers.map((supplier) => (
              <div
                key={supplier._id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-ink-900/70 p-4"
              >
                <div>
                  <p className="text-white font-semibold">{supplier.name}</p>
                  <p className="text-xs text-ink-200/70">{supplier.email}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="rounded-2xl border border-white/10 px-3 py-2 text-xs hover:bg-white/10"
                    onClick={() => handleEdit(supplier)}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded-2xl border border-white/10 px-3 py-2 text-xs text-ember-400 hover:bg-white/10"
                    onClick={() => handleDelete(supplier._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">{editingId ? "Edit" : "New"} supplier</h2>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input
              label="Contact name"
              value={form.contactName}
              onChange={(e) => setForm({ ...form, contactName: e.target.value })}
            />
            <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <Input label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input
              label="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            {status ? <p className="text-xs text-ink-200/70">{status}</p> : null}
            <div className="flex flex-wrap gap-2">
              <Button label={editingId ? "Update" : "Create"} type="submit" />
              {editingId ? (
                <Button label="Cancel" variant="ghost" type="button" onClick={() => setEditingId(null)} />
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
