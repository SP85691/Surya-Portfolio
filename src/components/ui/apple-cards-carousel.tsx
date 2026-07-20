"use client";

import { motion, useAnimate } from "motion/react";
import { useEffect, useRef, useState } from "react";

export type AppleCard = {
  title: string;
  description: string;
  src?: string;
  category: string;
  content: React.ReactNode;
};

export function AppleCardsCarousel({ items }: { items: AppleCard[] }) {
  const [cards, setCards] = useState<AppleCard[]>(items);
  const [isDragging, setIsDragging] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate();

  const [constraint, setConstraint] = useState(0);
  useEffect(() => {
    if (carouselRef.current) {
      setConstraint(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [cards]);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          className="flex w-full cursor-pointer overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
          ref={carouselRef}
        >
          <motion.div
            ref={scope}
            drag="x"
            dragConstraints={{ right: 0, left: -constraint }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            className="flex gap-4"
          >
            {cards.map((card, i) => (
              <CarouselCard key={card.title + i} card={card} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function CarouselCard({ card }: { card: AppleCard }) {
  return (
    <div className="relative w-[330px] shrink-0 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-surface)]">
      {card.src && (
        <img src={card.src} alt={card.title} className="h-[260px] w-full object-cover" />
      )}
      <div className="p-6">
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          {card.category}
        </span>
        <h3 className="mt-2 font-display text-xl font-semibold text-[var(--text-primary)]">
          {card.title}
        </h3>
        <p className="mt-2 text-sm text-[var(--text-muted)]">{card.description}</p>
        <div className="mt-4 text-sm text-[var(--text-primary)]">{card.content}</div>
      </div>
    </div>
  );
}
