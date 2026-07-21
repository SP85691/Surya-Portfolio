"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon, SearchIcon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS, SITE_META } from "@/domain/site-meta";

const navItems = NAV_ITEMS.map((item) => ({
  name: item.label,
  link: item.href,
}));

function openCommandMenu() {
  window.dispatchEvent(new Event("open-command-menu"));
}

function BrandLogo({
  onClick,
  compact = false,
}: {
  onClick?: () => void;
  compact?: boolean;
}) {
  const initial = SITE_META.name.charAt(0).toUpperCase();

  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${SITE_META.name} — home`}
      className="group relative z-20 flex items-center gap-2.5 rounded-xl py-1 pr-2"
    >
      <span
        className={`relative flex ${
          compact ? "size-7" : "size-8"
        } items-center justify-center overflow-hidden rounded-lg bg-[var(--text-primary)] font-brand font-bold leading-none text-[var(--bg-page)] shadow-[0_1px_0_0_color-mix(in_srgb,var(--text-primary)_20%,transparent)] transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-105`}
      >
        <span className={compact ? "text-sm" : "text-base"}>{initial}</span>
        <span
          aria-hidden
          className="pointer-events-none absolute -left-full top-0 h-full w-full -skew-x-12 bg-[color-mix(in_srgb,var(--bg-page)_45%,transparent)] transition-transform duration-500 ease-out group-hover:translate-x-[220%]"
        />
      </span>
      <span
        className={`font-brand font-semibold tracking-tight text-[var(--text-primary)] ${
          compact ? "text-base" : "text-lg"
        }`}
      >
        {SITE_META.name}
        <span className="text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--accent)]">
          .
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <header className="relative z-50 w-full">
      <Navbar className="fixed! inset-x-0 top-3! z-50 md:top-4!">
        <NavBody className="max-w-[min(90rem,92vw)]! min-w-0!">
          <div className="mr-4">
            <BrandLogo />
          </div>

          <NavItems items={navItems} />

          <div className="relative z-20 flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={openCommandMenu}
              className="hidden gap-2 border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-muted)] lg:inline-flex"
              aria-label="Open command menu"
            >
              <SearchIcon data-icon="inline-start" />
              <span className="font-mono text-[10px]">⌘K</span>
            </Button>

            {mounted && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                onClick={() => setTheme(isDark ? "light" : "dark")}
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
              </Button>
            )}

            <Button asChild size="sm" className="rounded-full">
              <Link href="/work">View Work</Link>
            </Button>
          </div>
        </NavBody>

        <MobileNav className="bg-[var(--bg-surface)]/90 backdrop-blur-md">
          <MobileNavHeader>
            <BrandLogo compact />
            <div className="flex items-center gap-2">
              {mounted && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                >
                  {isDark ? <SunIcon /> : <MoonIcon />}
                </Button>
              )}
              <MobileNavToggle
                isOpen={mobileOpen}
                onClick={() => setMobileOpen(!mobileOpen)}
              />
            </div>
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
            className="border border-[var(--border)] bg-[var(--bg-surface)]"
          >
            <div className="flex w-full flex-col gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.link}
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Link href={item.link} onClick={() => setMobileOpen(false)}>
                    {item.name}
                  </Link>
                </Button>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              className="mt-2 w-full justify-start gap-2"
              onClick={() => {
                setMobileOpen(false);
                openCommandMenu();
              }}
            >
              <SearchIcon data-icon="inline-start" />
              Search (⌘K)
            </Button>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </header>
  );
}
