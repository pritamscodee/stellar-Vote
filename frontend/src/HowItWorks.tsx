import { motion } from "framer-motion";
import { Wallet, Vote, BarChart3, Share2 } from "lucide-react";

const steps = [
  {
    icon: <Wallet className="w-6 h-6" />,
    title: "Connect Wallet",
    desc: "Link your Stellar wallet (Freighter, Albedo, Lobstr, and more) in one click. Your wallet is your on-chain identity.",
    num: "01",
  },
  {
    icon: <Vote className="w-6 h-6" />,
    title: "Create or Vote",
    desc: "Create a poll with custom options and deadlines, or cast your vote on existing on-chain polls.",
    num: "02",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Track Results",
    desc: "Watch results update in real-time via Server-Sent Events. Every vote is recorded immutably on Stellar.",
    num: "03",
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Share & Grow",
    desc: "Share polls via link, track your voting history, and climb the leaderboard. Governance made social.",
    num: "04",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32 bg-surface-soft border-t border-hairline">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hairline/50 bg-surface-card/85 text-[11px] font-semibold uppercase tracking-[0.2em] text-body backdrop-blur-sm mb-5">
            How It Works
          </span>
          <h2 className="font-display text-[34px] md:text-[42px] font-normal tracking-[-1px] leading-[1.12] text-ink mb-4">
            Four steps to{" "}
            <span className="text-primary">decentralized voting</span>
          </h2>
          <p className="text-[17px] text-body max-w-[560px] mx-auto font-ui">
            From wallet connection to on-chain verification — voting on Stellar is simple, transparent, and instant.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="relative"
            >
              <div className="bg-surface-card border border-hairline/50 rounded-2xl p-6 h-full hover:shadow-elevated hover:border-hairline transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[11px] text-muted-soft font-medium">
                    {step.num}
                  </span>
                  <div className="flex-1 h-px bg-hairline/50" />
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {step.icon}
                </div>
                <h3 className="font-ui text-[17px] font-medium text-ink mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-body leading-relaxed font-ui">
                  {step.desc}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-hairline/50" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
