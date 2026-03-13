import { useEffect, useState } from "react";
import Badge from "./Badge";
import { api } from "../lib/api";

export default function DbStatus() {
  const [status, setStatus] = useState({ state: "unknown" });

  useEffect(() => {
    let alive = true;
    api
      .getHealth()
      .then((data) => {
        if (!alive) return;
        setStatus(data.db);
      })
      .catch(() => {
        if (!alive) return;
        setStatus({ state: "offline" });
      });

    return () => {
      alive = false;
    };
  }, []);

  const tone = status.state === "connected" ? "success" : status.state === "connecting" ? "warn" : "neutral";

  return (
    <div className="flex items-center gap-2 text-xs text-ink-200/70">
      <span>DB</span>
      <Badge text={status.state} tone={tone} />
    </div>
  );
}
