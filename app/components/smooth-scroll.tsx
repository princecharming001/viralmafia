"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

/**
 * Page-wide Lenis smooth scroll, wired into GSAP's ticker so ScrollTrigger
 * stays perfectly in sync. Disabled entirely under prefers-reduced-motion,
 * which falls back to the browser's native scrolling.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      // smooth, Apple-like ease-out
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Smooth in-page anchor navigation (account for the fixed 64px nav)
    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -64, duration: 1.2 });
    };
    document.addEventListener("click", onAnchorClick);

    // Weighted, "magnetic" snapping that gently eases toward each section
    // when you come to rest near one (proximity -> only when close).
    const snap = new Snap(lenis, {
      type: "proximity",
      distanceThreshold: "18%",
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      debounce: 500,
    });
    const snapElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-snap]")
    );
    snapElements.forEach((el) => snap.addElement(el, { align: "start" }));

    // Make sure triggers measure correctly after fonts/images settle
    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(raf);
      snap.destroy();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
