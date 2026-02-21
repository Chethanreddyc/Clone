import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  KeyRound,
  Skull,
  Mail,
  Activity,
  Terminal,
  ChevronRight,
  Wifi,
  Lock,
  Eye,
  AlertTriangle,
  Zap,
  Globe,
  Menu,
  X,
} from "lucide-react";

/* ─── Animated typing text ─────────────────────────── */
function TypeWriter({ texts, speed = 80 }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx % texts.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setDisplayed(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setIdx((i) => (i + 1) % texts.length);
          setCharIdx(0);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts, speed]);

  return (
    <span className="text-cyan-400">
      {displayed}
      <span className="ml-0.5 inline-block h-[1.1em] w-[2px] animate-pulse bg-cyan-400 align-middle" />
    </span>
  );
}

/* ─── Scanline overlay ──────────────────────────────── */
function Scanlines() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,200,0.15) 2px, rgba(0,255,200,0.15) 4px)",
      }}
    />
  );
}

/* ─── Floating particles ────────────────────────────── */
function Particles({ count = 30 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px w-px rounded-full bg-cyan-400"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
            scale: Math.random() * 2 + 1,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Cyber grid background ─────────────────────────── */
function CyberGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,200,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,200,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,255,200,0.08),transparent)]" />
    </div>
  );
}

/* ─── Animated border card ──────────────────────────── */
function CyberCard({ children, className = "", glowColor = "cyan", delay = 0 }) {
  const glowMap = {
    cyan:   { glow: "rgba(0,255,200,0.4)",   border: "#00ffc8", text: "text-cyan-400",   bg: "from-cyan-500/10 to-transparent"   },
    purple: { glow: "rgba(168,85,247,0.4)",  border: "#a855f7", text: "text-purple-400", bg: "from-purple-500/10 to-transparent" },
    red:    { glow: "rgba(239,68,68,0.4)",   border: "#ef4444", text: "text-red-400",    bg: "from-red-500/10 to-transparent"    },
    orange: { glow: "rgba(249,115,22,0.4)",  border: "#f97316", text: "text-orange-400", bg: "from-orange-500/10 to-transparent" },
  };
  const g = glowMap[glowColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl transition-all duration-300 ${className}`}
      style={{ "--glow": g.glow, "--border-color": g.border }}
    >
      {/* Animated glow border */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 0 0 1px ${g.border}, 0 0 40px ${g.glow}` }}
      />

      {/* Top gradient accent */}
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r via-current to-transparent from-transparent ${g.text} opacity-60`} />

      {/* Corner decorations */}
      <div className={`absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 ${g.text} opacity-60`} />
      <div className={`absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 ${g.text} opacity-60`} />
      <div className={`absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 ${g.text} opacity-60`} />
      <div className={`absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 ${g.text} opacity-60`} />

      {/* BG glow */}
      <div className={`absolute inset-0 bg-gradient-to-b ${g.bg} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

/* ─── Service data ──────────────────────────────────── */
const services = [
  {
    id: "password-analysis",
    icon: KeyRound,
    title: "Password Analysis",
    subtitle: "Strength & Entropy Scanner",
    description:
      "Deep-inspect passwords using entropy calculation, pattern recognition, and dictionary exposure checks. Generate a full vulnerability report.",
    features: ["Entropy analysis", "Breach database lookup", "Pattern detection", "Strength scoring"],
    glow: "cyan",
    tag: "RECON",
    status: "ACTIVE",
  },
  {
    id: "password-cracking",
    icon: Skull,
    title: "Password Cracking",
    subtitle: "Brute Force & Dictionary Engine",
    description:
      "Simulate real-world cracking attacks using wordlist attacks, rainbow tables, and hybrid brute-force strategies on hashed credentials.",
    features: ["Rainbow table attack", "Dictionary wordlist", "Brute-force engine", "Hash cracking"],
    glow: "red",
    tag: "OFFENSIVE",
    status: "ACTIVE",
  },
  {
    id: "phishing-mail",
    icon: Mail,
    title: "Phishing Mail Service",
    subtitle: "Email Threat Simulation",
    description:
      "Craft and analyze phishing email campaigns for penetration testing. Identify social engineering vectors and train your team against real threats.",
    features: ["Template generator", "Spear phishing", "Link obfuscation", "Click tracking"],
    glow: "purple",
    tag: "SOCIAL ENG",
    status: "READY",
  },
  {
    id: "threat-detection",
    icon: Activity,
    title: "Threat Detection",
    subtitle: "Real-Time Network Monitor",
    description:
      "Monitor live network traffic, detect anomalies, and identify intrusion attempts with AI-powered behavioral analysis and signature matching.",
    features: ["Live traffic analysis", "Anomaly detection", "Intrusion alerts", "AI threat scoring"],
    glow: "orange",
    tag: "DEFENSE",
    status: "LIVE",
  },
];

/* ─── Status badge ──────────────────────────────────── */
function StatusBadge({ status }) {
  const map = {
    ACTIVE: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
    READY:  "bg-purple-500/20 text-purple-400 border-purple-500/40",
    LIVE:   "bg-orange-500/20 text-orange-400 border-orange-500/40",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-widest ${map[status]}`}>
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      {status}
    </span>
  );
}

/* ─── Service modal ─────────────────────────────────── */
function ServiceModal({ service, onClose }) {
  const glowMap = {
    cyan:   "border-cyan-500/50 shadow-cyan-500/20",
    red:    "border-red-500/50 shadow-red-500/20",
    purple: "border-purple-500/50 shadow-purple-500/20",
    orange: "border-orange-500/50 shadow-orange-500/20",
  };
  const textMap = {
    cyan: "text-cyan-400", red: "text-red-400", purple: "text-purple-400", orange: "text-orange-400",
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className={`relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border bg-black/95 p-8 shadow-2xl ${glowMap[service.glow]}`}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <div className={`flex h-14 w-14 items-center justify-center rounded-xl border ${glowMap[service.glow]} bg-white/5`}>
            <service.icon className={`h-7 w-7 ${textMap[service.glow]}`} />
          </div>
          <div>
            <p className={`text-xs font-bold tracking-widest ${textMap[service.glow]}`}>{service.tag}</p>
            <h3 className="text-xl font-bold text-white">{service.title}</h3>
            <p className="text-sm text-white/50">{service.subtitle}</p>
          </div>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-white/60">{service.description}</p>

        {/* Terminal-style feature list */}
        <div className="mb-6 rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-sm">
          <div className="mb-2 flex items-center gap-2 text-white/30">
            <Terminal className="h-3.5 w-3.5" />
            <span className="text-xs">capabilities.sh</span>
          </div>
          {service.features.map((f, i) => (
            <motion.div
              key={f}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              className={`flex items-center gap-2 py-0.5 ${textMap[service.glow]}`}
            >
              <ChevronRight className="h-3 w-3 flex-shrink-0 opacity-60" />
              <span className="text-xs">{f}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full rounded-xl border py-3 text-sm font-bold tracking-wider transition-all duration-300 ${glowMap[service.glow]} bg-white/5 ${textMap[service.glow]} hover:bg-white/10`}
        >
          INITIALIZE MODULE →
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main App ──────────────────────────────────────── */
export default function App() {
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const goToPage = (svc) => {
    if (svc.id === "threat-detection") return navigate("/threat-detection");
    if (svc.id === "phishing-mail") return navigate("/phishing");
    setSelected(svc);
  };

  return (
    <div className="min-h-screen bg-[#020408] text-white">
      <Scanlines />

      {/* ── Navbar ──────────────────────────────────── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 border-b border-white/5 bg-black/60 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/50 bg-cyan-500/10">
              <ShieldCheck className="h-5 w-5 text-cyan-400" />
              <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
              </span>
            </div>
            <div>
              <span className="font-black tracking-wider text-white">CYBER</span>
              <span className="font-black tracking-wider text-cyan-400">OPS</span>
              <p className="text-[9px] tracking-[0.3em] text-white/30">SECURITY PLATFORM</p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {["Dashboard", "Arsenal", "Reports", "Docs"].map((item) => (
              <button
                key={item}
                className="rounded-lg px-4 py-2 text-sm font-medium text-white/50 transition-colors hover:bg-white/5 hover:text-white"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 md:flex">
              <Wifi className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-xs font-bold text-cyan-400">CONNECTED</span>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-lg p-2 transition-colors hover:bg-white/10 md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/5 bg-black/80 md:hidden"
            >
              <div className="flex flex-col gap-1 px-6 py-4">
                {["Dashboard", "Arsenal", "Reports", "Docs"].map((item) => (
                  <button key={item} className="rounded-lg px-4 py-2 text-left text-sm text-white/60 hover:bg-white/5 hover:text-white">
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Hero ────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 py-24 text-center md:py-36">
        <CyberGrid />
        <Particles count={40} />

        {/* Side decorations */}
        <div className="pointer-events-none absolute left-0 top-1/2 h-px w-1/4 bg-gradient-to-r from-transparent to-cyan-500/30" />
        <div className="pointer-events-none absolute right-0 top-1/2 h-px w-1/4 bg-gradient-to-l from-transparent to-cyan-500/30" />

        <div className="relative z-10 mx-auto max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-4 py-1.5"
          >
            <Lock className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-xs font-bold tracking-widest text-cyan-400">
              ADVANCED PENETRATION TESTING SUITE v4.2
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 text-5xl font-black leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
          >
            <span className="text-white">MASTER THE</span>
            <br />
            <span
              className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
            >
              DIGITAL THREAT
            </span>
            <br />
            <span className="text-white">LANDSCAPE</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mb-4 max-w-2xl text-base text-white/50 md:text-lg"
          >
            Identify vulnerabilities before attackers do. Professional-grade tools for{" "}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12 text-lg font-semibold md:text-xl"
          >
            <TypeWriter
              texts={[
                "password security analysis...",
                "phishing campaign testing...",
                "network threat detection...",
                "credential vulnerability scanning...",
              ]}
            />
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button className="group relative overflow-hidden rounded-xl border border-cyan-500/60 bg-cyan-500/10 px-8 py-3.5 text-sm font-bold tracking-wider text-cyan-400 transition-all duration-300 hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/25">
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="h-4 w-4" /> LAUNCH SUITE
              </span>
            </button>
            <button className="rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-bold tracking-wider text-white/60 transition-all duration-300 hover:bg-white/10 hover:text-white">
              <span className="flex items-center gap-2">
                <Eye className="h-4 w-4" /> VIEW DOCS
              </span>
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20"
        >
          <div className="h-8 w-px bg-gradient-to-b from-transparent to-cyan-500/50" />
          <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
        </motion.div>
      </section>

      {/* ── Stats row ───────────────────────────────── */}
      <section className="border-y border-white/5 bg-white/[0.02] px-6 py-8">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Vulnerabilities Detected",   value: "2.4M+", icon: AlertTriangle },
            { label: "Passwords Analyzed",          value: "50M+",  icon: KeyRound     },
            { label: "Phishing Templates",          value: "1,200+",icon: Mail          },
            { label: "Active Threat Feeds",         value: "340+",  icon: Globe         },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.6 }}
              className="text-center"
            >
              <s.icon className="mx-auto mb-2 h-5 w-5 text-cyan-500/60" />
              <div className="text-2xl font-black text-white md:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs text-white/30">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Services grid ───────────────────────────── */}
      <section className="relative px-6 py-24">
        <CyberGrid />
        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-16 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-3 text-xs font-bold tracking-[0.4em] text-cyan-400"
            >
              — OPERATIONAL MODULES —
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-black tracking-tight text-white md:text-4xl"
            >
              SELECT YOUR OPERATION
            </motion.h2>
          </div>

          {/* Cards grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((svc, i) => (
              <CyberCard
                key={svc.id}
                glowColor={svc.glow}
                delay={0.1 * i + 0.3}
                className="h-full"
              >
                <div
                  className="flex h-full flex-col p-6"
                  onClick={() => goToPage(svc)}
                >
                  {/* Tag + status */}
                  <div className="mb-5 flex items-center justify-between">
                    <span
                      className={`text-[9px] font-black tracking-[0.35em] ${
                        {
                          cyan: "text-cyan-500",
                          red: "text-red-500",
                          purple: "text-purple-500",
                          orange: "text-orange-500",
                        }[svc.glow]
                      }`}
                    >
                      {svc.tag}
                    </span>
                    <StatusBadge status={svc.status} />
                  </div>

                  {/* Icon */}
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border bg-white/5 ${
                      {
                        cyan:   "border-cyan-500/30",
                        red:    "border-red-500/30",
                        purple: "border-purple-500/30",
                        orange: "border-orange-500/30",
                      }[svc.glow]
                    }`}
                  >
                    <svc.icon
                      className={`h-7 w-7 ${
                        {
                          cyan:   "text-cyan-400",
                          red:    "text-red-400",
                          purple: "text-purple-400",
                          orange: "text-orange-400",
                        }[svc.glow]
                      }`}
                    />
                  </div>

                  {/* Text */}
                  <div className="mb-5 flex-1">
                    <h3 className="mb-1 text-base font-black text-white">{svc.title}</h3>
                    <p
                      className={`mb-3 text-[11px] font-semibold tracking-wider ${
                        {
                          cyan: "text-cyan-500", red: "text-red-500",
                          purple: "text-purple-500", orange: "text-orange-500",
                        }[svc.glow]
                      }`}
                    >
                      {svc.subtitle}
                    </p>
                    <p className="text-xs leading-relaxed text-white/40">{svc.description}</p>
                  </div>

                  {/* Feature list (compact) */}
                  <div className="mb-5 space-y-1">
                    {svc.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-white/30">
                        <div
                          className={`h-1 w-1 rounded-full ${
                            { cyan: "bg-cyan-500", red: "bg-red-500", purple: "bg-purple-500", orange: "bg-orange-500" }[svc.glow]
                          }`}
                        />
                        <span className="text-[11px]">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold tracking-widest transition-all duration-300 border ${
                      {
                        cyan:   "border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/15",
                        red:    "border-red-500/30 text-red-400 hover:bg-red-500/15",
                        purple: "border-purple-500/30 text-purple-400 hover:bg-purple-500/15",
                        orange: "border-orange-500/30 text-orange-400 hover:bg-orange-500/15",
                      }[svc.glow]
                    } bg-white/[0.03]`}
                    onClick={(e) => { e.stopPropagation(); goToPage(svc); }}
                  >
                    LAUNCH <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </CyberCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Terminal decorator strip ─────────────────── */}
      <section className="border-y border-white/5 bg-black/80 px-8 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-xl border border-cyan-500/20 bg-black/80 p-5 font-mono">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-white/20">cyberops@terminal:~$</span>
            </div>
            <div className="space-y-1 text-xs md:text-sm">
              <p>
                <span className="text-cyan-400">cyberops@root</span>
                <span className="text-white/40">:~$ </span>
                <span className="text-white/80">./initialize --modules=all --mode=stealth</span>
              </p>
              <p className="text-green-400">✓ Password Analysis Engine loaded</p>
              <p className="text-green-400">✓ Cracking module initialized [GPU: RTX 4090 detected]</p>
              <p className="text-green-400">✓ Phishing mail service ready [SMTP relay configured]</p>
              <p className="text-orange-400">⚡ Threat Detection AI model online [99.7% accuracy]</p>
              <p className="text-white/30 mt-3">
                <span className="text-cyan-400">cyberops@root</span>
                <span className="text-white/40">:~$ </span>
                <span className="animate-pulse text-white/60">▋</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Warning banner ───────────────────────────── */}
      <section className="bg-yellow-500/5 border-y border-yellow-500/20 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 text-center">
          <AlertTriangle className="h-4 w-4 flex-shrink-0 text-yellow-400" />
          <p className="text-xs text-yellow-400/70">
            <span className="font-bold text-yellow-400">AUTHORIZED USE ONLY</span>{" "}
            — This platform is intended for ethical security research and penetration testing on systems you own or have explicit permission to test. Unauthorized use is illegal.
          </p>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="border-t border-white/5 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-cyan-400" />
            <span className="text-sm font-bold">
              <span className="text-white">CYBER</span><span className="text-cyan-400">OPS</span>
            </span>
          </div>
          <p className="text-xs text-white/20">
            © 2026 CyberOps Security Platform · For authorized ethical testing only
          </p>
          <div className="flex items-center gap-1 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            <span className="text-xs font-bold text-cyan-400">SYSTEMS NOMINAL</span>
          </div>
        </div>
      </footer>

      {/* ── Detail modal ─────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <ServiceModal service={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}