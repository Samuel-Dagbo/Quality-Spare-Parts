import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Button from "../components/Button";
import Input from "../components/Input";
import Badge from "../components/Badge";
import { api } from "../lib/api";
import { formatCedis } from "../lib/currency";

const emptyForm = {
  name: "",
  partNumber: "",
  sellingPrice: "",
  buyingPrice: "",
  quantity: "",
  reorderLevel: "",
  category: "",
  brand: "",
  supplier: "",
  description: "",
  images: []
};

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  const loadData = async () => {
    const [productData, categoryData, brandData, supplierData] = await Promise.all([
      api.getProducts("?limit=50"),
      api.getCategories(),
      api.getBrands(),
      api.getSuppliers()
    ]);
    setProducts(productData.data || []);
    setCategories(categoryData.data || []);
    setBrands(brandData.data || []);
    setSuppliers(supplierData.data || []);
  };

  useEffect(() => {
    loadData().catch(() => setStatus("Failed to load data"));
  }, []);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name || "",
      partNumber: product.partNumber || product.sku || "",
      sellingPrice: product.sellingPrice ?? product.price ?? "",
      buyingPrice: product.buyingPrice ?? product.costPrice ?? "",
      quantity: product.quantity ?? product.stockQty ?? "",
      reorderLevel: product.reorderLevel ?? "",
      category: product.category?._id || "",
      brand: product.brand?._id || "",
      supplier: product.supplier?._id || "",
      description: product.description || "",
      images: product.images || []
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    const payload = {
      ...form,
      sellingPrice: Number(form.sellingPrice),
      buyingPrice: Number(form.buyingPrice),
      quantity: Number(form.quantity || 0),
      reorderLevel: Number(form.reorderLevel || 0)
    };
    try {
      if (editingId) {
        await api.updateProduct(editingId, payload);
        setStatus("Product updated");
      } else {
        await api.createProduct(payload);
        setStatus("Product created");
      }
      resetForm();
      await loadData();
    } catch (err) {
      setStatus(err.message || "Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    setStatus("");
    try {
      await api.deleteProduct(id);
      await loadData();
    } catch (err) {
      setStatus(err.message || "Failed to delete product");
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setStatus("");
    try {
      const response = await api.uploadImage(file);
      setForm((prev) => ({ ...prev, images: [...prev.images, response.data.url] }));
      setStatus("Image uploaded");
    } catch (err) {
      setStatus(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Topbar title="Products" subtitle="Admin control" />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Product list</h2>
            <Badge text={`${products.length} items`} />
          </div>
          <div className="mt-4 space-y-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-ink-900/70 p-4"
              >
                <div>
                  <p className="text-white font-semibold">{product.name}</p>
                  <p className="text-xs text-ink-200/70">Part: {product.partNumber || product.sku}</p>
                </div>
                <div className="text-sm text-ink-200/70">
                  {formatCedis(product.price || 0)} · Qty {product.stockQty}
                </div>
                <div className="flex gap-2">
                  <button
                    className="rounded-2xl border border-white/10 px-3 py-2 text-xs hover:bg-white/10"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded-2xl border border-white/10 px-3 py-2 text-xs text-ember-400 hover:bg-white/10"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">{editingId ? "Edit" : "New"} product</h2>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <Input label="Name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
            <Input
              label="Part number"
              value={form.partNumber}
              onChange={(e) => handleChange("partNumber", e.target.value)}
            />
            <Input
              label="Selling price (GHS)"
              type="number"
              value={form.sellingPrice}
              onChange={(e) => handleChange("sellingPrice", e.target.value)}
            />
            <Input
              label="Buying price (GHS)"
              type="number"
              value={form.buyingPrice}
              onChange={(e) => handleChange("buyingPrice", e.target.value)}
            />
            <Input
              label="Quantity"
              type="number"
              value={form.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)}
            />
            <Input
              label="Reorder level"
              type="number"
              value={form.reorderLevel}
              onChange={(e) => handleChange("reorderLevel", e.target.value)}
            />
            <label className="flex flex-col gap-2 text-sm text-ink-200/80">
              Category
              <select
                className="rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-2 text-white"
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm text-ink-200/80">
              Brand
              <select
                className="rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-2 text-white"
                value={form.brand}
                onChange={(e) => handleChange("brand", e.target.value)}
              >
                <option value="">Select brand</option>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm text-ink-200/80">
              Supplier
              <select
                className="rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-2 text-white"
                value={form.supplier}
                onChange={(e) => handleChange("supplier", e.target.value)}
              >
                <option value="">Select supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier._id} value={supplier._id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm text-ink-200/80">
              Description
              <textarea
                className="rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-2 text-white"
                rows={3}
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-ink-200/80">
              Upload image
              <input
                type="file"
                accept="image/*"
                className="text-xs text-ink-200/70"
                onChange={handleUpload}
                disabled={uploading}
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {form.images.map((url) => (
                <img key={url} src={url} alt="Product" className="h-12 w-12 rounded-xl object-cover" />
              ))}
            </div>
            {status ? <p className="text-xs text-ink-200/70">{status}</p> : null}
            <div className="flex flex-wrap gap-2">
              <Button label={editingId ? "Update product" : "Create product"} type="submit" />
              {editingId ? (
                <Button label="Cancel" variant="ghost" type="button" onClick={resetForm} />
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
