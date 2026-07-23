import { motion } from "framer-motion";
import { Heart, GitBranch, MessageCircle, ExternalLink } from "lucide-react";

const links = [
  {
    icon: <GitBranch className="w-5 h-5" />,
    title: "Open Source",
    desc: "Full source code on GitHub. MIT licensed, auditable, and community-driven.",
    href: "https://github.com/pritamscodee/stellar-Vote",
    label: "View Repo",
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    title: "Community",
    desc: "Join the Stellar developer community. Share feedback, report bugs, and request features.",
    href: "https://github.com/pritamscodee/stellar-Vote/issues",
    label: "Open Issue",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Contributing",
    desc: "We welcome contributions! Fork the repo, create a branch, and submit a pull request.",
    href: "https://github.com/pritamscodee/stellar-Vote/pulls",
    label: "Contribute",
  },
];

export default function CommunitySection() {
  return (
    <section className="py-24 md:py-32 bg-surface-dark border-t border-surface-dark-elevated">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-surface-dark-elevated text-[11px] font-semibold uppercase tracking-[0.2em] text-on-dark-soft backdrop-blur-sm mb-5 bg-surface-dark-elevated">
            <Heart className="w-3 h-3 text-primary" />
            Open Source
          </span>
          <h2 className="font-display text-[34px] md:text-[42px] font-normal tracking-[-1px] leading-[1.12] text-on-dark mb-4">
            Built by the <span className="text-primary">community</span>
          </h2>
          <p className="text-[17px] text-on-dark-soft max-w-[560px] mx-auto font-ui">
            StellarVote is open source and MIT licensed. We believe in transparent, community-driven development.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {links.map((link, i) => (
            <motion.a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group bg-surface-dark-elevated rounded-2xl border border-surface-dark-soft p-6 no-underline hover:border-primary/30 hover:shadow-elevated transition-all duration-300"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:bg-primary/15 transition-colors">
                {link.icon}
              </div>
              <h3 className="font-ui text-[17px] font-medium text-on-dark mb-2">
                {link.title}
              </h3>
              <p className="text-sm text-on-dark-soft leading-relaxed font-ui mb-4">
                {link.desc}
              </p>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-primary group-hover:gap-2.5 transition-all font-ui">
                {link.label}
                <ExternalLink className="w-3 h-3" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
