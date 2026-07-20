"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
}: {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [value, setValue] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 2000);
  };
  const stopAnimation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAnimation();
    return () => stopAnimation();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex h-12 w-full max-w-xl items-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--bg-surface)] px-2"
    >
      <input
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e);
        }}
        value={value}
        type="text"
        className="z-50 w-full border-none bg-transparent pl-4 pr-20 text-sm text-[var(--text-primary)] focus:outline-none"
      />
      <button
        type="submit"
        disabled={!value}
        className="absolute right-2 z-50 flex h-8 items-center justify-center rounded-full bg-[var(--text-primary)] px-4 text-xs font-medium text-[var(--bg-page)] transition disabled:opacity-40"
      >
        Submit
      </button>
      <button
        type="button"
        aria-hidden
        tabIndex={-1}
        className="pointer-events-none absolute inset-0"
      />
      {!value && (
        <div className="pointer-events-none absolute inset-0 flex items-center pl-4">
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
    </form>
  );
}
