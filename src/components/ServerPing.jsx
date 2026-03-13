import { useEffect } from "react";
import { api } from "../lib/api";

const PING_INTERVAL_MS = 10 * 60 * 1000;

export default function ServerPing() {
  useEffect(() => {
    let active = true;

    const ping = async () => {
      try {
        await api.getHealth();
      } catch {
        // ignore ping errors
      }
    };

    if (active) {
      ping();
    }
    const timer = setInterval(ping, PING_INTERVAL_MS);

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);

  return null;
}
