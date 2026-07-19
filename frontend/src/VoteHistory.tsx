import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, ExternalLink, Trash2 } from "lucide-react";
import { truncateKey, buildExplorerUrl } from "./services/contract";
import { loadHistory, clearVoteHistory } from "./services/voteHistory";
import type { VoteRecord } from "./services/voteHistory";

export default function VoteHistory() {
  const [history, setHistory] = useState<VoteRecord[]>(() => loadHistory());
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setHistory(loadHistory()), 5000);
    return () => clearInterval(id);
  }, []);

  const clearHistory = useCallback(() => {
    clearVoteHistory();
    setHistory([]);
  }, []);

  if (history.length === 0) return null;

  const visible = expanded ? history : history.slice(0, 3);

  return (
    <div className="bg-surface-card/85 backdrop-blur-sm border border-hairline/50 rounded-2xl p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <History className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">
              Vote History
            </p>
            <p className="text-[10px] text-body">{history.length} vote{history.length !== 1 ? "s" : ""} recorded</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {history.length > 3 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[11px] text-primary font-medium cursor-pointer bg-transparent border-none hover:underline font-ui"
            >
              {expanded ? "Show less" : `Show all (${history.length})`}
            </button>
          )}
          <button
            onClick={clearHistory}
            className="ml-2 w-7 h-7 flex items-center justify-center rounded-lg text-body hover:text-error hover:bg-error/5 transition-colors cursor-pointer bg-transparent border-none"
            title="Clear history"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <AnimatePresence>
          {visible.map((record, i) => (
            <motion.div
              key={`${record.txHash}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ delay: i * 0.03, duration: 0.2 }}
              className="flex items-start gap-2.5 px-2.5 py-2 rounded-lg hover:bg-surface-soft/50 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[12px] leading-snug font-ui">
                  <span className="font-semibold text-ink">{record.optionLabel}</span>
                  <span className="text-body"> — </span>
                  <span className="text-body truncate">{record.question.length > 30 ? record.question.slice(0, 30) + "..." : record.question}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-muted-soft font-mono">
                    {new Date(record.timestamp).toLocaleString()}
                  </span>
                  {record.txHash && (
                    <a
                      href={buildExplorerUrl("tx", record.txHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-primary font-medium flex items-center gap-0.5 hover:underline font-ui"
                    >
                      {truncateKey(record.txHash)} <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
