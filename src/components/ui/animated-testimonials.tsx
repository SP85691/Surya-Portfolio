"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src?: string;
};

export function AnimatedTestimonials({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setActive((prev) => (prev + 1) % testimonials.length);
  };
  const handlePrev = () => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className={`mx-auto max-w-3xl px-4 ${className ?? ""}`}>
      <div className="relative min-h-[260px]">
        <AnimatePresence mode="wait" custom={direction}>
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
              animate={{ opacity: active === index ? 1 : 0, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={`${active === index ? "block" : "hidden"}`}
            >
              <blockquote className="text-center text-lg font-medium leading-relaxed text-[var(--text-primary)] md:text-2xl md:leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center justify-center gap-4">
                {t.src && (
                  <img
                    src={t.src}
                    alt={t.name}
                    className="size-12 rounded-full object-cover ring-1 ring-[var(--border)]"
                  />
                )}
                <div className="text-left">
                  <div className="font-semibold text-[var(--text-primary)]">{t.name}</div>
                  <div className="text-sm text-[var(--text-muted)]">{t.designation}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={handlePrev}
          aria-label="Previous testimonial"
          className="flex size-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition hover:bg-[var(--bg-elevated)]"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => {
                setDirection(i > active ? 1 : -1);
                setActive(i);
              }}
              className={`h-1.5 rounded-full transition-all ${
                active === i ? "w-6 bg-[var(--text-primary)]" : "w-1.5 bg-[var(--border)]"
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          aria-label="Next testimonial"
          className="flex size-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition hover:bg-[var(--bg-elevated)]"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
