"use client";

/**
 * FACTS (GateGuard):
 * 1. Caller: src/app/contact/page.tsx — ContactPageView
 * 2. Existing file — strip to minimal contact (form + channels)
 * 3. No data-file I/O
 * 4. User: "this content on contact page are not useful make just use for contect and minimalistic, remove extra content informations"
 */

import { useState } from "react";
import { motion, type Variants } from "motion/react";
import {
  ArrowUpRightIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "lucide-react";
import { LampContainer } from "@/components/ui/lamp-effect";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { StatefulButton } from "@/components/ui/stateful-button";
import { Button } from "@/components/ui/button";
import { SITE_META } from "@/domain/site-meta";

const PLACEHOLDERS = [
  "What are you building?",
  "What is the constraint?",
  "What is the deadline?",
  "Tell me about the team...",
];

const CHANNELS = [
  {
    icon: GithubIcon,
    label: "GitHub",
    href: "https://github.com/SP85691",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    href: "https://linkedin.com/in/surya-p-871b95187",
  },
  {
    icon: MailIcon,
    label: "Email",
    href: `mailto:${SITE_META.email}`,
  },
];

const MAILTO = `mailto:${SITE_META.email}?subject=${encodeURIComponent(
  "Let's build something that ships",
)}`;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ContactPageView() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async () => {
    await new Promise((r) => setTimeout(r, 900));
    window.location.href = `${MAILTO}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    )}`;
  };

  return (
    <LampContainer
      className="min-h-[78svh] justify-start border-b border-[var(--border)] pb-28 pt-4"
      contentClassName="!mt-[15.5rem] !pt-2 md:!mt-[16.5rem]"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex w-full max-w-xl flex-col items-center"
      >
        <motion.p
          variants={item}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]"
        >
          Contact
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-2 text-center font-display text-3xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-4xl"
        >
          Send a message
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-8 w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)]/80 p-5 backdrop-blur-sm md:p-7"
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-5"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Name
                </span>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-lg border border-[var(--border)] bg-[var(--bg-page)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60 focus:outline-none focus:ring-1 focus:ring-[var(--lamp-amber)]"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Email
                </span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-lg border border-[var(--border)] bg-[var(--bg-page)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60 focus:outline-none focus:ring-1 focus:ring-[var(--lamp-amber)]"
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                Message
              </span>
              <PlaceholdersAndVanishInput
                placeholders={PLACEHOLDERS}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onSubmit={handleSubmit}
              />
            </label>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <StatefulButton onClick={handleSubmit}>
                Send message
              </StatefulButton>
              <Button asChild variant="ghost" size="sm" className="rounded-full">
                <a href={MAILTO}>
                  Email directly
                  <ArrowUpRightIcon className="size-3.5" />
                </a>
              </Button>
            </div>
          </form>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {CHANNELS.map((c) => {
            const Icon = c.icon;
            const external = c.href.startsWith("http");
            return (
              <Button
                key={c.label}
                asChild
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                <a
                  href={c.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                >
                  <Icon className="size-3.5" />
                  {c.label}
                </a>
              </Button>
            );
          })}
        </motion.div>
      </motion.div>
    </LampContainer>
  );
}
