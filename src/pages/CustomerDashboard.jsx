import { Link } from "react-router-dom";
import Topbar from "../components/Topbar";
import Button from "../components/Button";
import DbStatus from "../components/DbStatus";

export default function CustomerDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Topbar title="Welcome back" subtitle="Customer portal" />
        <DbStatus />
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white">Shop spare parts instantly</h2>
        <p className="text-sm text-ink-200/70">
          Browse the latest inventory, track your orders, and manage your cart in one place.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/shop">
            <Button label="Start shopping" />
          </Link>
          <Link to="/customer/orders">
            <Button label="View orders" variant="ghost" />
          </Link>
        </div>
      </div>
    </div>
  );
}
