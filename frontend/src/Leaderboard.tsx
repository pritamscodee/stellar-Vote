import { motion } from "framer-motion";
import { Trophy, Medal, Star, TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/animations";
import { truncateKey } from "./services/contract";

interface LeaderboardEntry {
  address: string;
  votes: number;
  rank: number;
  badge: "gold" | "silver" | "bronze" | "none";
}

const BADGE_COLORS = {
  gold: "bg-accent-amber/15 text-accent-amber border-accent-amber/20",
  silver: "bg-muted/15 text-muted border-muted/20",
  bronze: "bg-primary/15 text-primary border-primary/20",
  none: "bg-surface-soft text-body border-hairline/50",
};

const BADGE_ICONS = {
  gold: <Trophy className="w-3.5 h-3.5" />,
  silver: <Medal className="w-3.5 h-3.5" />,
  bronze: <Star className="w-3.5 h-3.5" />,
  none: <TrendingUp className="w-3.5 h-3.5" />,
};

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { address: "GCZVEJZJNMPHXP3GKCHI33YUSN7BJTU3OWNDLSDEUQOO4UGRIQWHBEHK", votes: 12, rank: 1, badge: "gold" },
  { address: "GDFKLTB5WKKDDJ2NRU2V5OG476HYEGWT4UFV7BID7BNGWZGRZYL3LL6Z", votes: 8, rank: 2, badge: "silver" },
  { address: "GAG3SUKHIF7VAWGTDRH52XETMLZXXNXBAZLLXHSLXAQPOBBCN43YLKR4", votes: 6, rank: 3, badge: "bronze" },
  { address: "GCV5X5CKYUAPQLE3OYQS3PDXKX4TRV767YUCJ66PWWGZD2BXE744T276", votes: 5, rank: 4, badge: "none" },
  { address: "GA4SXARZZ4RPF6N7VOAH3B5OKMFAP3FGY6M6TO3DZJL4TMU2KOVBHCIY", votes: 4, rank: 5, badge: "none" },
  { address: "GCKMODNZEAI4X6AL6SL77PNJLUUJAQAWECXDTXJZGXBOSSSF7THC3XH6", votes: 3, rank: 6, badge: "none" },
  { address: "GACMLTEWZ23NGJ5WZ2THYGLODFYTEKECB7J2U33H3DCSW2PEAQUEIZED", votes: 3, rank: 7, badge: "none" },
  { address: "GAEAB4UWRUODGUKBYGDXBZULSOI3HJ6HQKJNNLTY66IF3ATXMRYUCSNX", votes: 2, rank: 8, badge: "none" },
];

export default function Leaderboard({ currentWallet }: { currentWallet?: string | null }) {
  const entries = MOCK_LEADERBOARD;

  return (
    <GlassCard className="p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-amber/10">
          <Trophy className="h-4 w-4 text-accent-amber" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">
            Leaderboard
          </p>
          <p className="text-[10px] text-body">Top voters this month</p>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        {entries.slice(0, 6).map((entry, i) => {
          const isCurrent = currentWallet && entry.address === currentWallet;
          return (
            <motion.div
              key={entry.address}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.2 }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isCurrent ? "bg-primary/5 border border-primary/10" : "hover:bg-surface-soft/50"
              }`}
            >
              <span className="font-mono text-[11px] text-muted-soft w-5 text-center">
                #{entry.rank}
              </span>
              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md border text-[10px] font-semibold ${BADGE_COLORS[entry.badge]}`}>
                {BADGE_ICONS[entry.badge]}
              </span>
              <span className="flex-1 min-w-0 text-[12px] font-mono font-semibold text-ink truncate">
                {truncateKey(entry.address)}
              </span>
              <span className="font-mono text-[11px] text-body font-medium">
                {entry.votes} votes
              </span>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}
