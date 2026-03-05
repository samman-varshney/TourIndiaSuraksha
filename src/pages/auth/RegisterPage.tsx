/**
 * ============================================================
 * SafeTrail — Smart Tourist Safety System
 * Page     : Register / Create Digital ID
 * Author   : SafeTrail Frontend Team
 * Version  : 1.0.0
 * Stack    : React + Tailwind CSS
 * Description:
 *   Government-portal style registration page. Same visual
 *   language as LoginPage — identical header, card shell,
 *   typography, and color tokens.
 *   3-step wizard: Personal Info → KYC Verification → Security
 * ============================================================
 */

import { useState } from "react";

/* ─────────────────────────────────────────────
   ICONS  (inline SVGs — no extra dependency)
   ───────────────────────────────────────────── */

/** Shield tick — header badge */
const ShieldIcon = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
    <path d="M10 2L3 5.5v5c0 4 3 7.4 7 8.5 4-1.1 7-4.5 7-8.5v-5L10 2z"
      fill="white" fillOpacity="0.9" />
    <path d="M7 10l2.3 2.3 3.7-3.7" stroke="#1d4ed8"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Check mark — completed step circle */
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/** Eye open — show password */
const EyeOpen = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

/** Eye closed — hide password */
const EyeClosed = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94
             M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19
             m-6.72-1.07a3 3 0 11-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

/** Arrow right — next / submit CTA */
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/** Arrow left — back button */
const ArrowLeft = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

/** Lock — footer security notice */
const LockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);


/* ─────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────── */

/** Step definitions for the progress indicator */
const STEPS = [
  { index: 0, label: "Personal Info"    },
  { index: 1, label: "KYC Details"      },
  { index: 2, label: "Security"         },
];

/** ID document type options */
const ID_TYPES = [
  { value: "aadhaar",  label: "Aadhaar Card"     },
  { value: "passport", label: "Passport"          },
  { value: "driving",  label: "Driving Licence"   },
  { value: "voter",    label: "Voter ID"           },
];

/** Account type options */
const ACCOUNT_TYPES = [
  { value: "tourist",   label: "Tourist"             },
  { value: "police",    label: "Law Enforcement"      },
  { value: "authority", label: "Authority / Admin"    },
];


/* ─────────────────────────────────────────────
   REUSABLE COMPONENTS
   ───────────────────────────────────────────── */

/**
 * FormField — label + children wrapper
 * Props: label (string), required (bool), children (JSX)
 */
interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}
const FormField = ({ label, required = false, children }: FormFieldProps) => (
  <div className="mb-4">
    <label className="block text-[13px] font-semibold text-slate-800 mb-2">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

/**
 * TextInput — standard text / email / tel / date input
 * Props: type, placeholder, rightSlot (JSX)
 */

interface TextInputProps {
  type?: string;
  placeholder?: string;
  rightSlot?: React.ReactNode;
}
const TextInput = ({ type = "text", placeholder, rightSlot, ...rest } : TextInputProps ) => (
  <div className="relative">
    <input
      type={type}
      placeholder={placeholder}
      {...rest}
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

/**
 * SelectInput — styled native select
 * Props: options [{ value, label }], value, onChange
 */
interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}
const SelectInput = ({ options, ...rest }: SelectInputProps) => (
  <select
    {...rest}
    className="
      w-full h-[46px] bg-slate-50 border border-slate-200 rounded-xl
      px-4 text-[13.5px] text-slate-800
      outline-none focus:border-blue-600 focus:bg-white
      focus:ring-4 focus:ring-blue-100 transition-all duration-150
      appearance-none cursor-pointer
    "
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);


/* ================================================================
   REGISTER PAGE
   ================================================================ */
export default function RegisterPage() {

  /* ── Step state (0 = Personal, 1 = KYC, 2 = Security) ── */
  const [step, setStep] = useState(0);

  /* ── UI state ── */
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [idType,       setIdType]       = useState("aadhaar");
  const [accountType,  setAccountType]  = useState("tourist");

  /* ── Step navigation ── */
  const goNext = () => setStep((s) => Math.min(s + 1, 2));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  /* ── Dynamic placeholder for document number field ── */
  const docPlaceholder = idType === "aadhaar" ? "XXXX XXXX XXXX" : "Enter document number";

  /* ── CTA label changes on final step ── */
  const ctaLabel = step === 2 ? "Create Digital ID" : "Continue";

  return (

    /* ── Page wrapper ── */
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      {/* ══════════════════════════════════════
          CARD SHELL
          Max-width 520 px — slightly wider than
          Login to accommodate 2-col fields
          ══════════════════════════════════════ */}
      <div className="w-full max-w-[520px] bg-white rounded-2xl overflow-hidden
                      shadow-[0_4px_6px_rgba(0,0,0,0.04),0_16px_48px_rgba(0,0,0,0.12)]">


        {/* ── SECTION 1 · HEADER ── */}
        <header
          className="relative px-8 pt-8 pb-9 overflow-hidden"
          style={{ background: "linear-gradient(145deg,#1a56db 0%,#1e429f 55%,#1a3a8f 100%)" }}
        >
          {/* Background grid texture */}
          <div className="absolute inset-0 pointer-events-none"
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
              Register Digital ID
            </h1>
            <p className="text-sm text-white/60 font-light">Create your secure SafeTrail identity</p>

          </div>
        </header>
        {/* END HEADER */}


        {/* ── SECTION 2 · STEP PROGRESS INDICATOR ── */}
        <div className="flex items-center px-8 py-5 bg-slate-50 border-b border-slate-200">
          {STEPS.map((s, i) => (
            <div key={s.index} className="flex items-center" style={{ flex: i < STEPS.length - 1 ? 1 : "none" }}>

              {/* Step bubble + label */}
              <div className="flex items-center gap-2 shrink-0">

                {/* Circle — done / active / idle */}
                <div className={`
                  w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200
                  ${i < step  ? "bg-blue-700 text-white"                              : ""}
                  ${i === step ? "bg-blue-700 text-white ring-4 ring-blue-100"        : ""}
                  ${i > step  ? "bg-slate-200 text-slate-400"                         : ""}
                `}>
                  {i < step ? <CheckIcon /> : i + 1}
                </div>

                {/* Step label */}
                <span className={`
                  text-[11.5px] font-semibold whitespace-nowrap
                  ${i === step ? "text-blue-700"  : ""}
                  ${i < step  ? "text-slate-700"  : ""}
                  ${i > step  ? "text-slate-400"  : ""}
                `}>
                  {s.label}
                </span>
              </div>

              {/* Connector line between steps */}
              {i < STEPS.length - 1 && (
                <div className={`
                  flex-1 h-[1.5px] mx-3 transition-all duration-300
                  ${i < step ? "bg-blue-600" : "bg-slate-200"}
                `} />
              )}

            </div>
          ))}
        </div>
        {/* END STEP INDICATOR */}


        {/* ── SECTION 3 · FORM BODY ── */}
        <div className="px-8 pt-7 pb-8">

          {/* ──────────────────────────────────
              STEP 0 — Personal Information
              ────────────────────────────────── */}
          {step === 0 && (
            <div>
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-slate-400 mb-5
                            pb-2.5 border-b border-slate-100">
                Personal Information
              </p>

              {/* First + Last name — 2 columns */}
              <div className="grid grid-cols-2 gap-3">
                <FormField label="First Name" required>
                  <TextInput type="text" placeholder="First name" />
                </FormField>
                <FormField label="Last Name">
                  <TextInput type="text" placeholder="Last name" />
                </FormField>
              </div>

              {/* Email */}
              <FormField label="Email Address" required>
                <TextInput type="email" placeholder="name@example.com" />
              </FormField>

              {/* Phone + Account type — 2 columns */}
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Mobile Number">
                  <TextInput type="tel" placeholder="+91 XXXXX XXXXX" />
                </FormField>
                <FormField label="Account Type">
                  <SelectInput
                    options={ACCOUNT_TYPES}
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                  />
                </FormField>
              </div>
            </div>
          )}


          {/* ──────────────────────────────────
              STEP 1 — KYC Verification
              ────────────────────────────────── */}
          {step === 1 && (
            <div>
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-slate-400 mb-5
                            pb-2.5 border-b border-slate-100">
                KYC Verification
              </p>

              {/* Data protection notice */}
              <div className="bg-amber-50 border border-amber-200 border-l-[3px] border-l-amber-400
                              rounded-lg px-4 py-3 mb-5">
                <p className="text-[11px] font-bold tracking-[0.06em] uppercase text-amber-700 mb-1">
                  Data Protection Notice
                </p>
                <p className="text-[12.5px] text-amber-800 font-light leading-relaxed">
                  Your document details are encrypted with AES-256 and accessed only by
                  authorised personnel upon verified request.
                </p>
              </div>

              {/* Document type + number — 2 columns */}
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Document Type" required>
                  <SelectInput
                    options={ID_TYPES}
                    value={idType}
                    onChange={(e) => setIdType(e.target.value)}
                  />
                </FormField>
                <FormField label="Document Number" required>
                  <TextInput type="text" placeholder={docPlaceholder} />
                </FormField>
              </div>

              {/* Date of birth */}
              <div className="max-w-[50%]">
                <FormField label="Date of Birth">
                  <TextInput type="date" />
                </FormField>
              </div>
            </div>
          )}


          {/* ──────────────────────────────────
              STEP 2 — Account Security
              ────────────────────────────────── */}
          {step === 2 && (
            <div>
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-slate-400 mb-5
                            pb-2.5 border-b border-slate-100">
                Account Security
              </p>

              {/* Password + Confirm — 2 columns */}
              <div className="grid grid-cols-2 gap-3">

                {/* Password */}
                <FormField label="Create Password" required>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 characters"
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
                </FormField>

                {/* Confirm password */}
                <FormField label="Confirm Password" required>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Re-enter password"
                      className="
                        w-full h-[46px] bg-slate-50 border border-slate-200 rounded-xl
                        px-4 pr-11 text-[13.5px] text-slate-800 placeholder:text-slate-400
                        outline-none focus:border-blue-600 focus:bg-white
                        focus:ring-4 focus:ring-blue-100 transition-all duration-150
                      "
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showConfirm ? <EyeOpen /> : <EyeClosed />}
                    </button>
                  </div>
                </FormField>

              </div>

              {/* Terms & conditions checkbox */}
              <div className="flex items-start gap-3 mt-1 mb-6">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-[3px] w-4 h-4 accent-blue-700 cursor-pointer shrink-0"
                />
                <label htmlFor="terms" className="text-[12.5px] text-slate-500 font-light leading-relaxed cursor-pointer">
                  I agree to the{" "}
                  <a href="#" className="text-blue-700 font-semibold hover:underline">Terms of Service</a>,{" "}
                  <a href="#" className="text-blue-700 font-semibold hover:underline">Privacy Policy</a>, and the{" "}
                  <a href="#" className="text-blue-700 font-semibold hover:underline">KYC Data Processing Agreement</a>.
                </label>
              </div>

            </div>
          )}


          {/* ─────────────────────────────────────────────
              NAVIGATION BUTTONS
              Continue / Create + optional Back button
              ───────────────────────────────────────────── */}
          <div className="flex items-center gap-3 mt-2">

            {/* Back button — hidden on step 0 */}
            {step > 0 && (
              <button
                onClick={goBack}
                className="
                  flex items-center gap-2 h-[50px] px-5
                  bg-white border-[1.5px] border-slate-200 rounded-xl
                  text-slate-600 text-[13.5px] font-semibold
                  hover:border-slate-300 hover:bg-slate-50
                  transition-all duration-150 shrink-0
                "
              >
                <ArrowLeft />
                Back
              </button>
            )}

            {/* Primary CTA — Continue / Create Digital ID */}
            <button
              onClick={goNext}
              className="
                flex-1 h-[50px] bg-blue-700 hover:bg-blue-800 active:scale-[0.99]
                rounded-xl text-white text-[14.5px] font-bold tracking-wide
                flex items-center justify-center gap-2.5
                shadow-[0_2px_10px_rgba(29,78,216,0.3)] hover:shadow-[0_4px_18px_rgba(29,78,216,0.4)]
                transition-all duration-150
              "
            >
              {ctaLabel}
              <ArrowRight />
            </button>

          </div>

          {/* Already registered — link back to login (step 0 only) */}
          {step === 0 && (
            <p className="text-center text-[13px] text-slate-500 mt-5">
              Already registered?{" "}
              <a href="/login" className="text-blue-700 font-semibold hover:underline">
                Sign in
              </a>
            </p>
          )}

        </div>
        {/* END FORM BODY */}


        {/* ── SECTION 4 · FOOTER ── */}
        <footer className="flex items-center justify-center gap-1.5 px-8 py-4 bg-slate-50 border-t border-slate-100">
          <span className="text-slate-400"><LockIcon /></span>
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