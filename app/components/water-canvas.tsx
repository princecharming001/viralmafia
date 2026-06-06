"use client";

import { useEffect, useRef } from "react";
import type WebGLFluidEnhanced from "webgl-fluid-enhanced";

export default function WaterCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    let sim: WebGLFluidEnhanced | null = null;
    let cancelled = false;

    import("webgl-fluid-enhanced")
      .then(({ default: WebGLFluidEnhancedClass }) => {
        if (cancelled || !ref.current) return;
        const instance = new WebGLFluidEnhancedClass(ref.current);
        instance.setConfig({
          simResolution: 128,
          dyeResolution: 1024,
          densityDissipation: 2.6, // a touch longer-lived -> stronger presence
          velocityDissipation: 2.0,
          pressure: 0.8,
          pressureIterations: 20,
          curl: 4, // low vorticity -> calm, water-like flow (not smoky)
          splatRadius: 0.22,
          splatForce: 6000,
          shading: true, // soft 3D shading -> reads as a liquid surface
          colorful: true, // continuously cycle hue -> every trail is a rainbow
          colorUpdateSpeed: 14, // fast cycling so a single drag spans the spectrum
          hover: true, // react to cursor hover, not just clicks
          backgroundColor: "#ffffff",
          transparent: false,
          bloom: false,
          sunrays: false,
        });
        instance.start();
        // seed a gentle bloom so the surface shows life and invites interaction
        instance.multipleSplats(12);
        sim = instance;
      })
      .catch(() => {
        /* WebGL unavailable — leave a clean white page */
      });

    return () => {
      cancelled = true;
      try {
        sim?.stop();
      } catch {
        /* noop */
      }
      if (el) el.innerHTML = "";
    };
  }, []);

  // Outer stays fixed/full-screen (the library overwrites the container's
  // `position` to `relative`, so it must not be applied to our fixed layer).
  return (
    <div aria-hidden className="fixed inset-0 z-0">
      <div ref={ref} className="h-full w-full" />
    </div>
  );
}
