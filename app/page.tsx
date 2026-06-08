import WaterCanvas from "./components/water-canvas";
import ApplyModal from "./components/apply";
import { Reveal, Stagger, StaggerItem } from "./components/gsap";

const OFFERINGS = [
  {
    k: "Events",
    v: "In-person meetups and creator events — the rooms where collabs and intros actually happen.",
  },
  {
    k: "Workshops",
    v: "Hands-on sessions on how to actually go viral: hooks, formats, and distribution that work.",
  },
  {
    k: "Challenges",
    v: "30-day growth challenges with real cash rewards for the creators who build the fastest.",
  },
  {
    k: "Community",
    v: "A room you can depend on — and earn from. Warm intros, paid collabs, and people who show up.",
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
              The people who win online aren&apos;t the loudest — they&apos;re the
              ones in the right room. Whether you&apos;re growing a personal brand
              or a company, Viral Valley is where you learn what actually goes
              viral — and build it alongside people doing the same.
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
              &ldquo;Going viral shouldn&apos;t be luck. Put the right people in
              one room — with real challenges, real rewards, and people who show
              up — and momentum stops being random.&rdquo;
            </p>
            <p className="mt-8 text-sm uppercase tracking-[0.2em] text-muted">
              Jay Neo · Founder, Viral Valley
            </p>
            <div className="mx-auto mt-14 flex max-w-md flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm tracking-wide text-faint">
              <span>800+ members</span>
              <span className="h-1 w-1 rounded-full bg-faint" />
              <span>Live events &amp; workshops</span>
              <span className="h-1 w-1 rounded-full bg-faint" />
              <span>$50k+ in challenge rewards</span>
            </div>
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
