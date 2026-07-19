import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

function getTimeRemaining(deadlineMs: number): { days: number; hours: number; minutes: number; seconds: number; expired: boolean } {
  const now = Date.now();
  const diff = deadlineMs - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, expired: false };
}

export default function CountdownTimer({ deadline }: { deadline: number }) {
  const deadlineMs = deadline * 1000;
  const [time, setTime] = useState(() => getTimeRemaining(deadlineMs));

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getTimeRemaining(deadlineMs));
    }, 1000);
    return () => clearInterval(id);
  }, [deadlineMs]);

  if (time.expired) {
    return (
      <div className="flex items-center gap-1.5 text-error text-xs font-mono font-medium">
        <Clock className="w-3 h-3" />
        Ended
      </div>
    );
  }

  const units = [
    { label: "d", value: time.days },
    { label: "h", value: time.hours },
    { label: "m", value: time.minutes },
    { label: "s", value: time.seconds },
  ];

  return (
    <div className="flex items-center gap-1">
      <Clock className="w-3 h-3 text-body mr-1" />
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-0.5">
          <motion.span
            key={u.value}
            initial={{ opacity: 0.6, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-xs font-semibold text-ink tabular-nums min-w-[14px] text-center"
          >
            {String(u.value).padStart(2, "0")}
          </motion.span>
          <span className="text-[10px] text-body font-ui">{u.label}</span>
          {i < units.length - 1 && <span className="text-[10px] text-muted-soft mx-0.5">:</span>}
        </div>
      ))}
    </div>
  );
}
