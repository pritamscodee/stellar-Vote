import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Share2, Check, Copy } from "lucide-react";
import { toast } from "sonner";

export default function PollShareButton({ contractId }: { contractId: string }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/dashboard?ref=${contractId.slice(0, 8)}`
    : "";

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareUrl]);

  const shareNative = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: "StellarVote — Cast Your Vote",
        text: "Vote on this on-chain poll on Stellar!",
        url: shareUrl,
      }).catch(() => {});
    } else {
      copyToClipboard();
    }
  }, [shareUrl, copyToClipboard]);

  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={shareNative}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hairline bg-surface-card hover:bg-surface-soft text-xs font-medium text-body hover:text-ink transition-all cursor-pointer font-ui"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Share2 className="w-3.5 h-3.5" />}
        {copied ? "Copied!" : "Share"}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={copyToClipboard}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hairline bg-surface-card hover:bg-surface-soft text-xs font-medium text-body hover:text-ink transition-all cursor-pointer font-ui"
        title="Copy link"
      >
        <Copy className="w-3.5 h-3.5" />
      </motion.button>
    </div>
  );
}
