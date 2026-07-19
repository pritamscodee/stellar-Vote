import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Vote, BarChart3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const ONBOARDING_KEY = "stellar_vote_onboarded";

const steps = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Welcome to StellarVote",
    desc: "Decentralized voting powered by Soroban smart contracts on the Stellar network. Let's get you started in 3 quick steps.",
  },
  {
    icon: <Wallet className="w-6 h-6" />,
    title: "Connect Your Wallet",
    desc: "Click 'Connect Wallet' to link your Stellar wallet (Freighter, Albedo, Lobstr, and more). Your wallet is your identity on-chain.",
  },
  {
    icon: <Vote className="w-6 h-6" />,
    title: "Vote or Create Polls",
    desc: "Cast your vote on live polls or create your own. Every vote is recorded immutably on the Stellar testnet.",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Track Results Live",
    desc: "Watch results update in real-time via Server-Sent Events. No page refreshes needed — just instant data streaming.",
  },
];

export default function OnboardingModal() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const onboarded = localStorage.getItem(ONBOARDING_KEY);
    if (!onboarded) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = useCallback(() => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    setShow(false);
  }, []);

  const next = useCallback(() => {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      dismiss();
    }
  }, [step, dismiss]);

  if (!show) return null;

  const current = steps[step];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-md bg-surface-card border border-hairline rounded-2xl shadow-elevated overflow-hidden"
          >
            <div className="p-8 text-center">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-5 text-primary">
                  {current.icon}
                </div>
                <h2 className="font-display text-[22px] font-normal tracking-[-0.3px] text-ink mb-3">
                  {current.title}
                </h2>
                <p className="text-body text-[15px] leading-relaxed font-ui max-w-sm mx-auto">
                  {current.desc}
                </p>
              </motion.div>

              <div className="flex items-center justify-center gap-2 mt-8">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === step ? "bg-primary w-6" : i < step ? "bg-primary/40" : "bg-hairline"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-t border-hairline bg-surface-soft/30">
              <button
                onClick={dismiss}
                className="text-sm text-body hover:text-ink font-ui cursor-pointer bg-transparent border-none transition-colors"
              >
                Skip
              </button>
              <Button onClick={next} size="sm" className="px-6">
                {step === steps.length - 1 ? "Get Started" : "Next"}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
