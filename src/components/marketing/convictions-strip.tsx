"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function ConvictionsStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reducedMotion || !quoteRef.current) return;

      const tween = gsap.fromTo(
        quoteRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
            id: "convictions-reveal",
          },
        },
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--bg-inverse)] py-[var(--space-section)] text-[var(--text-inverse)]"
    >
      <div className="mx-auto max-w-[min(90rem,92vw)] px-4">
        <blockquote
          ref={quoteRef}
          className="mx-auto max-w-3xl text-center"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          <p className="font-serif text-2xl leading-relaxed text-neutral-300 md:text-3xl lg:text-4xl">
            &ldquo;AI proposes. Humans confirm.&rdquo;
          </p>
          <footer className="mt-6 text-sm text-neutral-500">
            — Core engineering conviction
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
