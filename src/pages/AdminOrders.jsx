import Topbar from "../components/Topbar";
import Orders from "./Orders";

export default function AdminOrders() {
  return (
    <div className="space-y-8">
      <Topbar title="Admin Orders" subtitle="All orders" />
      <Orders />
    </div>
  );
}
