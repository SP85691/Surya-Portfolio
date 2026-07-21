"use client";

import Link from "next/link";
import {
  ArrowUpIcon,
  ArrowUpRightIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "lucide-react";
import { NAV_ITEMS, SITE_META } from "@/domain/site-meta";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/SP85691",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/surya-p-871b95187",
    icon: LinkedinIcon,
  },
  {
    label: "Email",
    href: `mailto:${SITE_META.email}`,
    icon: MailIcon,
  },
];

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--bg-surface)]">
      {/* Top hairline glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--text-primary)]/25 to-transparent"
      />

      <div className="mx-auto max-w-[min(80rem,92vw)] px-4 py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <p className="font-brand text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              {SITE_META.name}
              <span className="text-[var(--text-muted)]">.</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
              Full-stack AI engineer building multi-agent systems, clinical AI,
              and production-grade software. I take ambiguous problems from the
              first call to a running product.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-page)] px-3 py-1.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                Open to work · New Delhi
              </span>
            </div>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer navigation">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Navigate
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV_ITEMS.map((navItem) => (
                <li key={navItem.href}>
                  <Link
                    href={navItem.href}
                    className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    {navItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Connect
            </p>
            <ul className="mt-4 space-y-2.5">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                const external = link.href.startsWith("http");
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="group inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                    >
                      <Icon className="size-4" />
                      {link.label}
                      <ArrowUpRightIcon className="size-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Big email CTA */}
        <a
          href={`mailto:${SITE_META.email}`}
          className="group mt-12 flex flex-col gap-2 border-t border-[var(--border)] pt-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <span className="font-display text-2xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
            Let&apos;s build something.
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-sm text-[var(--text-muted)] transition-colors group-hover:text-[var(--text-primary)]">
            {SITE_META.email}
            <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-[min(80rem,92vw)] flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} {SITE_META.author}. Built with Next.js
            &amp; GSAP.
          </p>
          <button
            type="button"
            onClick={scrollTop}
            className="group inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
          >
            Back to top
            <ArrowUpIcon className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
