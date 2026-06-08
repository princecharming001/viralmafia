import WaterCanvas from "./components/water-canvas";
import ApplyModal from "./components/apply";
import { Reveal, Stagger, StaggerItem } from "./components/gsap";

const OFFERINGS = [
  {
    k: "Challenges",
    v: "30-day growth challenges running constantly — real accountability and cash on the line for the creators building fastest.",
  },
  {
    k: "Workshops",
    v: "Workshops led by creators who've actually made it — successful names across platforms breaking down what's working now.",
  },
  {
    k: "Community",
    v: "A room of top creators, top founders, and VCs you can depend on — and learn from.",
  },
  {
    k: "Events",
    v: "Exclusive, invite-only events where the right people are actually in the room.",
  },
];

export default function Home() {
  return (
    <>
      <WaterCanvas />

      {/* Minimal top bar */}
      <header className="pass-through fixed inset-x-0 top-0 z-30">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a
            href="#top"
            className="text-sm font-medium uppercase tracking-[0.22em] text-ink"
          >
            Viral&nbsp;Valley
          </a>
          <button
            type="button"
            data-apply
            className="rounded-full border border-line bg-white/60 px-4 py-2 text-sm font-medium text-ink backdrop-blur-sm transition-colors hover:border-ink"
          >
            Apply
          </button>
        </div>
      </header>

      <main id="top" className="pass-through relative z-10">
        {/* Hero — text floats on the living water */}
        <section
          data-snap
          className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
        >
          <Reveal>
            <p className="mb-8 text-xs font-medium uppercase tracking-[0.28em] text-muted">
              Invite-only · for creators & founders
            </p>
            <h1 className="font-display text-[5rem] font-light leading-[0.92] tracking-[-0.03em] text-ink sm:text-[8rem] lg:text-[11rem]">
              go viral,
              <br />
              <span className="italic">together.</span>
            </h1>
            <p className="mx-auto mt-10 max-w-xl text-pretty text-lg leading-relaxed text-muted">
              A selective community for people growing a brand — personal or
              company. Constant 30-day growth challenges, workshops from creators
              who&apos;ve actually made it, and a room of top creators, founders,
              and VCs to learn from.
            </p>
            <div className="mt-10 flex flex-col items-center gap-5">
              <button
                type="button"
                data-apply
                className="inline-flex h-13 items-center justify-center rounded-full bg-ink px-9 text-base font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                Apply for access
              </button>
            </div>
          </Reveal>
        </section>

        {/* What you get — airy minimal list */}
        <section data-snap className="px-6 py-40">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="mb-16 text-center text-xs font-medium uppercase tracking-[0.28em] text-muted">
                What membership gives you
              </p>
            </Reveal>
            <Stagger className="flex flex-col" stagger={0.1}>
              {OFFERINGS.map((o) => (
                <StaggerItem key={o.k}>
                  <div className="group flex flex-col gap-2 border-t border-line py-9 transition-colors sm:flex-row sm:items-baseline sm:gap-12">
                    <h3 className="font-display text-2xl font-normal text-ink sm:w-48 sm:shrink-0">
                      {o.k}
                    </h3>
                    <p className="text-lg leading-relaxed text-muted">{o.v}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Social proof — one quiet, confident line */}
        <section data-snap className="px-6 py-40 text-center">
          <Reveal>
            <p className="mx-auto max-w-3xl text-balance font-display text-3xl font-light leading-[1.3] text-ink sm:text-4xl">
              &ldquo;Nobody who&apos;s good at this did it alone. I built Viral
              Valley as the room I wish I&apos;d had starting out — the people who
              tell you the truth about what&apos;s working, and push you to keep
              going.&rdquo;
            </p>
            <p className="mt-8 text-sm uppercase tracking-[0.2em] text-muted">
              Jay Neo · Founder, Viral Valley
            </p>
          </Reveal>
        </section>

        {/* For sponsors */}
        <section data-snap className="px-6 py-40 text-center">
          <Reveal>
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.28em] text-muted">
              For sponsors
            </p>
            <h2 className="mx-auto max-w-3xl text-balance font-display text-4xl font-light leading-[1.1] tracking-[-0.02em] text-ink sm:text-6xl">
              A seat in the room,
              <br />
              <span className="italic">not a logo on a banner.</span>
            </h2>
            <button
              type="button"
              data-apply
              className="mt-10 inline-flex h-12 items-center justify-center rounded-full border border-line bg-white/60 px-7 text-sm font-medium text-ink backdrop-blur-sm transition-colors hover:border-ink"
            >
              Become a partner
            </button>
          </Reveal>
        </section>

        {/* Apply — CTA that opens the application modal */}
        <section id="apply" data-snap className="px-6 py-44 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-balance font-display text-5xl font-light leading-[1.02] tracking-[-0.03em] text-ink sm:text-8xl">
              Every application
              <br />
              <span className="italic">is read.</span>
            </h2>
            <p className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-muted">
              No bots, no auto-replies. A real member reads every one. We keep the
              bar high and the room small — roughly one in nine get in.
            </p>
            <button
              type="button"
              data-apply
              className="mt-12 inline-flex h-14 items-center justify-center rounded-full bg-ink px-10 text-base font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              Apply for access
            </button>
          </Reveal>
        </section>

        {/* Footer */}
        <footer className="border-t border-line px-6 py-12">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-faint sm:flex-row">
            <span className="uppercase tracking-[0.22em] text-muted">
              Viral&nbsp;Valley
            </span>
            <span className="font-display text-base italic text-ink">
              go viral, together.
            </span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </footer>
      </main>

      <ApplyModal />
    </>
  );
}
