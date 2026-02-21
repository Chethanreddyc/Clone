import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ChevronLeft, AlertTriangle } from "lucide-react";

/* ─── Phone mockup slides ─────────────────────────── */
const phoneSlides = [
  "https://i.ibb.co/7G0QKLT/ig-screen1.png",
  "https://i.ibb.co/YQQ9xxJ/ig-screen2.png",
  "https://i.ibb.co/mDsjjhp/ig-screen3.png",
];

/* ─── Instagram SVG logo (wordmark) ──────────────── */
function IgLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 175 50"
      className="h-[52px] w-auto"
      aria-label="Instagram"
    >
      <path
        d="M17.5 5C10.6 5 5 10.6 5 17.5v15C5 39.4 10.6 45 17.5 45h15C39.4 45 45 39.4 45 32.5v-15C45 10.6 39.4 5 32.5 5h-15zm0-5h15C40.1 0 50 9.9 50 22.5v5C50 40.1 40.1 50 27.5 50h-10C7.9 50 -2 40.1 -2 27.5v-5C-2 9.9 7.9 0 20.5 0z"
        fill="none"
      />
      {/* Instagram text wordmark path */}
      <text
        x="8"
        y="36"
        fontFamily="'Billabong', 'Grand Hotel', cursive"
        fontSize="42"
        fill="#262626"
        letterSpacing="-1"
      >
        Instagram
      </text>
    </svg>
  );
}

/* ─── Inline Instagram wordmark using font-face trick ─ */
function InstagramWordmark() {
  return (
    <div
      style={{
        fontFamily: "'Segoe Script', 'Brush Script MT', 'Palatino Linotype', cursive",
        fontSize: "36px",
        fontWeight: "400",
        letterSpacing: "-0.5px",
        color: "#262626",
        lineHeight: 1.2,
      }}
    >
      Instagram
    </div>
  );
}

/* ─── Phone carousel ─────────────────────────────── */
function PhoneCarousel() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFrame((f) => (f + 1) % 4), 3000);
    return () => clearInterval(t);
  }, []);

  // Simulated phone screenshots using placeholder designs
  const screens = [
    {
      bg: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",
      title: "Explore",
      items: [
        { w: "48%", h: "90px", br: 4 },
        { w: "48%", h: "90px", br: 4 },
        { w: "30%", h: "58px", br: 4 },
        { w: "30%", h: "58px", br: 4 },
        { w: "30%", h: "58px", br: 4 },
      ],
    },
    {
      bg: "linear-gradient(135deg,#405de6,#5851db,#833ab4)",
      title: "Reels",
      items: [{ w: "100%", h: "160px", br: 8 }],
    },
    {
      bg: "linear-gradient(135deg,#f7797d,#FBD786,#C6FFDD)",
      title: "Stories",
      items: [
        { w: "50px", h: "50px", br: 50 },
        { w: "50px", h: "50px", br: 50 },
        { w: "50px", h: "50px", br: 50 },
        { w: "100%", h: "100px", br: 8 },
      ],
    },
    {
      bg: "linear-gradient(135deg,#11998e,#38ef7d)",
      title: "Feed",
      items: [
        { w: "40px", h: "40px", br: 50 },
        { w: "100%", h: "120px", br: 4 },
        { w: "60%", h: "14px", br: 4 },
        { w: "80%", h: "14px", br: 4 },
      ],
    },
  ];

  return (
    <div className="relative mx-auto h-[432px] w-[255px]">
      {/* Phone frame image (SVG drawn) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <svg viewBox="0 0 255 432" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Outer body */}
          <rect x="1" y="1" width="253" height="430" rx="36" fill="#1a1a1a" />
          {/* Screen bezel */}
          <rect x="10" y="14" width="235" height="404" rx="28" fill="#111" />
          {/* Screen area */}
          <rect x="16" y="22" width="223" height="388" rx="22" fill="#fff" />
          {/* Side buttons */}
          <rect x="0" y="100" width="3" height="50" rx="2" fill="#333" />
          <rect x="0" y="160" width="3" height="50" rx="2" fill="#333" />
          <rect x="252" y="120" width="3" height="70" rx="2" fill="#333" />
          {/* Camera notch */}
          <rect x="100" y="14" width="55" height="8" rx="4" fill="#050505" />
          {/* Home indicator */}
          <rect x="97" y="418" width="61" height="4" rx="2" fill="#444" />
        </svg>
      </div>

      {/* Screen content */}
      <div className="absolute left-[16px] top-[22px] right-[16px] bottom-[22px] overflow-hidden rounded-[22px] z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={frame}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 p-3 flex flex-col gap-2"
            style={{ background: screens[frame].bg }}
          >
            {/* Status bar */}
            <div className="flex justify-between items-center px-1 mb-1">
              <span className="text-[9px] font-bold text-white/90">9:41</span>
              <div className="flex gap-1 items-center">
                <div className="w-3 h-2 border border-white/80 rounded-sm relative">
                  <div className="absolute inset-[1px] right-[3px] bg-white/80 rounded-sm" />
                  <div className="absolute right-[-3px] top-[3px] w-[2px] h-2 bg-white/50 rounded-sm" />
                </div>
              </div>
            </div>
            {/* Screen title */}
            <div className="text-white/90 text-[11px] font-bold px-1 mb-1">
              {screens[frame].title}
            </div>
            {/* Placeholder content blocks */}
            <div className="flex flex-wrap gap-2">
              {screens[frame].items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    width: item.w,
                    height: item.h,
                    borderRadius: item.br,
                    background: "rgba(255,255,255,0.25)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Instagram top bar */}
        <div
          className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-3 z-20"
          style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(4px)" }}
        >
          <div className="text-white text-[9px] font-black tracking-tight">instagram</div>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-white/40" />
            <div className="w-3 h-3 rounded-full bg-white/40" />
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {screens.map((_, i) => (
          <button
            key={i}
            onClick={() => setFrame(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              frame === i ? "w-4 bg-[#3897f0]" : "w-1.5 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Phishing watermark banner ─────────────────── */
function PhishingBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 py-1.5 text-center">
      <div className="flex items-center justify-center gap-2">
        <AlertTriangle className="h-3.5 w-3.5 text-white" />
        <span className="text-[11px] font-black tracking-widest text-white">
          CYBEROPS — PHISHING SIMULATION DEMO · FOR ETHICAL TESTING ONLY
        </span>
        <AlertTriangle className="h-3.5 w-3.5 text-white" />
      </div>
    </div>
  );
}

/* ─── Main Instagram Login Clone ─────────────────── */
export default function InstagramLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captured, setCaptured] = useState(false);

  const canSubmit = username.trim().length > 0 && password.length > 0;

  const handleLogin = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    // Simulate credential capture
    setTimeout(() => {
      setLoading(false);
      setCaptured(true);
    }, 1500);
  };

  if (captured) {
    return (
      <div className="min-h-screen bg-[#020408] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md overflow-hidden rounded-2xl border border-red-500/30 bg-black/80 p-8 text-center backdrop-blur-xl"
        >
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-red-500/50 bg-red-500/10">
              <AlertTriangle className="h-10 w-10 text-red-400" />
            </div>
          </div>
          <p className="mb-1 text-[10px] font-black tracking-[0.4em] text-red-400">
            PHISHING SIMULATION COMPLETE
          </p>
          <h2 className="mb-3 text-2xl font-black text-white">Credentials Captured!</h2>
          <p className="mb-6 text-sm text-white/50 leading-relaxed">
            In a real phishing attack, the following credentials would now be sent to an attacker's server.
          </p>
          <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 font-mono text-left text-sm">
            <div className="mb-2 flex items-center gap-2 text-white/30 text-xs">
              <span>captured_credentials.json</span>
            </div>
            <div className="space-y-1">
              <p className="text-white/60">
                <span className="text-green-400">"username"</span>:{" "}
                <span className="text-yellow-400">"{username}"</span>
              </p>
              <p className="text-white/60">
                <span className="text-green-400">"password"</span>:{" "}
                <span className="text-yellow-400">"{password}"</span>
              </p>
              <p className="text-white/60">
                <span className="text-green-400">"timestamp"</span>:{" "}
                <span className="text-yellow-400">"{new Date().toISOString()}"</span>
              </p>
              <p className="text-white/60">
                <span className="text-green-400">"page"</span>:{" "}
                <span className="text-yellow-400">"instagram_clone"</span>
              </p>
            </div>
          </div>
          <div className="mb-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-left">
            <p className="mb-2 text-xs font-black tracking-widest text-yellow-400">⚠ AWARENESS TIPS</p>
            <ul className="space-y-1.5 text-xs text-yellow-400/70">
              <li>• Always check the URL before entering credentials</li>
              <li>• Instagram only lives at instagram.com</li>
              <li>• Enable 2-factor authentication on all accounts</li>
              <li>• Never enter passwords on links sent via email/DM</li>
            </ul>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setUsername(""); setPassword(""); setCaptured(false); }}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-bold text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 rounded-xl border border-red-500/40 bg-red-500/10 py-3 text-xs font-bold text-red-400 transition hover:bg-red-500/20"
            >
              Back to CyberOps
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <PhishingBanner />

      {/* Back button overlay */}
      <button
        onClick={() => navigate('/phishing')}  // Back to phishing page
        className="fixed left-4 top-10 z-40 flex items-center gap-1.5 rounded-lg bg-white/80 px-3 py-1.5 text-xs font-bold text-gray-600 shadow-md backdrop-blur-sm transition hover:bg-white hover:text-gray-900 border border-gray-200"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Back to CyberOps
      </button>

      {/* Main content */}
      <div className="flex min-h-screen items-center justify-center px-4 pt-10 pb-10">
        <div className="flex w-full max-w-[935px] items-center justify-between gap-8">

          {/* ── Left: Phone carousel (desktop only) ── */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <PhoneCarousel />
          </div>

          {/* ── Right: Login form ─────────────────── */}
          <div className="w-full max-w-[350px] mx-auto lg:mx-0">
            {/* Login card */}
            <div className="border border-[#dbdbdb] bg-white px-10 pb-6 pt-10 mb-3">
              {/* Logo */}
              <div className="mb-8 flex justify-center">
                <InstagramWordmark />
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-2">
                {/* Username input */}
                <div className="relative">
                  <input
                    id="ig-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="peer w-full rounded-[3px] border border-[#dbdbdb] bg-[#fafafa] px-2 py-0 text-xs text-[#262626] outline-none placeholder-transparent transition-all focus:border-[#a2a2a2] focus:bg-white"
                    style={{ height: "36px", paddingTop: username ? "10px" : "0", paddingBottom: username ? "0" : "0" }}
                    placeholder="Phone number, username, or email"
                    autoComplete="username"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                  {/* Floating label */}
                  <label
                    htmlFor="ig-username"
                    className={`pointer-events-none absolute left-2 text-[#8e8e8e] transition-all duration-100 ${
                      username
                        ? "top-[4px] text-[9px] font-normal"
                        : "top-[50%] -translate-y-1/2 text-xs"
                    }`}
                  >
                    Phone number, username, or email
                  </label>
                </div>

                {/* Password input */}
                <div className="relative">
                  <input
                    id="ig-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer w-full rounded-[3px] border border-[#dbdbdb] bg-[#fafafa] px-2 pr-16 text-xs text-[#262626] outline-none placeholder-transparent transition-all focus:border-[#a2a2a2] focus:bg-white"
                    style={{ height: "36px", paddingTop: password ? "10px" : "0", paddingBottom: password ? "0" : "0" }}
                    placeholder="Password"
                    autoComplete="current-password"
                  />
                  {/* Floating label */}
                  <label
                    htmlFor="ig-password"
                    className={`pointer-events-none absolute left-2 text-[#8e8e8e] transition-all duration-100 ${
                      password
                        ? "top-[4px] text-[9px] font-normal"
                        : "top-[50%] -translate-y-1/2 text-xs"
                    }`}
                  >
                    Password
                  </label>
                  {/* Show/Hide */}
                  {password && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-[#262626] transition hover:text-[#8e8e8e]"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  )}
                </div>

                {/* Log in button */}
                <div className="pt-2">
                  <button
                    id="ig-login-btn"
                    type="submit"
                    disabled={!canSubmit || loading}
                    className="w-full rounded-lg py-1.5 text-sm font-bold text-white transition-all duration-200 disabled:opacity-40"
                    style={{
                      background: canSubmit
                        ? "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)"
                        : "#b2dffc",
                      backgroundColor: canSubmit ? undefined : "#b2dffc",
                    }}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Logging in...
                      </span>
                    ) : (
                      "Log in"
                    )}
                  </button>
                </div>
              </form>

              {/* OR divider */}
              <div className="relative my-4 flex items-center">
                <div className="flex-1 border-t border-[#dbdbdb]" />
                <span className="mx-4 text-[13px] font-semibold text-[#8e8e8e]">OR</span>
                <div className="flex-1 border-t border-[#dbdbdb]" />
              </div>

              {/* Facebook login */}
              <button className="group flex w-full items-center justify-center gap-2 py-1 text-sm font-bold text-[#385185] transition hover:text-[#1877f2]">
                {/* Facebook F icon */}
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="#385185">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Log in with Facebook
              </button>

              {/* Forgot password */}
              <div className="mt-4 text-center">
                <a href="#" className="text-xs text-[#00376b] hover:text-[#1c1c1c]" onClick={(e) => e.preventDefault()}>
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Sign up box */}
            <div className="border border-[#dbdbdb] bg-white py-4 text-center text-sm">
              <span className="text-[#262626]">Don't have an account? </span>
              <a href="#" className="font-bold text-[#0095f6] hover:text-[#1877f2]" onClick={(e) => e.preventDefault()}>
                Sign up
              </a>
            </div>

            {/* Get the app */}
            <div className="mt-5 text-center">
              <p className="mb-4 text-sm text-[#262626]">Get the app.</p>
              <div className="flex items-center justify-center gap-3">
                {/* App Store */}
                <a href="#" onClick={(e) => e.preventDefault()} className="opacity-90 hover:opacity-100 transition">
                  <div className="flex h-[40px] w-[136px] items-center gap-2 rounded-lg border border-[#dbdbdb] bg-[#262626] px-3">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0" fill="white">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div className="text-left">
                      <p className="text-[7px] text-white/70 leading-none">Download on the</p>
                      <p className="text-[11px] font-bold text-white leading-none mt-0.5">App Store</p>
                    </div>
                  </div>
                </a>
                {/* Google Play */}
                <a href="#" onClick={(e) => e.preventDefault()} className="opacity-90 hover:opacity-100 transition">
                  <div className="flex h-[40px] w-[136px] items-center gap-2 rounded-lg border border-[#dbdbdb] bg-[#262626] px-3">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0" fill="white">
                      <path d="M3.18 23.76c.39.22.83.24 1.24.05l11.34-6.37-2.5-2.5-10.08 8.82zM.5 1.5C.19 1.93 0 2.5 0 3.2v17.6c0 .7.19 1.27.5 1.7L.6 22.6l9.86-9.87V12.6L.6 2.73.5 1.5zM20.32 10.5l-2.95-1.66-2.79 2.79 2.79 2.79 2.97-1.67c.85-.48.85-1.26-.02-1.25zm-17.14 12.18L14.52 16l-2.5-2.5L2.18 23.76l.5.92-.5-.5z" />
                    </svg>
                    <div className="text-left">
                      <p className="text-[7px] text-white/70 leading-none">Get it on</p>
                      <p className="text-[11px] font-bold text-white leading-none mt-0.5">Google Play</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#fafafa] border-t border-[#dbdbdb] pb-8 pt-6">
        <div className="mx-auto max-w-[935px] px-4">
          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-4">
            {[
              "Meta","About","Blog","Jobs","Help","API","Privacy","Terms",
              "Top Accounts","Hashtags","Locations","Instagram Lite",
              "Threads","Contact Uploading & Non-Users","Meta Verified",
            ].map((link) => (
              <a
                key={link}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[11px] text-[#8e8e8e] hover:text-[#262626] transition"
              >
                {link}
              </a>
            ))}
          </div>
          {/* Language + Copyright */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <select className="appearance-none cursor-pointer bg-transparent text-[12px] text-[#8e8e8e] outline-none">
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
            </select>
            <span className="text-[12px] text-[#8e8e8e]">
              © 2026 Instagram from Meta
            </span>
          </div>
        </div>
      </footer>

      {/* Phishing overlay watermark (diagonal) */}
      <div
        className="pointer-events-none fixed inset-0 flex items-center justify-center z-10 overflow-hidden"
        style={{ opacity: 0.035 }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute font-black text-red-600 select-none whitespace-nowrap"
            style={{
              fontSize: "48px",
              transform: `rotate(-35deg) translateY(${(i - 4) * 120}px)`,
              letterSpacing: "4px",
            }}
          >
            PHISHING DEMO · CYBEROPS ·
          </div>
        ))}
      </div>
    </div>
  );
}
