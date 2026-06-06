"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";

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

const RAINBOW =
  "linear-gradient(90deg,#ff3b3b,#ff9f1c,#ffe600,#2ecc71,#1e90ff,#7b2ff7,#ff4fd8)";

type Platform = { id: number; network: string; handle: string };

let pid = 100;

const words = (s: string) => (s.trim() ? s.trim().split(/\s+/) : []);

const inputClass =
  "peer w-full border-b border-line bg-transparent py-2 text-ink placeholder:text-faint focus:outline-none transition-colors";

function Underline() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-300 ease-out peer-focus:scale-x-100"
      style={{ backgroundImage: RAINBOW }}
    />
  );
}

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
        className="mb-2 flex items-baseline gap-3 text-xs font-medium uppercase tracking-[0.16em] text-muted"
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

/* — tiny icon set — */
const Plus = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const X = () => (
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

export default function Apply() {
  const [name, setName] = useState("");
  const [platforms, setPlatforms] = useState<Platform[]>([
    { id: 1, network: "Instagram", handle: "" },
  ]);
  const [want, setWant] = useState("");
  const [offer, setOffer] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

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
    if (platforms.some((p) => p.handle.trim())) f++;
    if (want.trim()) f++;
    if (offer.trim()) f++;
    if (location.trim()) f++;
    return f / 5;
  }, [name, platforms, want, offer, location]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("submitting");
    window.setTimeout(() => setStatus("done"), 1300);
  };

  const counter = (val: string) => {
    const c = words(val).length;
    return (
      <span
        className={`tabular-nums ${c >= 18 ? "text-ink" : "text-faint"}`}
      >
        {c}/20 words
      </span>
    );
  };

  return (
    <section id="apply" data-snap className="px-6 py-40">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-muted">
            Apply
          </p>
          <h2 className="font-display text-5xl font-light leading-[1.02] tracking-[-0.03em] text-ink sm:text-7xl">
            Every application
            <br />
            <span className="italic">is read.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted">
            No bots, no auto-replies. A real member reads every one. We keep the
            bar high and the room small — roughly one in nine get in.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative overflow-hidden rounded-[28px] border border-line bg-white/70 shadow-[0_40px_90px_-50px_rgba(10,10,12,0.4)] backdrop-blur-xl"
        >
          {/* completion bar */}
          <div className="absolute inset-x-0 top-0 z-10 h-1 bg-line/50">
            <motion.div
              className="h-full origin-left"
              style={{ backgroundImage: RAINBOW }}
              initial={false}
              animate={{ scaleX: status === "done" ? 1 : Math.max(progress, 0.04) }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
            />
          </div>

          <AnimatePresence mode="wait">
            {status === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center px-8 py-20 text-center sm:px-12"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, rotate: -12 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 14 }}
                  className="mb-7 flex h-16 w-16 items-center justify-center rounded-full text-white"
                  style={{ backgroundImage: RAINBOW }}
                >
                  <Check />
                </motion.div>
                <h3 className="font-display text-3xl font-light text-ink">
                  You&apos;re in the pile.
                </h3>
                <p className="mx-auto mt-3 max-w-sm leading-relaxed text-muted">
                  A real member will read your application within a week. If
                  it&apos;s a fit, we&apos;ll reach out personally. Keep building
                  in the meantime.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={onSubmit}
                className="flex flex-col gap-8 px-8 py-11 sm:px-12 sm:py-12"
              >
                {/* name */}
                <Field n={1} label="Your name" htmlFor="ap-name">
                  <div className="relative">
                    <input
                      id="ap-name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Maya Okonkwo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                    />
                    <Underline />
                  </div>
                </Field>

                {/* platforms */}
                <Field n={2} label="Where you create">
                  <div className="flex flex-col gap-3">
                    <AnimatePresence initial={false}>
                      {platforms.map((p) => (
                        <motion.div
                          key={p.id}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className="flex items-center gap-3 overflow-hidden"
                        >
                          <div className="relative w-32 shrink-0 sm:w-36">
                            <select
                              aria-label="Platform"
                              value={p.network}
                              onChange={(e) =>
                                patchPlatform(p.id, { network: e.target.value })
                              }
                              className="peer w-full cursor-pointer appearance-none border-b border-line bg-transparent py-2 pr-6 text-ink focus:outline-none"
                            >
                              {NETWORKS.map((n) => (
                                <option key={n} value={n}>
                                  {n}
                                </option>
                              ))}
                            </select>
                            <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-faint">
                              <Chevron />
                            </span>
                            <Underline />
                          </div>
                          <div className="relative flex-1">
                            <input
                              type="text"
                              aria-label="Handle"
                              placeholder="@handle"
                              value={p.handle}
                              onChange={(e) =>
                                patchPlatform(p.id, { handle: e.target.value })
                              }
                              className={inputClass}
                            />
                            <Underline />
                          </div>
                          {platforms.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removePlatform(p.id)}
                              aria-label="Remove platform"
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-faint transition-colors hover:bg-ink/[0.06] hover:text-ink"
                            >
                              <X />
                            </button>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {platforms.length < 5 && (
                      <button
                        type="button"
                        onClick={addPlatform}
                        className="group mt-1 inline-flex w-fit items-center gap-2.5 text-sm font-medium text-muted transition-colors hover:text-ink"
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-line text-ink transition-colors group-hover:border-ink">
                          <Plus />
                        </span>
                        Add another platform
                      </button>
                    )}
                  </div>
                </Field>

                {/* want */}
                <Field
                  n={3}
                  label="What do you want from Viral Mafia?"
                  htmlFor="ap-want"
                >
                  <div className="relative">
                    <textarea
                      id="ap-want"
                      required
                      rows={2}
                      placeholder="In 20 words or fewer."
                      value={want}
                      onChange={limit(setWant)}
                      className={`${inputClass} resize-none`}
                    />
                    <Underline />
                    <div className="mt-1.5 text-right text-xs">
                      {counter(want)}
                    </div>
                  </div>
                </Field>

                {/* offer */}
                <Field
                  n={4}
                  label="What do you have to offer?"
                  htmlFor="ap-offer"
                >
                  <div className="relative">
                    <textarea
                      id="ap-offer"
                      required
                      rows={2}
                      placeholder="In 20 words or fewer."
                      value={offer}
                      onChange={limit(setOffer)}
                      className={`${inputClass} resize-none`}
                    />
                    <Underline />
                    <div className="mt-1.5 text-right text-xs">
                      {counter(offer)}
                    </div>
                  </div>
                </Field>

                {/* location */}
                <Field n={5} label="Where are you based?" htmlFor="ap-loc">
                  <div className="relative">
                    <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-faint">
                      <Pin />
                    </span>
                    <input
                      id="ap-loc"
                      type="text"
                      required
                      placeholder="London, UK"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className={`${inputClass} pl-7`}
                    />
                    <Underline />
                  </div>
                </Field>

                {/* submit */}
                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-ink text-base font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
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
                  <p className="mt-4 text-center text-xs text-faint">
                    Applications reviewed weekly · No spam, ever
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
