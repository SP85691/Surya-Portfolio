"use client";

import Link from "next/link";
import { SITE_META } from "@/domain/site-meta";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function ContactCta() {
  return (
    <section
      id="contact"
      className="bg-[var(--bg-inverse)] pb-28 pt-8 text-[var(--text-inverse)]"
    >
      <div className="mx-auto max-w-[min(90rem,92vw)] px-4 text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tighter text-white md:text-5xl">
          Book a conversation
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-neutral-400">
          Open to engineering leadership, platform architecture, and ambitious
          product work.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton strength={0.35} maxDistance={60}>
            <a href={`mailto:${SITE_META.email}`}>
              <ShimmerButton
                background="#ffffff"
                shimmerColor="#000000"
                className="text-black"
              >
                Get in Touch
              </ShimmerButton>
            </a>
          </MagneticButton>
          <MagneticButton strength={0.25} maxDistance={40}>
            <Link href="/work">
              <ShimmerButton
                background="transparent"
                shimmerColor="#ffffff"
                className="border border-white text-white"
              >
                View Work
              </ShimmerButton>
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
