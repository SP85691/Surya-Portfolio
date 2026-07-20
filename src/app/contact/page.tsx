"use client";

import { useState } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { StatefulButton } from "@/components/ui/stateful-button";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { SITE_META } from "@/domain/site-meta";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const PLACEHOLDERS = [
  "What are you building?",
  "What is the constraint?",
  "What is the deadline?",
  "Tell me about the team...",
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Email", href: `mailto:${SITE_META.email}`, icon: Mail },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async () => {
    await new Promise((r) => setTimeout(r, 900));
  };

  return (
    <div className="bg-[var(--bg-page)] py-[var(--space-section)] pb-28">
      <div className="mx-auto max-w-2xl px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Contact
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-5xl">
          Let us build something that ships.
        </h1>
        <p className="mt-4 text-[var(--text-muted)]">
          Open to engineering leadership, platform architecture, and ambitious
          product work. Tell me the constraint first.
        </p>

        <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 md:p-8">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-5"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[var(--text-primary)]">Name</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-lg border border-[var(--border)] bg-[var(--bg-page)] px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--text-primary)]"
                  placeholder="Your name"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[var(--text-primary)]">Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-lg border border-[var(--border)] bg-[var(--bg-page)] px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--text-primary)]"
                  placeholder="you@company.com"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-[var(--text-primary)]">What are you building?</span>
              <PlaceholdersAndVanishInput
                placeholders={PLACEHOLDERS}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </label>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <StatefulButton onClick={handleSubmit}>Send message</StatefulButton>
              <a
                href={`mailto:${SITE_META.email}`}
                className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
              >
                <Mail className="size-4" /> or email directly <ArrowUpRight className="size-3" />
              </a>
            </div>
          </form>
        </div>

        <div className="mt-12">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Elsewhere
          </p>
          <div className="flex flex-wrap gap-3">
            {SOCIALS.map((s) => (
              <MovingBorderButton key={s.label} className="px-5 py-2.5">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium"
                >
                  <s.icon className="size-4" /> {s.label}
                </a>
              </MovingBorderButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
