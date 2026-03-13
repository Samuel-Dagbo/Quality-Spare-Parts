import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Button from "../components/Button";
import Input from "../components/Input";
import Badge from "../components/Badge";
import { api } from "../lib/api";

const emptyForm = { name: "", slug: "" };

export default function BrandsAdmin() {
  const [brands, setBrands] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  const loadData = async () => {
    const data = await api.getBrands();
    setBrands(data.data || []);
  };

  useEffect(() => {
    loadData().catch(() => setStatus("Failed to load brands"));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    try {
      if (editingId) {
        await api.updateBrand(editingId, form);
        setStatus("Brand updated");
      } else {
        await api.createBrand(form);
        setStatus("Brand created");
      }
      setForm(emptyForm);
      setEditingId(null);
      await loadData();
    } catch (err) {
      setStatus(err.message || "Failed to save brand");
    }
  };

  const handleEdit = (brand) => {
    setEditingId(brand._id);
    setForm({ name: brand.name || "", slug: brand.slug || "" });
  };

  const handleDelete = async (id) => {
    setStatus("");
    try {
      await api.deleteBrand(id);
      await loadData();
    } catch (err) {
      setStatus(err.message || "Failed to delete brand");
    }
  };

  return (
    <div className="space-y-8">
      <Topbar title="Brands" subtitle="Admin control" />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Brand list</h2>
            <Badge text={`${brands.length} items`} />
          </div>
          <div className="mt-4 space-y-3">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-ink-900/70 p-4"
              >
                <div>
                  <p className="text-white font-semibold">{brand.name}</p>
                  <p className="text-xs text-ink-200/70">Slug: {brand.slug}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="rounded-2xl border border-white/10 px-3 py-2 text-xs hover:bg-white/10"
                    onClick={() => handleEdit(brand)}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded-2xl border border-white/10 px-3 py-2 text-xs text-ember-400 hover:bg-white/10"
                    onClick={() => handleDelete(brand._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">{editingId ? "Edit" : "New"} brand</h2>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
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
