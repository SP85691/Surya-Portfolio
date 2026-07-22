"use client";

/**
 * FACTS: Caller contact-page.tsx. Existing UI — use <div> not <form>
 * so nesting inside a parent form does not hydrate-error.
 * User: "In HTML, <form> cannot be a descendant of <form>."
 */

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
}: {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [value, setValue] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 2000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [placeholders.length]);

  return (
    <div className="relative flex h-12 w-full max-w-xl items-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--bg-page)] px-2">
      <input
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (value.trim()) onSubmit?.();
          }
        }}
        value={value}
        type="text"
        name="message"
        autoComplete="off"
        className="relative z-10 w-full border-none bg-transparent pl-4 pr-20 text-sm text-[var(--text-primary)] focus:outline-none"
      />
      <button
        type="button"
        disabled={!value.trim()}
        onClick={() => onSubmit?.()}
        className="absolute right-2 z-10 flex h-8 items-center justify-center rounded-full bg-[var(--text-primary)] px-4 text-xs font-medium text-[var(--bg-page)] transition disabled:opacity-40"
      >
        Submit
      </button>
      {!value && (
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center pl-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentPlaceholder}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-[var(--text-muted)]"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
