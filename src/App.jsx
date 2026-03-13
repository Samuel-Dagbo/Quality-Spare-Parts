import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import RequireAuth from "./components/RequireAuth";
import AdminSidebar from "./layouts/AdminSidebar";
import StaffSidebar from "./layouts/StaffSidebar";
import CustomerSidebar from "./layouts/CustomerSidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import CartPublic from "./pages/CartPublic";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductsAdmin from "./pages/ProductsAdmin";
import CategoriesAdmin from "./pages/CategoriesAdmin";
import BrandsAdmin from "./pages/BrandsAdmin";
import SuppliersAdmin from "./pages/SuppliersAdmin";
import InventoryAdjustments from "./pages/InventoryAdjustments";
import UsersAdmin from "./pages/UsersAdmin";
import Analytics from "./pages/Analytics";
import Sales from "./pages/Sales";
import StaffPOS from "./pages/StaffPOS";
import Topbar from "./components/Topbar";

const roleHome = (role) => {
  if (role === "admin") return "/admin";
  if (role === "staff") return "/staff";
  return "/customer";
};

const RoleRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={roleHome(user.role)} replace />;
};

const LayoutShell = ({ sidebar, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_55%),radial-gradient(circle_at_20%_30%,_rgba(250,204,21,0.16),_transparent_45%),radial-gradient(circle_at_80%_10%,_rgba(249,115,22,0.18),_transparent_45%)]"></div>
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-sun-500/20 blur-3xl animate-floaty"></div>
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-aqua-500/20 blur-3xl animate-floaty"></div>

      {sidebar && React.cloneElement(sidebar, {
        isOpen: isSidebarOpen,
        onClose: () => setIsSidebarOpen(false)
      })}

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="sticky top-0 z-40 lg:hidden bg-ink-950/95 backdrop-blur-xl border-b border-white/10">
        <Topbar title="" subtitle="" onMenuClick={() => setIsSidebarOpen(true)} />
      </div>
      <main className={`relative z-10 px-6 py-4 lg:py-10 space-y-10 pt-20 lg:pt-0 ${sidebar ? "lg:ml-72" : ""}`}>
        <div className="mx-auto max-w-6xl space-y-10">{children}</div>
      </main>
    </div>
  );
};

const AppShell = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<CartPublic />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/app"
        element={
          <RequireAuth>
            <RoleRedirect />
          </RequireAuth>
        }
      />

      <Route
        path="/admin"
        element={
          <RequireAuth roles={["admin"]}>
            <LayoutShell sidebar={<AdminSidebar />}>
              <AdminDashboard />
            </LayoutShell>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/products"
        element={
          <RequireAuth roles={["admin"]}>
            <LayoutShell sidebar={<AdminSidebar />}>
              <ProductsAdmin />
            </LayoutShell>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <RequireAuth roles={["admin"]}>
            <LayoutShell sidebar={<AdminSidebar />}>
              <CategoriesAdmin />
            </LayoutShell>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/brands"
        element={
          <RequireAuth roles={["admin"]}>
            <LayoutShell sidebar={<AdminSidebar />}>
              <BrandsAdmin />
            </LayoutShell>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/suppliers"
        element={
          <RequireAuth roles={["admin"]}>
            <LayoutShell sidebar={<AdminSidebar />}>
              <SuppliersAdmin />
            </LayoutShell>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/inventory"
        element={
          <RequireAuth roles={["admin"]}>
            <LayoutShell sidebar={<AdminSidebar />}>
              <InventoryAdjustments />
            </LayoutShell>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <RequireAuth roles={["admin"]}>
            <LayoutShell sidebar={<AdminSidebar />}>
              <Orders />
            </LayoutShell>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/sales"
        element={
          <RequireAuth roles={["admin"]}>
            <LayoutShell sidebar={<AdminSidebar />}>
              <Sales />
            </LayoutShell>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <RequireAuth roles={["admin"]}>
            <LayoutShell sidebar={<AdminSidebar />}>
              <Analytics />
            </LayoutShell>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/users"
        element={
          <RequireAuth roles={["admin"]}>
            <LayoutShell sidebar={<AdminSidebar />}>
              <UsersAdmin />
            </LayoutShell>
          </RequireAuth>
        }
      />

      <Route
        path="/staff"
        element={
          <RequireAuth roles={["staff"]}>
            <LayoutShell sidebar={<StaffSidebar />}>
              <StaffDashboard />
            </LayoutShell>
          </RequireAuth>
        }
      />
      <Route
        path="/staff/pos"
        element={
          <RequireAuth roles={["staff"]}>
            <LayoutShell sidebar={<StaffSidebar />}>
              <StaffPOS />
            </LayoutShell>
          </RequireAuth>
        }
      />
      <Route
        path="/staff/inventory"
        element={
          <RequireAuth roles={["staff"]}>
            <LayoutShell sidebar={<StaffSidebar />}>
              <Inventory />
            </LayoutShell>
          </RequireAuth>
        }
      />
      <Route
        path="/staff/products"
        element={
          <RequireAuth roles={["staff"]}>
            <LayoutShell sidebar={<StaffSidebar />}>
              <ProductsAdmin />
            </LayoutShell>
          </RequireAuth>
        }
      />
      <Route
        path="/staff/orders"
        element={
          <RequireAuth roles={["staff"]}>
            <LayoutShell sidebar={<StaffSidebar />}>
              <Orders />
            </LayoutShell>
          </RequireAuth>
        }
      />
      <Route
        path="/staff/adjustments"
        element={
          <RequireAuth roles={["staff"]}>
            <LayoutShell sidebar={<StaffSidebar />}>
              <InventoryAdjustments />
            </LayoutShell>
          </RequireAuth>
        }
      />

      <Route
        path="/customer"
        element={
          <RequireAuth roles={["customer"]}>
            <LayoutShell sidebar={<CustomerSidebar />}>
              <CustomerDashboard />
            </LayoutShell>
          </RequireAuth>
        }
      />
      <Route
        path="/customer/shop"
        element={
          <RequireAuth roles={["customer"]}>
            <LayoutShell sidebar={<CustomerSidebar />}>
              <Shop embedded />
            </LayoutShell>
          </RequireAuth>
        }
      />
      <Route
        path="/customer/cart"
        element={
          <RequireAuth roles={["customer"]}>
            <LayoutShell sidebar={<CustomerSidebar />}>
              <Cart />
            </LayoutShell>
          </RequireAuth>
        }
      />
      <Route
        path="/customer/checkout"
        element={
          <RequireAuth roles={["customer"]}>
            <LayoutShell sidebar={<CustomerSidebar />}>
              <Checkout />
            </LayoutShell>
          </RequireAuth>
        }
      />
      <Route
        path="/customer/orders"
        element={
          <RequireAuth roles={["customer"]}>
            <LayoutShell sidebar={<CustomerSidebar />}>
              <Orders />
            </LayoutShell>
          </RequireAuth>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppShell />
      </CartProvider>
    </AuthProvider>
  );
}
