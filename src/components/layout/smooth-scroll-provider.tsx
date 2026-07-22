"use client";

import { useEffect, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LenisGsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      lenis.stop();
      return;
    }

    // Root Lenis scrolls the document — do NOT scrollerProxy html/body.
    // Proxy + pinType:"transform" left empty pin spacers and hid Projects.
    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    // Dev: expose for debugging pin/scrub sync issues.
    if (process.env.NODE_ENV === "development") {
      (window as unknown as { ScrollTrigger: typeof ScrollTrigger; __lenis: typeof lenis }).ScrollTrigger =
        ScrollTrigger;
      (window as unknown as { __lenis: typeof lenis }).__lenis = lenis;
    }

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.off("scroll", onLenisScroll);
    };
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
      }}
    >
      <LenisGsapSync />
      {children}
    </ReactLenis>
  );
}
