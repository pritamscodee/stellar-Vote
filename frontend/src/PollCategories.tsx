import { useState } from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";

export interface PollCategory {
  id: string;
  label: string;
  icon: string;
  count: number;
  color: string;
}

const CATEGORIES: PollCategory[] = [
  { id: "all", label: "All Polls", icon: "🗳️", count: 0, color: "bg-primary/10 text-primary border-primary/20" },
  { id: "governance", label: "Governance", icon: "🏛️", count: 0, color: "bg-accent-teal/10 text-accent-teal border-accent-teal/20" },
  { id: "community", label: "Community", icon: "👥", count: 0, color: "bg-accent-amber/10 text-accent-amber border-accent-amber/20" },
  { id: "tech", label: "Technical", icon: "⚙️", count: 0, color: "bg-success/10 text-success border-success/20" },
  { id: "fun", label: "Fun", icon: "🎮", count: 0, color: "bg-error/10 text-error border-error/20" },
];

export default function PollCategories({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Filter className="w-3.5 h-3.5 text-muted-soft" />
      {CATEGORIES.map((cat) => {
        const isActive = selected === cat.id;
        const isHovered = hovered === cat.id;
        return (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={() => setHovered(cat.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelect(cat.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium font-ui border transition-all duration-150 cursor-pointer ${
              isActive
                ? cat.color
                : "bg-surface-card/85 border-hairline/50 text-body hover:border-hairline hover:text-ink"
            }`}
          >
            <span className="text-[13px]">{cat.icon}</span>
            {cat.label}
            {(isActive || isHovered) && cat.count > 0 && (
              <span className="ml-0.5 font-mono text-[10px] opacity-70">
                {cat.count}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
