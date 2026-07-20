"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function TracingBeam({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
    stiffness: 500,
    damping: 90,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight - 80]), {
    stiffness: 500,
    damping: 90,
  });

  return (
    <motion.div
      ref={ref}
      className={`relative mx-auto h-full w-full max-w-4xl ${className ?? ""}`}
    >
      <div className="absolute -left-4 md:-left-20 top-3">
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0 ? "none" : "0 0 0 2px var(--border) inset",
          }}
          className="ml-[27px] flex h-4 w-4 items-center justify-center rounded-full bg-[var(--bg-surface)] ring-1 ring-[var(--border)]"
        />
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight}`}
            fill="none"
            stroke="var(--border)"
            strokeOpacity="0.4"
            strokeWidth="1.25"
            transition={{ duration: 10 }}
          />
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight}`}
            fill="none"
            stroke="var(--text-primary)"
            strokeWidth="1.25"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}
