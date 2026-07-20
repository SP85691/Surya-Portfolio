import Link from "next/link";
import { NAV_ITEMS, SITE_META } from "@/domain/site-meta";
import { Separator } from "@/components/ui/separator";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Email", href: `mailto:${SITE_META.email}` },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-surface)]">
      <div className="mx-auto grid max-w-[min(90rem,92vw)] gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-[var(--text-primary)]">
            {SITE_META.name}
          </p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            {SITE_META.description}
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-[var(--text-primary)]">
            Navigate
          </p>
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-[var(--text-primary)]">
            Connect
          </p>
          <ul className="space-y-2">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Separator />
      <div className="mx-auto max-w-[min(90rem,92vw)] px-4 py-6">
        <p className="text-center text-xs text-[var(--text-muted)]">
          © {new Date().getFullYear()} {SITE_META.author}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
