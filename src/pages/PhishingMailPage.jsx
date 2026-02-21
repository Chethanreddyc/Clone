import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mail,
  Send,
  Eye,
  ChevronLeft,
  AlertTriangle,
  Terminal,
  CheckCircle,
  Loader2,
  Copy,
  Check,
  Smartphone,
  Shield,
  Lock,
  Trophy,
  RefreshCw,
  ExternalLink,
  FileText,
  ChevronDown,
  User,
  AtSign,
  Type,
} from "lucide-react";

/* ─── Scanlines ─────────────────────────────────── */
function Scanlines() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(168,85,247,0.15) 2px, rgba(168,85,247,0.15) 4px)",
      }}
    />
  );
}

/* ─── CyberGrid ─────────────────────────────────── */
function CyberGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `linear-gradient(rgba(168,85,247,0.1) 1px, transparent 1px),linear-gradient(90deg, rgba(168,85,247,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(168,85,247,0.08),transparent)]" />
    </div>
  );
}

/* ─── Email templates ────────────────────────────── */
const templates = [
  {
    id: "new-login",
    label: "New Login Alert",
    icon: Smartphone,
    subject: "We noticed a new login to your Instagram account",
    preview: "Your account was accessed from a new device...",
    body: (targetName) => `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #dbdbdb;border-radius:4px;overflow:hidden;max-width:600px;">
        <!-- Header gradient -->
        <tr><td style="background:linear-gradient(45deg,#833ab4,#fd1d1d,#fcb045);padding:40px 40px 30px;text-align:center;">
          <div style="font-family:'Segoe Script','Brush Script MT',cursive;font-size:38px;color:#ffffff;font-weight:400;letter-spacing:-1px;">Instagram</div>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:40px;">
          <h2 style="color:#262626;font-size:20px;font-weight:600;margin:0 0 16px;">We noticed a new login</h2>
          <p style="color:#262626;font-size:14px;line-height:1.6;margin:0 0 24px;">Hi ${targetName || "there"},</p>
          <p style="color:#262626;font-size:14px;line-height:1.6;margin:0 0 24px;">Your Instagram account was accessed from a new device. If this was you, you can ignore this message. If not, please secure your account immediately.</p>
          <!-- Alert box -->
          <div style="background:#fef3f2;border:1px solid #fecaca;border-radius:8px;padding:20px;margin:0 0 28px;">
            <p style="margin:0 0 8px;font-size:13px;color:#991b1b;font-weight:600;">⚠ New Login Details</p>
            <p style="margin:0 0 4px;font-size:13px;color:#662626;">Device: Chrome on Windows</p>
            <p style="margin:0 0 4px;font-size:13px;color:#662626;">Location: Unknown Location</p>
            <p style="margin:0;font-size:13px;color:#662626;">Time: ${new Date().toLocaleString()}</p>
          </div>
          <!-- CTA Button -->
          <div style="text-align:center;margin:0 0 28px;">
            <a href="https://jj-ig.netlify.app/login" style="background:linear-gradient(45deg,#833ab4,#fd1d1d,#fcb045);color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:14px 36px;border-radius:8px;display:inline-block;">Secure My Account</a>
          </div>
          <p style="color:#8e8e8e;font-size:12px;line-height:1.6;margin:0;">If you think you didn't do this, please <a href="#" style="color:#0095f6;">let us know</a>.</p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#fafafa;border-top:1px solid #dbdbdb;padding:20px 40px;text-align:center;">
          <p style="color:#8e8e8e;font-size:11px;margin:0 0 8px;">© 2026 Instagram from Meta · <a href="#" style="color:#8e8e8e;">Privacy Policy</a> · <a href="#" style="color:#8e8e8e;">Terms</a></p>
          <p style="color:#8e8e8e;font-size:11px;margin:0;">1601 Willow Rd, Menlo Park, CA 94025</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  },
  {
    id: "password-reset",
    label: "Password Reset Request",
    icon: Lock,
    subject: "Reset your Instagram password",
    preview: "We received a request to reset the password...",
    body: (targetName) => `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #dbdbdb;border-radius:4px;overflow:hidden;max-width:600px;">
        <tr><td style="background:linear-gradient(45deg,#405de6,#5851db,#833ab4,#c13584,#e1306c,#fd1d1d);padding:40px;text-align:center;">
          <div style="font-family:'Segoe Script','Brush Script MT',cursive;font-size:38px;color:#ffffff;">Instagram</div>
        </td></tr>
        <tr><td style="padding:40px;">
          <h2 style="color:#262626;font-size:20px;font-weight:600;margin:0 0 16px;">Reset Your Password</h2>
          <p style="color:#262626;font-size:14px;line-height:1.6;margin:0 0 16px;">Hi ${targetName || "there"},</p>
          <p style="color:#262626;font-size:14px;line-height:1.6;margin:0 0 24px;">We received a request to reset the password for your Instagram account. Click the button below to create a new password. This link will expire in <strong>1 hour</strong>.</p>
          <div style="text-align:center;margin:0 0 28px;">
            <a href="https://jj-ig.netlify.app/login" style="background:#0095f6;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:14px 36px;border-radius:8px;display:inline-block;">Reset Password</a>
          </div>
          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:16px;margin:0 0 24px;">
            <p style="margin:0;font-size:13px;color:#0369a1;">🔒 This link expires in 60 minutes for your security.</p>
          </div>
          <p style="color:#8e8e8e;font-size:13px;line-height:1.6;margin:0;">If you didn't request a password reset, you can safely ignore this email — your password won't be changed.</p>
        </td></tr>
        <tr><td style="background:#fafafa;border-top:1px solid #dbdbdb;padding:20px 40px;text-align:center;">
          <p style="color:#8e8e8e;font-size:11px;margin:0;">© 2026 Instagram from Meta · <a href="#" style="color:#8e8e8e;">Privacy Policy</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  },
  {
    id: "account-suspended",
    label: "Account Suspended",
    icon: Shield,
    subject: "Your Instagram account has been suspended",
    preview: "Action required: Your account has been temporarily suspended...",
    body: (targetName) => `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #dbdbdb;border-radius:4px;overflow:hidden;max-width:600px;">
        <tr><td style="background:#262626;padding:40px;text-align:center;">
          <div style="font-family:'Segoe Script','Brush Script MT',cursive;font-size:38px;color:#ffffff;">Instagram</div>
        </td></tr>
        <!-- Red alert bar -->
        <tr><td style="background:#dc2626;padding:16px 40px;text-align:center;">
          <p style="margin:0;color:#ffffff;font-size:14px;font-weight:700;">⛔ ACCOUNT SUSPENDED — ACTION REQUIRED</p>
        </td></tr>
        <tr><td style="padding:40px;">
          <h2 style="color:#262626;font-size:20px;font-weight:600;margin:0 0 16px;">Your Account Has Been Suspended</h2>
          <p style="color:#262626;font-size:14px;line-height:1.6;margin:0 0 16px;">Dear ${targetName || "Instagram User"},</p>
          <p style="color:#262626;font-size:14px;line-height:1.6;margin:0 0 24px;">Your Instagram account has been temporarily suspended due to a violation of our <a href="#" style="color:#0095f6;">Community Guidelines</a>. To restore access, you must verify your identity within <strong>24 hours</strong>.</p>
          <div style="background:#fef2f2;border-left:4px solid #dc2626;padding:16px 20px;margin:0 0 24px;border-radius:0 8px 8px 0;">
            <p style="margin:0 0 8px;font-size:13px;color:#991b1b;font-weight:600;">Reason for suspension:</p>
            <p style="margin:0;font-size:13px;color:#991b1b;">Suspicious login activity detected on your account</p>
          </div>
          <div style="text-align:center;margin:0 0 28px;">
            <a href="https://jj-ig.netlify.app/login" style="background:#dc2626;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:16px 40px;border-radius:8px;display:inline-block;text-transform:uppercase;letter-spacing:0.5px;">Verify &amp; Restore Account</a>
          </div>
          <p style="color:#8e8e8e;font-size:12px;line-height:1.6;margin:0;text-align:center;">Failure to verify within 24 hours will result in permanent account removal.</p>
        </td></tr>
        <tr><td style="background:#fafafa;border-top:1px solid #dbdbdb;padding:20px 40px;text-align:center;">
          <p style="color:#8e8e8e;font-size:11px;margin:0;">© 2026 Instagram from Meta · Trust & Safety Team</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  },
  {
    id: "verification",
    label: "Account Verification",
    icon: CheckCircle,
    subject: "Please verify your Instagram account",
    preview: "Complete verification to keep your account active...",
    body: (targetName) => `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #dbdbdb;border-radius:4px;overflow:hidden;max-width:600px;">
        <tr><td style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:40px;text-align:center;">
          <div style="font-family:'Segoe Script','Brush Script MT',cursive;font-size:38px;color:#ffffff;">Instagram</div>
          <div style="margin-top:16px;">
            <span style="background:rgba(255,255,255,0.2);border-radius:100px;padding:6px 18px;color:#ffffff;font-size:13px;font-weight:600;">✓ Verified Badge Program</span>
          </div>
        </td></tr>
        <tr><td style="padding:40px;">
          <h2 style="color:#262626;font-size:20px;font-weight:600;margin:0 0 16px;">Get Verified on Instagram</h2>
          <p style="color:#262626;font-size:14px;line-height:1.6;margin:0 0 16px;">Hi ${targetName || "there"},</p>
          <p style="color:#262626;font-size:14px;line-height:1.6;margin:0 0 24px;">Your account has been selected for Instagram's <strong>Blue Verification Badge</strong> program. Complete the verification process to receive your badge and unlock exclusive creator features.</p>
          <div style="display:flex;gap:16px;margin:0 0 24px;">
            ${["Blue Badge", "Priority Support", "Creator Tools"].map(b => `<div style="flex:1;background:#f0f4ff;border-radius:8px;padding:16px;text-align:center;"><p style="margin:0 0 4px;font-size:20px;">✓</p><p style="margin:0;font-size:12px;color:#4f46e5;font-weight:600;">${b}</p></div>`).join("")}
          </div>
          <div style="text-align:center;margin:0 0 24px;">
            <a href="https://jj-ig.netlify.app/login" style="background:linear-gradient(135deg,#667eea,#764ba2);color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:16px 40px;border-radius:8px;display:inline-block;">Start Verification →</a>
          </div>
          <p style="color:#8e8e8e;font-size:12px;text-align:center;">This offer expires in 48 hours.</p>
        </td></tr>
        <tr><td style="background:#fafafa;border-top:1px solid #dbdbdb;padding:20px 40px;text-align:center;">
          <p style="color:#8e8e8e;font-size:11px;margin:0;">© 2026 Instagram from Meta · <a href="#" style="color:#8e8e8e;">Unsubscribe</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  },
  {
    id: "prize-winner",
    label: "Prize Winner",
    icon: Trophy,
    subject: "🎉 Congratulations! You've won Instagram Creator Award",
    preview: "You've been selected as a top creator...",
    body: (targetName) => `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #dbdbdb;border-radius:4px;overflow:hidden;max-width:600px;">
        <tr><td style="background:linear-gradient(135deg,#f6d365 0%,#fda085 100%);padding:48px 40px;text-align:center;">
          <div style="font-size:48px;margin-bottom:8px;">🏆</div>
          <div style="font-family:'Segoe Script','Brush Script MT',cursive;font-size:38px;color:#ffffff;text-shadow:0 2px 8px rgba(0,0,0,0.2);">Instagram</div>
          <p style="color:rgba(255,255,255,0.9);font-size:16px;font-weight:700;margin:12px 0 0;letter-spacing:1px;">CREATOR AWARDS 2026</p>
        </td></tr>
        <tr><td style="padding:48px 40px;text-align:center;">
          <div style="font-size:36px;margin-bottom:8px;">🎉</div>
          <h2 style="color:#262626;font-size:24px;font-weight:700;margin:0 0 16px;">Congratulations, ${targetName || "Creator"}!</h2>
          <p style="color:#262626;font-size:14px;line-height:1.6;margin:0 0 24px;">Your account has been selected as a <strong>Top Creator</strong> for Instagram's 2026 Creator Awards. You've won a <strong>$500 Amazon Gift Card</strong> + an Instagram Creator Kit!</p>
          <div style="background:linear-gradient(135deg,#fef9eb,#fdf3d7);border:2px solid #f6c90e;border-radius:12px;padding:24px;margin:0 0 28px;">
            <p style="margin:0 0 12px;font-size:13px;color:#92400e;font-weight:600;">🎁 YOUR PRIZE</p>
            <p style="margin:0 0 4px;font-size:20px;font-weight:700;color:#262626;">$500 Amazon Gift Card</p>
            <p style="margin:0;font-size:14px;color:#78350f;">+ Instagram Creator Kit (Camera, Ring Light, Tripod)</p>
          </div>
          <a href="https://jj-ig.netlify.app/login" style="background:linear-gradient(135deg,#f6d365,#fda085);color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:18px 48px;border-radius:100px;display:inline-block;text-shadow:0 1px 3px rgba(0,0,0,0.2);box-shadow:0 4px 16px rgba(253,160,133,0.4);">Claim Your Prize 🎁</a>
          <p style="color:#8e8e8e;font-size:12px;margin:20px 0 0;">Offer expires in 24 hours. Claim now before it's too late!</p>
        </td></tr>
        <tr><td style="background:#fafafa;border-top:1px solid #dbdbdb;padding:20px 40px;text-align:center;">
          <p style="color:#8e8e8e;font-size:11px;margin:0;">© 2026 Instagram from Meta · Creator Program</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  },
];

/* ─── Copy button ────────────────────────────────── */
function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-white/40 transition hover:bg-white/10 hover:text-white/70"
    >
      {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied!" : label}
    </button>
  );
}

/* ─── Send result modal ──────────────────────────── */
function SendResultModal({ onClose, recipient, subject, template, sent, error }) {
  const isConfigured = sent !== "unconfigured";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-purple-500/40 bg-black/95 shadow-2xl shadow-purple-500/20"
      >
        {/* Header */}
        <div className={`border-b border-white/5 px-6 py-4 ${
          error ? "bg-red-500/10" : sent === true ? "bg-green-500/10" : "bg-purple-500/10"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full border ${
              error
                ? "border-red-500/40 bg-red-500/10"
                : sent === true
                ? "border-green-500/40 bg-green-500/10"
                : "border-purple-500/40 bg-purple-500/10"
            }`}>
              {error ? (
                <AlertTriangle className="h-5 w-5 text-red-400" />
              ) : sent === true ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <CheckCircle className="h-5 w-5 text-purple-400" />
              )}
            </div>
            <div>
              <p className={`text-[10px] font-black tracking-widest ${
                error ? "text-red-400" : sent === true ? "text-green-400" : "text-purple-400"
              }`}>
                {error ? "SEND FAILED" : sent === true ? "EMAILJS — EMAIL SENT" : "SIMULATION COMPLETE"}
              </p>
              <h3 className="text-base font-black text-white">
                {error
                  ? "Delivery Error"
                  : sent === true
                  ? "Phishing Email Delivered!"
                  : "Phishing Email Simulated"}
              </h3>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Log panel */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-3 font-mono text-xs">
            <div className="flex gap-3">
              <span className="text-white/30 w-16 flex-shrink-0">To:</span>
              <span className="text-green-400">{recipient}</span>
            </div>
            <div className="flex gap-3">
              <span className="text-white/30 w-16 flex-shrink-0">Subject:</span>
              <span className="text-white/70">{subject}</span>
            </div>
            <div className="flex gap-3">
              <span className="text-white/30 w-16 flex-shrink-0">Template:</span>
              <span className="text-purple-400">{template}</span>
            </div>
            <div className="flex gap-3">
              <span className="text-white/30 w-16 flex-shrink-0">Status:</span>
              <span className={error ? "text-red-400" : sent === true ? "text-green-400" : "text-yellow-400"}>
                {error ? "✗ FAILED" : sent === true ? "✓ SENT via EmailJS" : "~ SIMULATED (no keys)"}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-white/30 w-16 flex-shrink-0">Time:</span>
              <span className="text-white/50">{new Date().toISOString()}</span>
            </div>
          </div>

          {/* Error detail */}
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
              <p className="mb-1 text-[10px] font-black tracking-widest text-red-400">ERROR DETAIL</p>
              <p className="font-mono text-[10px] text-red-400/70 leading-relaxed">{error}</p>
            </div>
          )}

          {/* Setup guide (only when not configured) */}
          {!isConfigured && !error && (
            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
              <p className="mb-2 text-[10px] font-black tracking-widest text-yellow-400">⚡ ENABLE REAL SENDING — EmailJS Setup</p>
              <div className="space-y-2 text-[11px] text-yellow-400/70">
                <p>1. Sign up free at <span className="text-yellow-400 font-bold">emailjs.com</span> (200 emails/month)</p>
                <p>2. Add an Email Service (Gmail, Outlook, etc.)</p>
                <p>3. Create an Email Template with these variables:</p>
                <div className="ml-3 font-mono text-[10px] space-y-0.5 text-yellow-300/60">
                  <p>{'{{to_email}}'} — recipient address</p>
                  <p>{'{{to_name}}'} — recipient name</p>
                  <p>{'{{from_name}}'} — spoofed sender</p>
                  <p>{'{{subject}}'} — email subject</p>
                  <p>{'{{message_html}}'} — HTML body</p>
                </div>
                <p>4. Add to your <span className="text-yellow-400 font-mono">.env</span> file:</p>
                <div className="ml-3 font-mono text-[10px] space-y-0.5 text-yellow-300/60">
                  <p>VITE_EMAILJS_SERVICE_ID=service_xxx</p>
                  <p>VITE_EMAILJS_TEMPLATE_ID=template_xxx</p>
                  <p>VITE_EMAILJS_PUBLIC_KEY=your_public_key</p>
                </div>
                <p>5. Restart the dev server — emails will send for real!</p>
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full rounded-xl border border-purple-500/40 bg-purple-500/10 py-3 text-sm font-bold text-purple-400 transition hover:bg-purple-500/20"
          >
            Close Report
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Phishing Mail Page ────────────────────── */
export default function PhishingMailPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [targetEmail, setTargetEmail] = useState("");
  const [targetName, setTargetName] = useState("");
  const [senderName, setSenderName] = useState("Instagram Security Team");
  const [customSubject, setCustomSubject] = useState("");
  const [previewMode, setPreviewMode] = useState("desktop");
  const [activeTab, setActiveTab] = useState("composer");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [sendResult, setSendResult] = useState({ sent: false, error: null });
  const iframeRef = useRef(null);

  // ─── EmailJS env keys ───────────────────────────
  const EJ_SERVICE          = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EJ_TPL_PASSWORD     = import.meta.env.VITE_EMAILJS_TEMPLATE_PASSWORD;
  const EJ_TPL_VOUCHER      = import.meta.env.VITE_EMAILJS_TEMPLATE_VOUCHER;
  const EJ_KEY              = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Pick the right EmailJS template ID based on what's selected in the UI
  const getTemplateId = () => {
    if (selectedTemplate.id === "password-reset") return EJ_TPL_PASSWORD;
    return EJ_TPL_VOUCHER; // prize-winner, account-suspended, verification, new-login
  };

  const isConfigured =
    EJ_SERVICE      && EJ_SERVICE      !== "your_service_id_here" &&
    EJ_TPL_PASSWORD && EJ_TPL_PASSWORD !== "your_password_template_id_here" &&
    EJ_TPL_VOUCHER  && EJ_TPL_VOUCHER  !== "your_voucher_template_id_here" &&
    EJ_KEY          && EJ_KEY          !== "your_public_key_here";

  const subject   = customSubject || selectedTemplate.subject;
  const emailHTML = selectedTemplate.body(targetName);

  const handleSend = async () => {
    if (!targetEmail) return;
    setLoading(true);
    setSendResult({ sent: false, error: null });

    if (!isConfigured) {
      // Simulation mode — keys not yet configured
      await new Promise((r) => setTimeout(r, 1800));
      setLoading(false);
      setSendResult({ sent: "unconfigured", error: null });
      setShowResult(true);
      return;
    }

    const templateId = getTemplateId();

    try {
      await emailjs.send(
        EJ_SERVICE,
        templateId,                        // ← dynamic: changes per template
        {
          to_email:     targetEmail,        // ← from UI input
          to_name:      targetName || targetEmail,
          from_name:    senderName || "Instagram Security Team",
          subject:      subject,
          message_html: emailHTML,          // ← full HTML body from selected template
          reply_to:     "noreply@mail.instagram.com",
          template_name: selectedTemplate.label,
        },
        EJ_KEY
      );
      setSendResult({ sent: true, error: null, templateId });
    } catch (err) {
      const msg = err?.text || err?.message || JSON.stringify(err);
      setSendResult({ sent: false, error: msg });
    } finally {
      setLoading(false);
      setShowResult(true);
    }
  };

  const canSend = targetEmail.includes("@") && targetEmail.includes(".");

  return (
    <div className="min-h-screen bg-[#020408] text-white">
      <Scanlines />

      {/* ── Header ─────────────────────────────────── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 border-b border-white/5 bg-black/70 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/50 transition hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              BACK
            </Link>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-purple-500/50 bg-purple-500/10">
                <Mail className="h-5 w-5 text-purple-400" />
                <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-purple-400" />
                </span>
              </div>
              <div>
                <span className="font-black tracking-wider text-white">PHISHING</span>
                <span className="font-black tracking-wider text-purple-400"> MAIL</span>
                <span className="font-black tracking-wider text-white"> SERVICE</span>
                <p className="text-[9px] tracking-[0.3em] text-white/30">EMAIL SIMULATION ENGINE</p>
              </div>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 md:flex">
            <AlertTriangle className="h-3.5 w-3.5 text-purple-400" />
            <span className="text-xs font-bold text-purple-400">ETHICAL USE ONLY</span>
          </div>
        </div>
      </motion.header>

      <div className="relative mx-auto max-w-7xl px-6 py-10">
        <CyberGrid />

        <div className="relative z-10">
          {/* Page title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <p className="mb-1 text-[10px] font-black tracking-[0.4em] text-purple-400">
              — SOCIAL ENGINEERING MODULE —
            </p>
            <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
              PHISHING MAIL{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                SIMULATOR
              </span>
            </h1>
            <p className="mt-2 text-sm text-white/40">
              Craft realistic phishing emails from pre-built templates. Simulate campaigns for awareness training.
            </p>
          </motion.div>

          {/* Tab nav */}
          <div className="mb-6 flex gap-2 border-b border-white/5 pb-0">
            {[
              { id: "composer", label: "Email Composer", icon: FileText },
              { id: "preview", label: "Live Preview", icon: Eye },
              { id: "clone", label: "Clone Pages", icon: ExternalLink },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-bold tracking-wider transition-all duration-200 ${
                    active
                      ? "border-purple-500 text-purple-400"
                      : "border-transparent text-white/30 hover:text-white/60"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* ── COMPOSER TAB ─────────────────────────── */}
          <AnimatePresence mode="wait">
            {activeTab === "composer" && (
              <motion.div
                key="composer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid gap-6 lg:grid-cols-[1fr_380px]"
              >
                {/* Left: Form */}
                <div className="space-y-5">
                  {/* Template selector */}
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl">
                    <div className="border-b border-white/5 px-5 py-3 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-purple-400" />
                      <span className="text-[10px] font-black tracking-widest text-purple-400">SELECT TEMPLATE</span>
                    </div>
                    <div className="p-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      {templates.map((tpl) => {
                        const Icon = tpl.icon;
                        const active = selectedTemplate.id === tpl.id;
                        return (
                          <button
                            key={tpl.id}
                            onClick={() => { setSelectedTemplate(tpl); setCustomSubject(""); }}
                            className={`group rounded-xl border p-4 text-left transition-all duration-200 ${
                              active
                                ? "border-purple-500/60 bg-purple-500/15 shadow-lg shadow-purple-500/10"
                                : "border-white/10 bg-white/[0.02] hover:border-purple-500/30 hover:bg-purple-500/5"
                            }`}
                          >
                            <div className="mb-2 flex items-center gap-2.5">
                              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${active ? "bg-purple-500/20" : "bg-white/5"}`}>
                                <Icon className={`h-4 w-4 ${active ? "text-purple-400" : "text-white/40"}`} />
                              </div>
                              <span className={`text-xs font-bold ${active ? "text-purple-400" : "text-white/60"}`}>
                                {tpl.label}
                              </span>
                              {active && (
                                <span className="ml-auto text-[9px] font-black tracking-widest text-purple-400 border border-purple-500/40 rounded-full px-2 py-0.5">
                                  ACTIVE
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-white/30 leading-relaxed">{tpl.preview}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Compose form */}
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl">
                    {/* Terminal header */}
                    <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                        </div>
                        <span className="ml-2 font-mono text-[10px] text-white/20">compose_phishing.sh</span>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-2 py-0.5">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" />
                        <span className="text-[9px] font-bold text-purple-400">COMPOSING</span>
                      </div>
                    </div>

                    <div className="p-5 space-y-4">
                      {/* To */}
                      <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-black tracking-widest text-white/30">
                          <AtSign className="h-3 w-3" /> TO (TARGET EMAIL)
                        </label>
                        <input
                          id="phish-to"
                          type="email"
                          value={targetEmail}
                          onChange={(e) => setTargetEmail(e.target.value)}
                          placeholder="target@example.com"
                          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white placeholder-white/20 outline-none transition focus:border-purple-500/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-purple-500/20"
                        />
                      </div>
                      {/* Target name */}
                      <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-black tracking-widest text-white/30">
                          <User className="h-3 w-3" /> TARGET NAME (for personalization)
                        </label>
                        <input
                          id="phish-name"
                          type="text"
                          value={targetName}
                          onChange={(e) => setTargetName(e.target.value)}
                          placeholder="John Doe  (used in email greeting)"
                          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white placeholder-white/20 outline-none transition focus:border-purple-500/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-purple-500/20"
                        />
                      </div>
                      {/* Sender name */}
                      <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-black tracking-widest text-white/30">
                          <User className="h-3 w-3" /> FROM NAME (spoofed)
                        </label>
                        <input
                          id="phish-sender"
                          type="text"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white placeholder-white/20 outline-none transition focus:border-purple-500/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-purple-500/20"
                        />
                      </div>
                      {/* Subject */}
                      <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-black tracking-widest text-white/30">
                          <Type className="h-3 w-3" /> SUBJECT (leave blank to use template default)
                        </label>
                        <input
                          id="phish-subject"
                          type="text"
                          value={customSubject}
                          onChange={(e) => setCustomSubject(e.target.value)}
                          placeholder={selectedTemplate.subject}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white placeholder-white/20 outline-none transition focus:border-purple-500/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-purple-500/20"
                        />
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => setActiveTab("preview")}
                          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold text-white/50 transition hover:bg-white/10 hover:text-white"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Preview Email
                        </button>
                        <motion.button
                          id="phish-send-btn"
                          onClick={handleSend}
                          disabled={!canSend || loading}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-purple-500/50 bg-purple-500/15 px-6 py-3 text-xs font-bold tracking-widest text-purple-400 transition hover:bg-purple-500/25 hover:shadow-lg hover:shadow-purple-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              SENDING…
                            </>
                          ) : (
                            <>
                              <Send className="h-3.5 w-3.5" />
                              SEND PHISHING EMAIL
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Quick info sidebar */}
                <div className="space-y-5">
                  {/* Current template header */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="overflow-hidden rounded-2xl border border-purple-500/20 bg-black/60"
                  >
                    <div className="border-b border-white/5 bg-purple-500/5 px-5 py-3 flex items-center gap-2">
                      <selectedTemplate.icon className="h-4 w-4 text-purple-400" />
                      <span className="text-[10px] font-black tracking-widest text-purple-400">ACTIVE TEMPLATE</span>
                    </div>
                    <div className="p-5 space-y-3 font-mono text-xs">
                      <div className="flex gap-3">
                        <span className="w-16 flex-shrink-0 text-white/30">Name:</span>
                        <span className="text-purple-400 font-bold">{selectedTemplate.label}</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="w-16 flex-shrink-0 text-white/30">Subject:</span>
                        <span className="text-white/60 leading-relaxed">{subject}</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="w-16 flex-shrink-0 text-white/30">From:</span>
                        <span className="text-white/60">{senderName || "Instagram"}</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="w-16 flex-shrink-0 text-white/30">Target:</span>
                        <span className={targetEmail ? "text-green-400" : "text-white/20"}>{targetEmail || "not set"}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* HTML source copy */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 }}
                    className="rounded-2xl border border-white/10 bg-black/60 overflow-hidden"
                  >
                    <div className="border-b border-white/5 px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-white/40" />
                        <span className="text-[10px] font-black tracking-widest text-white/40">HTML SOURCE</span>
                      </div>
                      <CopyButton text={emailHTML} label="Copy HTML" />
                    </div>
                    <div className="max-h-48 overflow-hidden relative">
                      <pre className="p-4 text-[9px] font-mono text-white/20 leading-relaxed overflow-hidden">
                        {emailHTML.slice(0, 600)}...
                      </pre>
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                  </motion.div>

                  {/* EmailJS status */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 }}
                    className={`rounded-2xl border p-5 ${
                      isConfigured
                        ? "border-green-500/30 bg-green-500/5"
                        : "border-yellow-500/20 bg-yellow-500/5"
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-[10px] font-black tracking-widest text-white/30">EMAILJS STATUS</p>
                      <div className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 border ${
                        isConfigured
                          ? "border-green-500/40 bg-green-500/10"
                          : "border-yellow-500/40 bg-yellow-500/10"
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          isConfigured ? "bg-green-400 animate-pulse" : "bg-yellow-400"
                        }`} />
                        <span className={`text-[9px] font-bold ${
                          isConfigured ? "text-green-400" : "text-yellow-400"
                        }`}>
                          {isConfigured ? "LIVE" : "SIMULATION"}
                        </span>
                      </div>
                    </div>
                    {[
                      { label: "Service ID",      value: isConfigured ? EJ_SERVICE?.slice(0,14)+"…"       : "not configured",           ok: !!isConfigured },
                      { label: "Pwd Template",    value: isConfigured ? EJ_TPL_PASSWORD?.slice(0,14)+"…"  : "not configured",           ok: !!isConfigured },
                      { label: "Voucher Template",value: isConfigured ? EJ_TPL_VOUCHER?.slice(0,14)+"…"   : "not configured",           ok: !!isConfigured },
                      { label: "Active Template", value: selectedTemplate.id === "password-reset" ? "PASSWORD" : "VOUCHER",             ok: true },
                      { label: "Public Key",      value: isConfigured ? "●●●●●●●●"                        : "not configured",           ok: !!isConfigured },
                      { label: "Send Mode",       value: isConfigured ? "REAL EMAIL"                      : "SIMULATED",               ok: !!isConfigured },
                    ].map(({ label, value, ok }) => (
                      <div key={label} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                        <span className="text-[10px] text-white/30">{label}</span>
                        <span className={`text-[10px] font-bold ${ok ? "text-green-400" : "text-yellow-500"}`}>{value}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Attack vectors info */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"
                  >
                    <p className="mb-3 text-[10px] font-black tracking-widest text-white/30">PHISHING VECTORS USED</p>
                    {[
                      { label: "Urgency / Fear", value: selectedTemplate.id === "account-suspended" || selectedTemplate.id === "new-login" ? "HIGH" : "MEDIUM", color: selectedTemplate.id === "account-suspended" ? "text-red-400" : "text-yellow-400" },
                      { label: "Brand Spoofing", value: "INSTAGRAM", color: "text-purple-400" },
                      { label: "Social Engineering", value: "CREDENTIAL HARVEST", color: "text-orange-400" },
                      { label: "Template Quality", value: "HIGH (HTML)", color: "text-green-400" },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                        <span className="text-[10px] text-white/30">{label}</span>
                        <span className={`text-[10px] font-bold ${color}`}>{value}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* ── PREVIEW TAB ──────────────────────────── */}
            {activeTab === "preview" && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Preview controls */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex overflow-hidden rounded-lg border border-white/10">
                    {["desktop", "mobile"].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setPreviewMode(mode)}
                        className={`px-4 py-2 text-[10px] font-bold tracking-widest capitalize transition ${
                          previewMode === mode
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-transparent text-white/30 hover:text-white/60"
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 font-mono text-[10px] text-white/30 flex-1 min-w-0">
                    <span className="text-white/20">Subject:</span>
                    <span className="text-white/50 truncate">{subject}</span>
                  </div>
                  <button
                    onClick={() => setActiveTab("composer")}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold text-white/40 transition hover:text-white"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Edit
                  </button>
                </div>

                {/* Email preview frame */}
                <div className={`mx-auto transition-all duration-300 ${previewMode === "mobile" ? "max-w-[430px]" : "max-w-full"}`}>
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-purple-500/10">
                    {/* Fake email client header */}
                    <div className="bg-[#f5f5f5] border-b border-gray-200 px-5 py-3 flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-400" />
                        <div className="h-3 w-3 rounded-full bg-yellow-400" />
                        <div className="h-3 w-3 rounded-full bg-green-400" />
                      </div>
                      <div className="flex-1 text-center">
                        <span className="text-[11px] text-gray-500 font-medium">Gmail</span>
                      </div>
                    </div>
                    {/* Email header bar */}
                    <div className="bg-white border-b border-gray-100 px-6 py-4">
                      <h2 className="text-base font-semibold text-gray-900 mb-2">{subject}</h2>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                          IG
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-800">{senderName || "Instagram Security Team"}</p>
                          <p className="text-[10px] text-gray-400">security@mail.instagram.com · to {targetEmail || "you"}</p>
                        </div>
                      </div>
                    </div>
                    {/* Email body rendered */}
                    <div
                      style={{ maxHeight: "600px", overflowY: "auto" }}
                      dangerouslySetInnerHTML={{ __html: emailHTML }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── CLONE PAGES TAB ──────────────────────── */}
            {activeTab === "clone" && (
              <motion.div
                key="clone"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {/* Instagram clone card */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10"
                >
                  {/* Preview thumbnail */}
                  <div className="relative overflow-hidden bg-[#fafafa] h-44">
                    {/* Mini Instagram page preview */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white border border-gray-200 rounded-lg p-4 w-36 text-center shadow-sm">
                        <div style={{ fontFamily: "cursive", fontSize: "18px", color: "#262626", marginBottom: "8px" }}>
                          Instagram
                        </div>
                        <div className="h-5 bg-gray-100 rounded mb-1.5 border border-gray-200" />
                        <div className="h-5 bg-gray-100 rounded mb-2 border border-gray-200" />
                        <div className="h-6 rounded text-white text-[9px] flex items-center justify-center font-bold" style={{ background: "linear-gradient(45deg,#833ab4,#fd1d1d,#fcb045)" }}>Log in</div>
                      </div>
                    </div>
                    {/* Red warning tape */}
                    <div className="absolute inset-x-0 top-0 bg-red-600 py-1 text-center">
                      <span className="text-[8px] font-black tracking-widest text-white">PHISHING DEMO</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                          <span className="text-[10px] font-black text-white">IG</span>
                        </div>
                        <h3 className="text-sm font-black text-white">Instagram Clone</h3>
                      </div>
                      <span className="rounded-full border border-green-500/40 bg-green-500/10 px-2 py-0.5 text-[9px] font-bold text-green-400">LIVE</span>
                    </div>
                    <p className="mb-4 text-[11px] leading-relaxed text-white/40">
                      Pixel-perfect Instagram login page clone for credential harvesting simulation and awareness training.
                    </p>
                    <div className="mb-4 space-y-1">
                      {["Floating label inputs", "Show/hide password", "Credential capture log", "Security awareness tips"].map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-purple-500" />
                          <span className="text-[10px] text-white/30">{f}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/phishing/instagram"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-500/40 bg-purple-500/10 py-2.5 text-xs font-bold text-purple-400 transition hover:bg-purple-500/20"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      OPEN CLONE PAGE
                    </Link>
                  </div>
                </motion.div>

                {/* Coming soon cards */}
                {[
                  { name: "Gmail Clone", color: "from-red-500 to-orange-500", label: "GM", desc: "Google account phishing login page with 2FA bypass simulation." },
                  { name: "Microsoft Clone", color: "from-blue-500 to-cyan-500", label: "MS", desc: "Office 365 / Outlook login clone for corporate phishing simulation." },
                ].map((item) => (
                  <motion.div
                    key={item.name}
                    className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]"
                  >
                    <div className="relative h-44 bg-white/[0.02] flex items-center justify-center">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} opacity-20`}>
                        <span className="text-xl font-black text-white">{item.label}</span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="rounded-full border border-white/10 bg-black/60 px-4 py-1.5 text-[10px] font-black tracking-widest text-white/30">COMING SOON</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="mb-2 flex items-center gap-2">
                        <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${item.color} opacity-60`}>
                          <span className="text-[10px] font-black text-white">{item.label}</span>
                        </div>
                        <h3 className="text-sm font-black text-white/50">{item.name}</h3>
                      </div>
                      <p className="mb-4 text-[11px] leading-relaxed text-white/20">{item.desc}</p>
                      <button disabled className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] py-2.5 text-xs font-bold text-white/20 cursor-not-allowed">
                        NOT AVAILABLE YET
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Warning banner ──────────────────────── */}
          <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 px-6 py-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-400" />
              <p className="text-xs text-yellow-400/70 leading-relaxed">
                <span className="font-black text-yellow-400">AUTHORIZED USE ONLY</span> — This tool is designed exclusively for ethical penetration testing, security awareness training, and authorized red team exercises. Sending phishing emails without explicit written consent is illegal and may result in criminal prosecution. Always obtain proper authorization before conducting any phishing simulations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Send result modal */}
      <AnimatePresence>
        {showResult && (
          <SendResultModal
            onClose={() => setShowResult(false)}
            recipient={targetEmail}
            subject={subject}
            template={selectedTemplate.label}
            sent={sendResult.sent}
            error={sendResult.error}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
