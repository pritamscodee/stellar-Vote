import { motion } from "framer-motion";
import { Zap, Hash, Clock, Plus } from "lucide-react";

interface PollTemplate {
  id: string;
  title: string;
  question: string;
  options: string[];
  deadlineHours: number;
  icon: string;
  color: string;
}

const TEMPLATES: PollTemplate[] = [
  {
    id: "yes-no",
    title: "Yes / No",
    question: "",
    options: ["Yes", "No"],
    deadlineHours: 24,
    icon: "👍",
    color: "border-success/20 hover:border-success/40",
  },
  {
    id: "rank-4",
    title: "4 Options",
    question: "",
    options: ["Option A", "Option B", "Option C", "Option D"],
    deadlineHours: 72,
    icon: "📊",
    color: "border-accent-teal/20 hover:border-accent-teal/40",
  },
  {
    id: "community",
    title: "Community Pick",
    question: "",
    options: ["Feature Request", "Bug Fix", "Documentation", "Performance"],
    deadlineHours: 168,
    icon: "👥",
    color: "border-accent-amber/20 hover:border-accent-amber/40",
  },
  {
    id: "quick",
    title: "Quick Vote",
    question: "",
    options: ["Option A", "Option B"],
    deadlineHours: 1,
    icon: "⚡",
    color: "border-primary/20 hover:border-primary/40",
  },
];

export default function PollTemplates({
  onSelect,
}: {
  onSelect: (template: PollTemplate) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Zap className="w-3.5 h-3.5 text-primary" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-body">
          Quick Templates
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {TEMPLATES.map((template, i) => (
          <motion.button
            key={template.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(template)}
            className={`text-left p-3 rounded-xl border bg-surface-card/85 backdrop-blur-sm transition-all duration-150 cursor-pointer hover:shadow-elevated ${template.color}`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[14px]">{template.icon}</span>
              <span className="text-[12px] font-medium text-ink font-ui">
                {template.title}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-muted-soft font-ui">
              <span className="flex items-center gap-1">
                <Hash className="w-2.5 h-2.5" />
                {template.options.length} options
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                {template.deadlineHours}h
              </span>
            </div>
          </motion.button>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() =>
          onSelect({
            id: "custom",
            title: "Custom",
            question: "",
            options: ["", ""],
            deadlineHours: 72,
            icon: "✏️",
            color: "",
          })
        }
        className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed border-hairline text-[12px] font-medium text-body hover:text-ink hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer bg-transparent font-ui"
      >
        <Plus className="w-3.5 h-3.5" />
        Start from scratch
      </motion.button>
    </div>
  );
}
