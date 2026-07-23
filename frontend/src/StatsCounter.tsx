import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Users, Vote, Activity, Zap } from "lucide-react";
import { AnimatedCounter } from "@/components/animations";

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ReactNode;
  color: string;
}

const stats: StatItem[] = [
  {
    label: "Total Users",
    value: 50,
    suffix: "+",
    icon: <Users className="w-5 h-5" />,
    color: "text-primary",
  },
  {
    label: "Votes Cast",
    value: 120,
    suffix: "+",
    icon: <Vote className="w-5 h-5" />,
    color: "text-accent-teal",
  },
  {
    label: "Polls Created",
    value: 35,
    suffix: "+",
    icon: <Activity className="w-5 h-5" />,
    color: "text-accent-amber",
  },
  {
    label: "Uptime",
    value: 99,
    suffix: "%",
    icon: <Zap className="w-5 h-5" />,
    color: "text-success",
  },
];

export default function StatsCounter() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-canvas border-t border-hairline">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-surface-card border border-hairline/50 mb-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="font-display text-[36px] md:text-[44px] font-normal tracking-[-1px] text-ink leading-none">
                {inView ? (
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>
              <p className="text-sm text-body font-ui mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
