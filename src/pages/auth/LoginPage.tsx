/**
 * ============================================================
 * SafeTrail — Smart Tourist Safety System
 * Page     : Login / Sign In
 * Author   : SafeTrail Frontend Team
 * Version  : 1.0.0
 * Stack    : React + Tailwind CSS
 * Description:
 *   Government-portal style login page. Matches the visual
 *   language of the Register page — same header, card shell,
 *   typography, and color tokens throughout.
 * ============================================================
 */

import { useState } from "react";
import { Link } from "react-router-dom";
/* ─────────────────────────────────────────────
   ICONS  (inline SVGs — no extra dependency)
   ───────────────────────────────────────────── */

/** Shield tick — header badge */
const ShieldIcon = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 2L3 5.5v5c0 4 3 7.4 7 8.5 4-1.1 7-4.5 7-8.5v-5L10 2z"
      fill="white"
      fillOpacity="0.9"
    />
    <path
      d="M7 10l2.3 2.3 3.7-3.7"
      stroke="#1d4ed8"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** ID card — inside the identifier field */
const IdIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <circle cx="8" cy="12" r="2" />
    <path d="M14 10h4M14 14h2" />
  </svg>
);

/** Eye open — show password */
const EyeOpen = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

/** Eye closed — hide password */
const EyeClosed = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94
             M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19
             m-6.72-1.07a3 3 0 11-4.24-4.24"
    />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

/** Arrow right — login CTA */
const ArrowRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/** Lock — footer security notice */
const LockIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

/** Google logo — SSO button */
const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57C21.36 18.17 22.56 15.42 22.56 12.25z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

/* ================================================================
   REUSABLE — Text Input
   Props: type, placeholder, rightSlot (JSX)
   ================================================================ */
interface TextInputProps {
  type?: string;
  placeholder: string;
  rightSlot?: React.ReactNode;
}

const TextInput = ({
  type = "text",
  placeholder,
  rightSlot,
}: TextInputProps) => (
  <div className="relative">
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-full h-[46px] bg-slate-50 border border-slate-200 rounded-xl
        px-4 pr-11 text-[13.5px] text-slate-800 placeholder:text-slate-400
        outline-none focus:border-blue-600 focus:bg-white
        focus:ring-4 focus:ring-blue-100 transition-all duration-150
      "
    />
    {rightSlot && (
      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
        {rightSlot}
      </span>
    )}
  </div>
);

/* ================================================================
   LOGIN PAGE
   ================================================================ */
export default function LoginPage() {
  /* ── Local UI state ── */
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("tourist"); // "tourist" | "authority"

  /* ── Tab config ── */
  const TABS = [
    { key: "tourist", label: "Tourist Access" },
    { key: "authority", label: "Authority Login" },
  ];

  return (
    /* ── Page wrapper ── */
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      {/* ══════════════════════════════════════
          CARD SHELL
          Max-width 460 px, white, rounded-2xl
          ══════════════════════════════════════ */}
      <div
        className="w-full max-w-[460px] bg-white rounded-2xl overflow-hidden
                      shadow-[0_4px_6px_rgba(0,0,0,0.04),0_16px_48px_rgba(0,0,0,0.12)]"
      >
        {/* ── SECTION 1 · HEADER ── */}
        <header
          className="relative px-8 pt-8 pb-9 overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg,#1a56db 0%,#1e429f 55%,#1a3a8f 100%)",
          }}
        >
          {/* Background grid texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.045) 1px,transparent 1px)," +
                "linear-gradient(90deg,rgba(255,255,255,0.045) 1px,transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Decorative rings — top right */}
          <div className="absolute -top-14 -right-14 w-52 h-52 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full border border-white/[0.07] pointer-events-none" />

          {/* Header content */}
          <div className="relative z-10">
            {/* Official portal badge */}
            <div className="inline-flex items-center gap-2 bg-white/[0.13] border border-white/20 rounded-md px-3 py-[5px] mb-5">
              <ShieldIcon />
              <span className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-white/90">
                Official Government Portal
              </span>
            </div>

            <h1 className="text-[28px] font-extrabold text-white tracking-tight leading-none mb-1.5">
              SafeTrail Identity
            </h1>
            <p className="text-sm text-white/60 font-light">
              Secure authentication gateway
            </p>
          </div>
        </header>
        {/* END HEADER */}

        {/* ── SECTION 2 · TABS ── */}
        <div className="flex border-b border-slate-200">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                flex-1 py-3.5 text-[13.5px] font-semibold relative transition-colors duration-150
                ${activeTab === tab.key ? "text-blue-700" : "text-slate-400 hover:text-slate-600"}
              `}
            >
              {tab.label}
              {/* Active underline indicator */}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-700 rounded-t" />
              )}
            </button>
          ))}
        </div>
        {/* END TABS */}

        {/* ── SECTION 3 · FORM BODY ── */}
        <div className="px-8 pt-7 pb-8">
          {/* Field — Digital Identity ID or Email */}
          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-slate-800 mb-2">
              Digital Identity ID or Email
            </label>
            <TextInput
              type="text"
              placeholder="Enter your ID or Email"
              rightSlot={<IdIcon />}
            />
          </div>

          {/* Field — Password */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[13px] font-semibold text-slate-800">
                Password
              </label>
              <a
                href="#"
                className="text-[12.5px] font-semibold text-blue-700 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
            {/* Password input — toggle show/hide */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="
                  w-full h-[46px] bg-slate-50 border border-slate-200 rounded-xl
                  px-4 pr-11 text-[13.5px] text-slate-800 placeholder:text-slate-400
                  outline-none focus:border-blue-600 focus:bg-white
                  focus:ring-4 focus:ring-blue-100 transition-all duration-150
                "
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOpen /> : <EyeClosed />}
              </button>
            </div>
          </div>

          {/* CTA — Primary: Secure Login */}
          <button
            className="
            w-full h-[50px] bg-blue-700 hover:bg-blue-800 active:scale-[0.99]
            rounded-xl text-white text-[14.5px] font-bold tracking-wide
            flex items-center justify-center gap-2.5
            shadow-[0_2px_10px_rgba(29,78,216,0.3)] hover:shadow-[0_4px_18px_rgba(29,78,216,0.4)]
            transition-all duration-150 mb-5
          "
          >
            <ArrowRight />
            Secure Login
          </button>

          {/* Divider — New User? */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-400">
              New User?
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* CTA — Secondary: Register */}
          {/* link for register page; */}
          <Link
            to="/register"
            className="
    flex items-center justify-center
    w-full h-[48px] bg-white border-[1.5px] border-slate-200
    hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700
    rounded-xl text-slate-800 text-[14px] font-bold
    transition-all duration-150 mb-6
  "
          >
            Register Digital ID
          </Link>

          {/* Divider — SSO */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-400">
              or
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* SSO buttons — Google + DigiLocker */}
          <div className="grid grid-cols-2 gap-3">
            <button
              className="
              flex items-center justify-center gap-2 h-[42px]
              bg-white border border-slate-200 rounded-xl
              text-[12.5px] font-semibold text-slate-700
              hover:border-slate-300 hover:bg-slate-50 transition-all duration-150
            "
            >
              <GoogleIcon />
              Google SSO
            </button>

            <button
              className="
              flex items-center justify-center gap-2 h-[42px]
              bg-white border border-slate-200 rounded-xl
              text-[12.5px] font-semibold text-slate-700
              hover:border-slate-300 hover:bg-slate-50 transition-all duration-150
            "
            >
              <span className="text-amber-500 font-extrabold text-base leading-none">
                D
              </span>
              DigiLocker
            </button>
          </div>
        </div>
        {/* END FORM BODY */}

        {/* ── SECTION 4 · FOOTER ── */}
        <footer className="flex items-center justify-center gap-1.5 px-8 py-4 bg-slate-50 border-t border-slate-100">
          <span className="text-slate-400">
            <LockIcon />
          </span>
          <span className="text-[12px] text-slate-400 font-medium">
            Protected by Government Secure Gateway
          </span>
        </footer>
        {/* END FOOTER */}
      </div>
      {/* END CARD */}
    </div>
    /* END PAGE */
  );
}
