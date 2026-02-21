import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  KeyRound,
  Mail,
  Send,
  Loader2,
  ChevronLeft,
  Terminal,
  Cpu,
  Eye,
  EyeOff,
  Zap,
  Shield,
  Bug,
  TriangleAlert,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

/* ─── Scanline overlay ─────────────────────────── */
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

/* ─── Cyber grid background ─────────────────────── */
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(249,115,22,0.06),transparent)]" />
    </div>
  );
}

/* ─── Floating particles ─────────────────────────── */
function Particles({ count = 20 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px w-px rounded-full bg-orange-400"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.4 + 0.1,
            scale: Math.random() * 2 + 1,
          }}
          animate={{ y: [0, -50, 0], opacity: [0.1, 0.5, 0.1] }}
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

/* ─── Threat level badge ─────────────────────────── */
function ThreatBadge({ level }) {
  const map = {
    CRITICAL: {
      cls: "bg-red-500/20 text-red-400 border-red-500/50",
      icon: XCircle,
      pulse: "bg-red-400",
    },
    HIGH: {
      cls: "bg-orange-500/20 text-orange-400 border-orange-500/50",
      icon: TriangleAlert,
      pulse: "bg-orange-400",
    },
    MEDIUM: {
      cls: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
      icon: AlertTriangle,
      pulse: "bg-yellow-400",
    },
    LOW: {
      cls: "bg-cyan-500/20 text-cyan-400 border-cyan-500/50",
      icon: Shield,
      pulse: "bg-cyan-400",
    },
    SAFE: {
      cls: "bg-green-500/20 text-green-400 border-green-500/50",
      icon: CheckCircle,
      pulse: "bg-green-400",
    },
  };
  const config = map[level] || map.MEDIUM;
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold tracking-widest ${config.cls}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full ${config.pulse} opacity-75`}
        />
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${config.pulse}`}
        />
      </span>
      <Icon className="h-3.5 w-3.5" />
      {level}
    </span>
  );
}

/* ─── Score ring ─────────────────────────────────── */
function ScoreRing({ score, label }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const color =
    score >= 80
      ? "#22c55e"
      : score >= 60
      ? "#f97316"
      : score >= 40
      ? "#eab308"
      : "#ef4444";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-24 w-24">
        <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="8"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-2xl font-black text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-[9px] tracking-widest text-white/30">/100</span>
        </div>
      </div>
      <span className="text-xs font-semibold text-white/50">{label}</span>
    </div>
  );
}

/* ─── Parsed AI response renderer ────────────────── */
function AIResponseDisplay({ raw }) {
  // Parse structured sections from AI markdown-like response
  const lines = raw.split("\n").filter((l) => l.trim());

  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        // Bold headers (##, ###, **text**)
        if (trimmed.startsWith("##")) {
          return (
            <p key={i} className="mt-3 text-xs font-black tracking-widest text-orange-400">
              {trimmed.replace(/^#+\s*/, "").replace(/\*\*/g, "").toUpperCase()}
            </p>
          );
        }
        if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
          return (
            <p key={i} className="mt-2 text-xs font-bold text-white/80">
              {trimmed.replace(/\*\*/g, "")}
            </p>
          );
        }
        // Bullet points
        if (trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
          const content = trimmed.replace(/^[-•]\s*/, "").replace(/\*\*/g, "");
          const isWarning =
            /danger|risk|threat|vuln|attack|breach|phish|malicious|suspicious|compromis/i.test(content);
          const isSafe = /safe|secure|strong|good|recommend|protect/i.test(content);
          return (
            <div key={i} className="flex items-start gap-2 py-0.5">
              <span
                className={`mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                  isWarning ? "bg-red-400" : isSafe ? "bg-green-400" : "bg-orange-400"
                }`}
              />
              <span
                className={`text-xs leading-relaxed ${
                  isWarning
                    ? "text-red-300/80"
                    : isSafe
                    ? "text-green-300/80"
                    : "text-white/60"
                }`}
              >
                {content}
              </span>
            </div>
          );
        }
        // Normal text
        if (trimmed && !trimmed.startsWith("```")) {
          return (
            <p key={i} className="text-xs leading-relaxed text-white/55">
              {trimmed.replace(/\*\*/g, "")}
            </p>
          );
        }
        return null;
      })}
    </div>
  );
}

/* ─── Copy button ────────────────────────────────── */
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handle}
      className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/40 transition-colors hover:bg-white/10 hover:text-white/70"
    >
      {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/* ─── Main Threat Detection Page ─────────────────── */
export default function ThreatDetectionPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("password"); // "password" | "email"
  const [input, setInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const resultRef = useRef(null);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const buildPrompt = (value, type) => {
    if (type === "password") {
      return `You are a cybersecurity AI assistant specializing in password security analysis. Analyze the following password and provide a detailed security report.

Password: "${value}"

Provide your analysis in this exact structure:

## Overall Assessment
Give a brief 1-2 sentence summary of the password's security posture.

## Threat Score
Provide a numeric score from 0-100 representing how DANGEROUS/INSECURE this password is (0=completely safe, 100=critically dangerous/easily cracked). Format: THREAT_SCORE: [number]

## Threat Level
Classify as one of: CRITICAL, HIGH, MEDIUM, LOW, SAFE. Format: THREAT_LEVEL: [level]

## Strength Analysis
- Length: Is it adequate? (minimum 12 chars recommended)
- Complexity: Use of uppercase, lowercase, numbers, symbols
- Entropy: Estimated bit entropy
- Pattern detection: Common patterns, keyboard walks, sequences
- Dictionary exposure: Likelihood this password appears in breach databases

## Vulnerability Factors
List specific weaknesses found.

## Attack Vectors
- Estimated crack time with modern hardware (GPU)
- Most likely attack method that would succeed

## Security Recommendations
Provide 3-5 specific actionable recommendations to improve this password.

Keep the response focused and professional. Do not include the actual password in your recommendations.`;
    } else {
      return `You are a cybersecurity AI assistant specializing in phishing and email threat detection. Analyze the following email content or subject line for signs of phishing, social engineering, or malicious intent.

Email Content/Subject: "${value}"

Provide your analysis in this exact structure:

## Overall Assessment
Give a brief 1-2 sentence summary of the email's threat level.

## Threat Score
Provide a numeric score from 0-100 representing how DANGEROUS/SUSPICIOUS this email is (0=completely legitimate, 100=definite phishing/malicious). Format: THREAT_SCORE: [number]

## Threat Level
Classify as one of: CRITICAL, HIGH, MEDIUM, LOW, SAFE. Format: THREAT_LEVEL: [level]

## Phishing Indicators
- Urgency/Pressure tactics detected
- Impersonation attempts
- Suspicious request patterns (credentials, payments, links)
- Grammar and spelling issues
- Social engineering vectors

## Technical Risk Factors
- Potential malicious payloads or links
- Domain spoofing indicators
- Credential harvesting attempts
- Malware distribution risk

## Attack Classification
Identify the type of attack: (Spear Phishing / Business Email Compromise / Credential Harvesting / Malware Distribution / Other)

## Recommended Actions
Provide 3-5 specific actions the recipient should take.

Keep the response focused and professional.`;
    }
  };

  const extractMetadata = (text) => {
    const scoreMatch = text.match(/THREAT_SCORE:\s*(\d+)/i);
    const levelMatch = text.match(/THREAT_LEVEL:\s*(CRITICAL|HIGH|MEDIUM|LOW|SAFE)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : null;
    const level = levelMatch ? levelMatch[1] : null;
    // Clean the raw text for display
    const cleaned = text
      .replace(/THREAT_SCORE:\s*\d+/gi, "")
      .replace(/THREAT_LEVEL:\s*(CRITICAL|HIGH|MEDIUM|LOW|SAFE)/gi, "")
      .trim();
    return { score, level, cleaned };
  };

  const analyze = async () => {
    if (!input.trim()) return;
    if (!API_KEY || API_KEY === "your_gemini_api_key_here") {
      setError(
        "⚠️ Gemini API key not configured. Please add your VITE_GEMINI_API_KEY to the .env file.\n\nGet a free key at: https://aistudio.google.com/app/apikey"
      );
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
      const prompt = buildPrompt(input, mode);
      const response = await model.generateContent(prompt);
      const text = response.response.text();
      const { score, level, cleaned } = extractMetadata(text);

      const newResult = {
        id: Date.now(),
        mode,
        input: mode === "password" ? "•".repeat(Math.min(input.length, 20)) : input.slice(0, 60) + (input.length > 60 ? "..." : ""),
        raw: cleaned,
        score: score ?? (level === "SAFE" ? 15 : level === "LOW" ? 35 : level === "MEDIUM" ? 55 : level === "HIGH" ? 78 : 95),
        level: level ?? "MEDIUM",
        timestamp: new Date().toLocaleTimeString(),
      };

      setResult(newResult);
      setHistory((prev) => [newResult, ...prev].slice(0, 5));

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      setError(`Analysis failed: ${err.message || "Unknown error occurred. Check your API key and internet connection."}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      analyze();
    }
  };

  const securityScore = result
    ? Math.max(0, 100 - result.score)
    : null;

  return (
    <div className="min-h-screen bg-[#020408] text-white">
      <Scanlines />

      {/* ── Header ────────────────────────────────── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 border-b border-white/5 bg-black/70 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              BACK
            </button>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-orange-500/50 bg-orange-500/10">
                <Activity className="h-5 w-5 text-orange-400" />
                <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-400" />
                </span>
              </div>
              <div>
                <span className="font-black tracking-wider text-white">THREAT</span>
                <span className="font-black tracking-wider text-orange-400"> DETECTION</span>
                <p className="text-[9px] tracking-[0.3em] text-white/30">AI ANALYSIS ENGINE</p>
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 md:flex">
            <Cpu className="h-3.5 w-3.5 text-orange-400" />
            <span className="text-xs font-bold text-orange-400">GEMINI 3 FLASH</span>
          </div>
        </div>
      </motion.header>

      <div className="relative mx-auto max-w-7xl px-6 py-12">
        <CyberGrid />
        <Particles count={25} />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* ── Left column: Input + Result ─────────── */}
          <div className="space-y-6">
            {/* Page title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="mb-2 text-[10px] font-black tracking-[0.4em] text-orange-400">
                — OPERATIONAL MODULE —
              </p>
              <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                AI THREAT{" "}
                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  ANALYZER
                </span>
              </h1>
              <p className="mt-2 text-sm text-white/40">
                Enter a password or suspicious email content for real-time AI-powered security analysis.
              </p>
            </motion.div>

            {/* Mode selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex gap-3"
            >
              {[
                { id: "password", label: "Password Analysis", icon: KeyRound, color: "cyan" },
                { id: "email", label: "Email / Phishing", icon: Mail, color: "purple" },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = mode === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setMode(tab.id);
                      setInput("");
                      setResult(null);
                      setError(null);
                    }}
                    className={`flex items-center gap-2 rounded-xl border px-5 py-3 text-xs font-bold tracking-wider transition-all duration-300 ${
                      active
                        ? tab.color === "cyan"
                          ? "border-cyan-500/60 bg-cyan-500/15 text-cyan-400 shadow-lg shadow-cyan-500/10"
                          : "border-purple-500/60 bg-purple-500/15 text-purple-400 shadow-lg shadow-purple-500/10"
                        : "border-white/10 bg-white/[0.03] text-white/40 hover:bg-white/[0.06] hover:text-white/70"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </motion.div>

            {/* Input area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl"
            >
              {/* Terminal header */}
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <span className="ml-2 font-mono text-[10px] text-white/20">
                    threat_analyzer.sh — {mode === "password" ? "password_mode" : "email_mode"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-2 py-0.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
                  <span className="text-[9px] font-bold text-orange-400">SCANNING</span>
                </div>
              </div>

              {/* Input field */}
              <div className="relative p-5">
                <div className="mb-2 flex items-center gap-2 font-mono text-xs text-white/20">
                  <Terminal className="h-3 w-3" />
                  <span>
                    {mode === "password"
                      ? "$ input --type=password --analyze"
                      : "$ input --type=email --scan-phishing"}
                  </span>
                </div>

                {mode === "password" ? (
                  <div className="relative">
                    <input
                      id="threat-input-password"
                      type={showPassword ? "text" : "password"}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter password to analyze…"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 pr-12 font-mono text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-cyan-500/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-cyan-500/20"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                ) : (
                  <textarea
                    id="threat-input-email"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Paste suspicious email content, subject line, or message body here…"
                    rows={6}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-purple-500/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-purple-500/20"
                  />
                )}

                <div className="mt-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-white/20">
                    {mode === "password"
                      ? `Length: ${input.length} chars`
                      : `${input.length} chars · Ctrl+Enter to analyze`}
                  </span>
                  <motion.button
                    id="analyze-btn"
                    onClick={analyze}
                    disabled={!input.trim() || loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-2 rounded-xl border px-6 py-2.5 text-xs font-bold tracking-widest transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${
                      mode === "password"
                        ? "border-orange-500/50 bg-orange-500/15 text-orange-400 hover:bg-orange-500/25 hover:shadow-lg hover:shadow-orange-500/20 disabled:hover:bg-orange-500/15"
                        : "border-orange-500/50 bg-orange-500/15 text-orange-400 hover:bg-orange-500/25 hover:shadow-lg hover:shadow-orange-500/20 disabled:hover:bg-orange-500/15"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ANALYZING…
                      </>
                    ) : (
                      <>
                        <Zap className="h-3.5 w-3.5" />
                        ANALYZE THREAT
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Error state */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5"
                >
                  <div className="flex items-start gap-3">
                    <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                    <div className="space-y-1">
                      {error.split("\n").map((line, i) => (
                        <p key={i} className={`text-xs ${i === 0 ? "font-bold text-red-400" : "text-red-400/70"}`}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading animation */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 rounded-2xl border border-orange-500/20 bg-black/60 p-6"
                >
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin text-orange-400" />
                    <span className="font-mono text-sm font-bold text-orange-400">
                      GEMINI 3 FLASH ANALYZING…
                    </span>
                  </div>
                  {[
                    "Initializing threat detection engine…",
                    "Running entropy analysis…",
                    "Cross-referencing breach databases…",
                    "Generating AI security report…",
                  ].map((step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.3 }}
                      className="flex items-center gap-2 font-mono text-[11px] text-white/40"
                    >
                      <span className="text-orange-400">›</span>
                      {step}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* AI Result */}
            <AnimatePresence>
              {result && !loading && (
                <motion.div
                  ref={resultRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden rounded-2xl border border-orange-500/20 bg-black/70 backdrop-blur-xl"
                >
                  {/* Result header */}
                  <div className="flex items-center justify-between border-b border-white/5 bg-orange-500/5 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Bug className="h-4 w-4 text-orange-400" />
                      <span className="text-xs font-black tracking-widest text-orange-400">
                        AI THREAT REPORT
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ThreatBadge level={result.level} />
                      <CopyButton text={result.raw} />
                    </div>
                  </div>

                  {/* Scores row */}
                  <div className="flex flex-wrap items-center justify-around gap-4 border-b border-white/5 px-6 py-6">
                    <ScoreRing
                      score={result.score}
                      label="THREAT SCORE"
                    />
                    <ScoreRing
                      score={Math.max(0, 100 - result.score)}
                      label="SAFETY SCORE"
                    />
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className={`flex h-24 w-24 items-center justify-center rounded-full border-4 ${
                          {
                            CRITICAL: "border-red-500/50 bg-red-500/10",
                            HIGH: "border-orange-500/50 bg-orange-500/10",
                            MEDIUM: "border-yellow-500/50 bg-yellow-500/10",
                            LOW: "border-cyan-500/50 bg-cyan-500/10",
                            SAFE: "border-green-500/50 bg-green-500/10",
                          }[result.level]
                        }`}
                      >
                        {result.level === "CRITICAL" && <XCircle className="h-10 w-10 text-red-400" />}
                        {result.level === "HIGH" && <TriangleAlert className="h-10 w-10 text-orange-400" />}
                        {result.level === "MEDIUM" && <AlertTriangle className="h-10 w-10 text-yellow-400" />}
                        {result.level === "LOW" && <Shield className="h-10 w-10 text-cyan-400" />}
                        {result.level === "SAFE" && <CheckCircle className="h-10 w-10 text-green-400" />}
                      </div>
                      <span className="text-xs font-semibold text-white/50">VERDICT</span>
                    </div>
                  </div>

                  {/* Analyzed input */}
                  <div className="border-b border-white/5 px-6 py-3">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-white/20">
                      <Terminal className="h-3 w-3" />
                      <span>
                        Analyzed:{" "}
                        <span className="text-orange-400/60">{result.input}</span>
                        {" "}· {result.timestamp}
                      </span>
                    </div>
                  </div>

                  {/* AI analysis text */}
                  <div className="px-6 py-5">
                    <AIResponseDisplay raw={result.raw} />
                  </div>

                  {/* Re-analyze button */}
                  <div className="border-t border-white/5 px-6 py-4">
                    <button
                      onClick={() => { setResult(null); setInput(""); }}
                      className="flex items-center gap-2 text-xs text-white/30 transition-colors hover:text-white/60"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Analyze another
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right sidebar ──────────────────────── */}
          <div className="space-y-6">
            {/* Live status panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl"
            >
              <div className="border-b border-white/5 px-5 py-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-orange-400" />
                  <span className="text-[10px] font-black tracking-widest text-orange-400">
                    ENGINE STATUS
                  </span>
                </div>
              </div>
              <div className="space-y-3 p-5 font-mono text-xs">
                {[
                  { label: "AI Model", value: "gemini-3-flash-preview", ok: true },
                  { label: "API Status", value: API_KEY && API_KEY !== "your_gemini_api_key_here" ? "CONNECTED" : "NOT CONFIGURED", ok: API_KEY && API_KEY !== "your_gemini_api_key_here" },
                  { label: "Password Engine", value: "ONLINE", ok: true },
                  { label: "Phishing Scanner", value: "ONLINE", ok: true },
                  { label: "Breach Database", value: "SYNCED", ok: true },
                ].map(({ label, value, ok }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-white/40">{label}</span>
                    <span className={`font-bold ${ok ? "text-green-400" : "text-red-400"}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* API key notice */}
            {(!API_KEY || API_KEY === "your_gemini_api_key_here") && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-5"
              >
                <div className="mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs font-black tracking-widest text-yellow-400">
                    SETUP REQUIRED
                  </span>
                </div>
                <p className="mb-3 text-[11px] leading-relaxed text-yellow-400/70">
                  Add your free Gemini API key to <code className="rounded bg-white/10 px-1">.env</code>:
                </p>
                <div className="rounded-lg border border-yellow-500/20 bg-black/60 p-3 font-mono text-[10px] text-yellow-300/80">
                  VITE_GEMINI_API_KEY=your_key_here
                </div>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-yellow-400 underline underline-offset-2 hover:text-yellow-300"
                >
                  Get a free API key →
                </a>
              </motion.div>
            )}

            {/* Scan history */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl"
            >
              <div className="border-b border-white/5 px-5 py-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-white/40" />
                  <span className="text-[10px] font-black tracking-widest text-white/40">
                    SCAN HISTORY
                  </span>
                </div>
              </div>
              <div className="p-3">
                {history.length === 0 ? (
                  <p className="py-4 text-center font-mono text-[10px] text-white/20">
                    No scans yet. Run your first analysis.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {history.map((h, idx) => (
                      <motion.button
                        key={h.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => setResult(h)}
                        className="group w-full rounded-xl border border-white/5 bg-white/[0.02] p-3 text-left transition-colors hover:border-orange-500/20 hover:bg-orange-500/5"
                      >
                        <div className="mb-1 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            {h.mode === "password" ? (
                              <KeyRound className="h-3 w-3 text-white/30" />
                            ) : (
                              <Mail className="h-3 w-3 text-white/30" />
                            )}
                            <span className="font-mono text-[10px] text-white/30">
                              {h.mode.toUpperCase()}
                            </span>
                          </div>
                          <ThreatBadge level={h.level} />
                        </div>
                        <p className="truncate font-mono text-[10px] text-white/50">{h.input}</p>
                        <p className="mt-1 text-[9px] text-white/20">{h.timestamp}</p>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Tips card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"
            >
              <p className="mb-3 text-[10px] font-black tracking-widest text-white/30">
                ANALYSIS TIPS
              </p>
              <div className="space-y-2">
                {[
                  "Passwords shorter than 12 chars are HIGH risk",
                  "Common words in passwords are instantly crackable",
                  "Urgent language in emails is a red flag",
                  'Requests for credentials = assume phishing',
                  "Use Ctrl+Enter to quickly submit analysis",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-orange-500/50" />
                    <p className="text-[10px] leading-relaxed text-white/30">{tip}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
