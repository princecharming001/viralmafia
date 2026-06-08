"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import NarwhalLeap from "./narwhal";

const NETWORKS = [
  "Instagram",
  "TikTok",
  "YouTube",
  "X",
  "LinkedIn",
  "Substack",
  "Twitch",
  "Podcast",
  "Other",
];

// Soft, muted pastel spectrum (gentler than the vivid water).
const RAINBOW =
  "linear-gradient(90deg,#f3acc0,#f6cfa9,#f1e7ab,#bfe6c8,#aed5ef,#c8bfee,#efbce1)";

// Where applications are sent. Paste your Make.com (or Zapier) webhook URL here,
// or set NEXT_PUBLIC_FORM_WEBHOOK at build time. While empty, the form still
// works but just shows the success state without sending anything.
const WEBHOOK_URL = process.env.NEXT_PUBLIC_FORM_WEBHOOK ?? "";

type Platform = { id: number; network: string; handle: string };

let pid = 100;

const words = (s: string) => (s.trim() ? s.trim().split(/\s+/) : []);

const fieldClass =
  "w-full rounded-xl border border-line bg-white/70 px-4 py-3 text-[0.95rem] text-ink placeholder:text-faint outline-none transition-colors focus:border-ink focus:bg-white";

function Field({
  n,
  label,
  htmlFor,
  children,
}: {
  n: number;
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 flex items-baseline gap-2.5 text-xs font-medium uppercase tracking-[0.14em] text-muted"
      >
        <span className="font-display text-[0.7rem] text-faint">
          {String(n).padStart(2, "0")}
        </span>
        {label}
      </label>
      {children}
    </div>
  );
}

/* — icons — */
const Plus = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
const Chevron = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);
const Pin = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);
const Arrow = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const Check = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const Spinner = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.5" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

function Counter({ value }: { value: string }) {
  const c = words(value).length;
  return (
    <div className="mt-1.5 text-right text-xs tabular-nums">
      <span className={c >= 18 ? "text-ink" : "text-faint"}>{c}/20 words</span>
    </div>
  );
}

export default function ApplyModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [platforms, setPlatforms] = useState<Platform[]>([
    { id: 1, network: "Instagram", handle: "" },
  ]);
  const [want, setWant] = useState("");
  const [offer, setOffer] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [err, setErr] = useState(false);
  const [hp, setHp] = useState(""); // honeypot — real users never fill this

  // Any element with [data-apply] opens the modal
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest("[data-apply]");
      if (!el) return;
      e.preventDefault();
      if (status === "done") setStatus("idle");
      setOpen(true);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [status]);

  // Lock background scroll + ESC to close while open
  useEffect(() => {
    if (!open) return;
    const lenis = (window as Window & { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const limit =
    (set: (v: string) => void) => (e: ChangeEvent<HTMLTextAreaElement>) => {
      const w = words(e.target.value);
      set(w.length <= 20 ? e.target.value : w.slice(0, 20).join(" "));
    };

  const addPlatform = () =>
    setPlatforms((p) =>
      p.length >= 5 ? p : [...p, { id: ++pid, network: "TikTok", handle: "" }]
    );
  const removePlatform = (id: number) =>
    setPlatforms((p) => (p.length > 1 ? p.filter((x) => x.id !== id) : p));
  const patchPlatform = (id: number, patch: Partial<Platform>) =>
    setPlatforms((p) => p.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const progress = useMemo(() => {
    let f = 0;
    if (name.trim()) f++;
    if (email.trim()) f++;
    if (phone.trim()) f++;
    if (platforms.some((p) => p.handle.trim())) f++;
    if (want.trim()) f++;
    if (offer.trim()) f++;
    if (location.trim()) f++;
    return f / 7;
  }, [name, email, phone, platforms, want, offer, location]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    // bot filled the hidden field -> silently pretend success, send nothing
    if (hp.trim()) {
      setStatus("done");
      return;
    }
    setErr(false);
    setStatus("submitting");

    const chosen = platforms.filter((p) => p.handle.trim());
    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      location: location.trim(),
      want: want.trim(),
      offer: offer.trim(),
      platforms: chosen.map((p) => ({ network: p.network, handle: p.handle.trim() })),
      platformsText: chosen.map((p) => `${p.network}: ${p.handle.trim()}`).join(", "),
      submittedAt: new Date().toISOString(),
      source: "viralvalley.io",
    };

    try {
      if (WEBHOOK_URL) {
        const res = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`status ${res.status}`);
      } else {
        // no endpoint configured yet — mimic a short send
        await new Promise((r) => setTimeout(r, 900));
      }
      setStatus("done");
    } catch {
      setErr(true);
      setStatus("idle");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="apply-modal"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* scrim */}
          <button
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-ink/30 backdrop-blur-[3px]"
          />

          {/* dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Apply to Viral Valley"
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="relative z-10 flex max-h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-[26px] border border-line bg-white shadow-[0_40px_120px_-30px_rgba(10,10,12,0.55)]"
          >
            {/* completion bar */}
            <div className="h-1 w-full shrink-0 bg-line/50">
              <motion.div
                className="h-full origin-left"
                style={{ backgroundImage: RAINBOW }}
                initial={false}
                animate={{ scaleX: status === "done" ? 1 : Math.max(progress, 0.04) }}
                transition={{ type: "spring", stiffness: 120, damping: 22 }}
              />
            </div>

            {/* header */}
            <div className="flex shrink-0 items-start justify-between gap-4 px-7 pb-4 pt-6">
              <div>
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted">
                  Apply to Viral Valley
                </p>
                <h2 className="mt-1.5 font-display text-2xl font-light leading-tight text-ink">
                  Every application is read.
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="-mr-1 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-ink/[0.06] hover:text-ink"
              >
                <XIcon />
              </button>
            </div>

            {/* body */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto px-7 pb-7"
            >
              {status === "done" ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0, rotate: -12 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 14 }}
                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-full text-ink/75"
                    style={{ backgroundImage: RAINBOW }}
                  >
                    <Check />
                  </motion.div>
                  <h3 className="font-display text-2xl font-light text-ink">
                    You&apos;re in the pile.
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
                    A real member will read your application within a week. If
                    it&apos;s a fit, we&apos;ll reach out personally.
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-ink px-7 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-6 pt-1">
                  {/* honeypot: hidden from people, catches bots */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden"
                  >
                    <label>
                      Company
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={hp}
                        onChange={(e) => setHp(e.target.value)}
                      />
                    </label>
                  </div>

                  <Field n={1} label="Your name" htmlFor="ap-name">
                    <input
                      id="ap-name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Maya Okonkwo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={fieldClass}
                    />
                  </Field>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field n={2} label="Email" htmlFor="ap-email">
                      <input
                        id="ap-email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={fieldClass}
                      />
                    </Field>
                    <Field n={3} label="Phone number" htmlFor="ap-phone">
                      <input
                        id="ap-phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="+44 7700 900000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={fieldClass}
                      />
                    </Field>
                  </div>

                  <Field n={4} label="Where you create">
                    <div className="flex flex-col gap-2.5">
                      <AnimatePresence initial={false}>
                        {platforms.map((p) => (
                          <motion.div
                            key={p.id}
                            layout
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="flex items-center gap-2.5 overflow-hidden"
                          >
                            <div className="relative w-32 shrink-0 sm:w-36">
                              <select
                                aria-label="Platform"
                                value={p.network}
                                onChange={(e) =>
                                  patchPlatform(p.id, { network: e.target.value })
                                }
                                className={`${fieldClass} cursor-pointer appearance-none pr-9`}
                              >
                                {NETWORKS.map((n) => (
                                  <option key={n} value={n}>
                                    {n}
                                  </option>
                                ))}
                              </select>
                              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-faint">
                                <Chevron />
                              </span>
                            </div>
                            <input
                              type="text"
                              aria-label="Handle"
                              placeholder="@handle"
                              value={p.handle}
                              onChange={(e) =>
                                patchPlatform(p.id, { handle: e.target.value })
                              }
                              className={`${fieldClass} flex-1`}
                            />
                            {platforms.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removePlatform(p.id)}
                                aria-label="Remove platform"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-faint transition-colors hover:bg-ink/[0.06] hover:text-ink"
                              >
                                <XIcon />
                              </button>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {platforms.length < 5 && (
                        <button
                          type="button"
                          onClick={addPlatform}
                          className="group inline-flex w-fit items-center gap-2.5 text-sm font-medium text-muted transition-colors hover:text-ink"
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-line text-ink transition-colors group-hover:border-ink">
                            <Plus />
                          </span>
                          Add another platform
                        </button>
                      )}
                    </div>
                  </Field>

                  <Field
                    n={5}
                    label="What do you want from Viral Valley?"
                    htmlFor="ap-want"
                  >
                    <textarea
                      id="ap-want"
                      required
                      rows={2}
                      placeholder="In 20 words or fewer."
                      value={want}
                      onChange={limit(setWant)}
                      className={`${fieldClass} resize-none leading-relaxed`}
                    />
                    <Counter value={want} />
                  </Field>

                  <Field
                    n={6}
                    label="What do you have to offer?"
                    htmlFor="ap-offer"
                  >
                    <textarea
                      id="ap-offer"
                      required
                      rows={2}
                      placeholder="In 20 words or fewer."
                      value={offer}
                      onChange={limit(setOffer)}
                      className={`${fieldClass} resize-none leading-relaxed`}
                    />
                    <Counter value={offer} />
                  </Field>

                  <Field n={7} label="Where are you based?" htmlFor="ap-loc">
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint">
                        <Pin />
                      </span>
                      <input
                        id="ap-loc"
                        type="text"
                        required
                        placeholder="London, UK"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={`${fieldClass} pl-10`}
                      />
                    </div>
                  </Field>

                  <div className="mt-1">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-ink text-base font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
                    >
                      {status === "submitting" ? (
                        <>
                          <Spinner />
                          Sending…
                        </>
                      ) : (
                        <>
                          Submit application
                          <Arrow />
                        </>
                      )}
                    </button>
                    {err ? (
                      <p
                        role="alert"
                        className="mt-3.5 text-center text-xs"
                        style={{ color: "#c0301a" }}
                      >
                        Something went wrong sending your application. Please try
                        again.
                      </p>
                    ) : (
                      <p className="mt-3.5 text-center text-xs text-faint">
                        Applications reviewed weekly · No spam, ever
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          {status === "done" && <NarwhalLeap />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
