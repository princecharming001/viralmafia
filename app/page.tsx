import WaterCanvas from "./components/water-canvas";
import Apply from "./components/apply";
import { Reveal, Stagger, StaggerItem } from "./components/gsap";

const OFFERINGS = [
  { k: "Dinners", v: "Curated creator tables in London & San Francisco." },
  { k: "Directory", v: "800+ vetted members. Warm intros, not cold DMs." },
  { k: "Challenges", v: "Growth sprints that keep your output honest." },
  { k: "Wins", v: "A public feed of launches, raises & viral moments." },
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
            Viral&nbsp;Mafia
          </a>
          <a
            href="#apply"
            className="rounded-full border border-line bg-white/60 px-4 py-2 text-sm font-medium text-ink backdrop-blur-sm transition-colors hover:border-ink"
          >
            Apply
          </a>
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
              The people who win online aren&apos;t the loudest. They&apos;re the
              ones in the right room. Viral Mafia sells access and proximity —
              not another course.
            </p>
            <div className="mt-10 flex flex-col items-center gap-5">
              <a
                href="#apply"
                className="inline-flex h-13 items-center justify-center rounded-full bg-ink px-9 text-base font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                Apply for access
              </a>
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
              &ldquo;One warm intro here did more for my brand than a year of cold
              DMs. The room actually wants you to win.&rdquo;
            </p>
            <p className="mt-8 text-sm uppercase tracking-[0.2em] text-muted">
              Priya Nair · 540K · Member
            </p>
            <div className="mx-auto mt-14 flex max-w-md flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm tracking-wide text-faint">
              <span>800+ members</span>
              <span className="h-1 w-1 rounded-full bg-faint" />
              <span>London &amp; SF</span>
              <span className="h-1 w-1 rounded-full bg-faint" />
              <span>1,400+ warm intros</span>
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
            <a
              href="#apply"
              className="mt-10 inline-flex h-12 items-center justify-center rounded-full border border-line bg-white/60 px-7 text-sm font-medium text-ink backdrop-blur-sm transition-colors hover:border-ink"
            >
              Become a partner
            </a>
          </Reveal>
        </section>

        {/* Apply — the real application flow */}
        <Apply />

        {/* Footer */}
        <footer className="border-t border-line px-6 py-12">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-faint sm:flex-row">
            <span className="uppercase tracking-[0.22em] text-muted">
              Viral&nbsp;Mafia
            </span>
            <span className="font-display text-base italic text-ink">
              go viral, together.
            </span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </footer>
      </main>
    </>
  );
}
