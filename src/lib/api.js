import { API_BASE_URL } from "./constants";

const request = async (path, options = {}) => {
  const token = localStorage.getItem("spareparts_token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { ...headers, ...(options.headers || {}) }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || "Request failed";
    throw new Error(message);
  }
  if (response.status === 204) return null;
  return response.json();
};

const upload = async (path, formData) => {
  const token = localStorage.getItem("spareparts_token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    body: formData,
    headers
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || "Upload failed";
    throw new Error(message);
  }
  return response.json();
};

export const api = {
  getHealth: () => request("/api/health"),
  login: (payload) => request("/api/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  register: (payload) => request("/api/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  me: () => request("/api/auth/me"),

  getDashboard: () => request("/api/dashboard/stats"),
  getProducts: (query = "") => request(`/api/products${query}`),
  getProduct: (id) => request(`/api/products/${id}`),
  createProduct: (payload) => request("/api/products", { method: "POST", body: JSON.stringify(payload) }),
  updateProduct: (id, payload) =>
    request(`/api/products/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  deleteProduct: (id) => request(`/api/products/${id}`, { method: "DELETE" }),

  getCategories: () => request("/api/categories"),
  createCategory: (payload) =>
    request("/api/categories", { method: "POST", body: JSON.stringify(payload) }),
  updateCategory: (id, payload) =>
    request(`/api/categories/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  deleteCategory: (id) => request(`/api/categories/${id}`, { method: "DELETE" }),
  getBrands: () => request("/api/brands"),
  createBrand: (payload) => request("/api/brands", { method: "POST", body: JSON.stringify(payload) }),
  updateBrand: (id, payload) =>
    request(`/api/brands/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  deleteBrand: (id) => request(`/api/brands/${id}`, { method: "DELETE" }),
  getSuppliers: () => request("/api/suppliers"),
  createSupplier: (payload) =>
    request("/api/suppliers", { method: "POST", body: JSON.stringify(payload) }),
  updateSupplier: (id, payload) =>
    request(`/api/suppliers/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  deleteSupplier: (id) => request(`/api/suppliers/${id}`, { method: "DELETE" }),

  getInventoryAdjustments: () => request("/api/inventory/adjustments"),
  createInventoryAdjustment: (payload) =>
    request("/api/inventory/adjustments", { method: "POST", body: JSON.stringify(payload) }),
  getLowStock: () => request("/api/inventory/low-stock"),

  getUsers: () => request("/api/users"),
  createUser: (payload) => request("/api/users", { method: "POST", body: JSON.stringify(payload) }),
  updateUserRole: (id, payload) =>
    request(`/api/users/${id}/role`, { method: "PATCH", body: JSON.stringify(payload) }),
  updateUserStatus: (id, payload) =>
    request(`/api/users/${id}/status`, { method: "PATCH", body: JSON.stringify(payload) }),

  getCart: () => request("/api/cart"),
  addCartItem: (payload) => request("/api/cart/items", { method: "POST", body: JSON.stringify(payload) }),
  updateCartItem: (productId, payload) =>
    request(`/api/cart/items/${productId}`, { method: "PATCH", body: JSON.stringify(payload) }),
  removeCartItem: (productId) => request(`/api/cart/items/${productId}`, { method: "DELETE" }),
  clearCart: () => request("/api/cart/clear", { method: "DELETE" }),

  getOrders: () => request("/api/orders"),
  createOrder: (payload) => request("/api/orders", { method: "POST", body: JSON.stringify(payload) }),
  updateOrderStatus: (id, payload) =>
    request(`/api/orders/${id}/status`, { method: "PATCH", body: JSON.stringify(payload) }),

  getSales: (query = "") => request(`/api/sales${query}`),
  createSale: (payload) => request("/api/sales", { method: "POST", body: JSON.stringify(payload) }),

  getAnalytics: () => request("/api/analytics/summary"),
  getStoreHighlights: () => request("/api/analytics/storefront"),

  // Reviews
  getReviews: (query = "") => request(`/api/reviews${query}`),
  createReview: (payload) => request("/api/reviews", { method: "POST", body: JSON.stringify(payload) }),

  uploadImage: (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return upload("/api/uploads/image", formData).then((payload) => {
      if (payload?.data?.url && payload.data.url.startsWith("/")) {
        return { ...payload, data: { ...payload.data, url: `${API_BASE_URL}${payload.data.url}` } };
      }
      return payload;
    });
  }
};
