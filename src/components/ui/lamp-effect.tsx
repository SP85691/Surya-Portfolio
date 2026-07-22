"use client";

/**
 * FACTS (GateGuard):
 * 1. Caller: src/components/marketing/lamp-section.tsx — LampContainer import
 * 2. Existing file — soft-physics fix for rigid drag / instant stop
 * 3. No data-file I/O
 * 4. User: light-theme lamp invisible on home + contact — strengthen glow/bulb
 */

import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger, useGSAP);

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Extra classes for the content stack under the bulb (e.g. more top clearance). */
  contentClassName?: string;
};

const MAX_ANGLE = 58;
const CORD_REST = 148;
const GRAVITY = 6.2;
const DAMPING = 0.085;
const LENGTH = 2.35;
const DRAG_FOLLOW = 0.14;
const CORD_FOLLOW = 0.12;
const SETTLE_ANGLE = 0.35;
const SETTLE_VEL = 0.04;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function degToRad(d: number) {
  return (d * Math.PI) / 180;
}

function radToDeg(r: number) {
  return (r * 180) / Math.PI;
}

export function LampContainer({ children, className, contentClassName }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pivotRef = useRef<HTMLDivElement>(null);
  const armRef = useRef<HTMLDivElement>(null);
  const cordRef = useRef<SVGLineElement>(null);
  const bulbRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
  const rimRef = useRef<HTMLDivElement>(null);

  const angleRef = useRef(0);
  const velRef = useRef(0);
  const cordLenRef = useRef(CORD_REST);
  const targetAngleRef = useRef(0);
  const targetCordRef = useRef(CORD_REST);
  const draggingRef = useRef(false);
  const litRef = useRef(true);
  const [lit, setLit] = useState(true);
  const [hint, setHint] = useState(true);

  const applyPose = useCallback((angleDeg: number, cordLen = CORD_REST) => {
    const arm = armRef.current;
    const cord = cordRef.current;
    const glow = glowRef.current;
    const bloom = bloomRef.current;
    const rim = rimRef.current;
    const root = rootRef.current;
    if (!arm || !cord || !glow || !bloom || !rim || !root) return;

    const rad = degToRad(angleDeg);
    const bx = Math.sin(rad) * cordLen;
    const by = Math.cos(rad) * cordLen;

    gsap.set(arm, { rotation: angleDeg, transformOrigin: "50% 0%" });
    cord.setAttribute("y2", String(cordLen));

    const intensity = litRef.current ? 1 : 0.14;

    gsap.set(glow, {
      x: bx,
      y: by * 0.28,
      scale: 0.9 + intensity * 0.4,
    });
    gsap.set(bloom, {
      x: bx * 0.92,
      y: by * 0.38,
      scale: 0.95 + intensity * 0.2,
    });
    gsap.set(rim, {
      x: bx * 0.7,
      y: by * 0.48,
      scale: 1,
    });

    root.style.setProperty("--lamp-bx", `calc(50% + ${bx}px)`);
    root.style.setProperty("--lamp-by", `${by + 28}px`);
    root.style.setProperty("--lamp-on", String(intensity));
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      const bulb = bulbRef.current;
      const pivot = pivotRef.current;
      if (!root || !bulb || !pivot) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          canPlay: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion, canPlay } = context.conditions ?? {};

          applyPose(0, CORD_REST);

          if (reduceMotion || !canPlay) {
            litRef.current = true;
            applyPose(0, CORD_REST);
            return;
          }

          const simulating = { on: true };
          cordLenRef.current = CORD_REST;

          const intro = gsap.fromTo(
            angleRef,
            { current: -8 },
            {
              current: 8,
              duration: 1.8,
              ease: "sine.inOut",
              yoyo: true,
              repeat: 2,
              onStart: () => {
                simulating.on = false;
              },
              onUpdate: () => {
                if (!draggingRef.current) {
                  cordLenRef.current = CORD_REST;
                  applyPose(angleRef.current, CORD_REST);
                }
              },
              onComplete: () => {
                angleRef.current = 0;
                velRef.current = 0;
                simulating.on = true;
                applyPose(0, CORD_REST);
              },
              scrollTrigger: {
                trigger: root,
                start: "top 75%",
                once: true,
              },
            },
          );

          const tick = () => {
            const dt = Math.min(0.033, gsap.ticker.deltaRatio(60) / 60);
            if (dt <= 0) return;

            if (draggingRef.current) {
              const prev = angleRef.current;
              const next = prev + (targetAngleRef.current - prev) * DRAG_FOLLOW;
              const dTheta = degToRad(next - prev);
              const instVel = dTheta / Math.max(dt, 0.008);
              velRef.current = velRef.current * 0.72 + instVel * 0.28;
              angleRef.current = next;
              cordLenRef.current +=
                (targetCordRef.current - cordLenRef.current) * CORD_FOLLOW;
              applyPose(angleRef.current, cordLenRef.current);
              return;
            }

            if (!simulating.on) return;

            if (Math.abs(cordLenRef.current - CORD_REST) > 0.4) {
              cordLenRef.current += (CORD_REST - cordLenRef.current) * 0.1;
            } else {
              cordLenRef.current = CORD_REST;
            }

            const theta = degToRad(angleRef.current);
            const accel =
              -(GRAVITY / LENGTH) * Math.sin(theta) - DAMPING * velRef.current;
            velRef.current += accel * dt;
            let nextAngle = radToDeg(theta + velRef.current * dt);

            if (nextAngle > MAX_ANGLE || nextAngle < -MAX_ANGLE) {
              nextAngle = clamp(nextAngle, -MAX_ANGLE, MAX_ANGLE);
              velRef.current *= -0.55;
            }

            angleRef.current = nextAngle;

            if (
              Math.abs(angleRef.current) < SETTLE_ANGLE &&
              Math.abs(velRef.current) < SETTLE_VEL
            ) {
              angleRef.current *= 0.9;
              velRef.current *= 0.85;
              if (Math.abs(angleRef.current) < 0.05) {
                angleRef.current = 0;
                velRef.current = 0;
              }
            }

            applyPose(angleRef.current, cordLenRef.current);
          };
          gsap.ticker.add(tick);

          const proxy = document.createElement("div");
          gsap.set(proxy, { x: 0, y: CORD_REST });
          InertiaPlugin.track(proxy, "x,y");

          const pivotRect = () => pivot.getBoundingClientRect();

          const angleFromPointer = (clientX: number, clientY: number) => {
            const p = pivotRect();
            const px = p.left + p.width / 2;
            const py = p.top;
            const dx = clientX - px;
            const dy = Math.max(40, clientY - py);
            return clamp(radToDeg(Math.atan2(dx, dy)), -MAX_ANGLE, MAX_ANGLE);
          };

          const cordFromPointer = (clientX: number, clientY: number) => {
            const p = pivotRect();
            const px = p.left + p.width / 2;
            const py = p.top;
            const dx = clientX - px;
            const dy = clientY - py;
            return clamp(
              Math.hypot(dx, dy),
              CORD_REST * 0.92,
              CORD_REST * 1.18,
            );
          };

          const [drag] = Draggable.create(proxy, {
            trigger: bulb,
            type: "x,y",
            inertia: false,
            edgeResistance: 0.65,
            onPress() {
              draggingRef.current = true;
              simulating.on = true;
              intro.kill();
              setHint(false);
              targetAngleRef.current = angleRef.current;
              targetCordRef.current = cordLenRef.current;
            },
            onDrag() {
              targetAngleRef.current = angleFromPointer(
                this.pointerX,
                this.pointerY,
              );
              targetCordRef.current = cordFromPointer(
                this.pointerX,
                this.pointerY,
              );
              gsap.set(proxy, {
                x: Math.sin(degToRad(angleRef.current)) * cordLenRef.current,
                y: Math.cos(degToRad(angleRef.current)) * cordLenRef.current,
              });
            },
            onDragEnd() {
              draggingRef.current = false;
              const vx = InertiaPlugin.getVelocity(proxy, "x") || 0;
              const vy = InertiaPlugin.getVelocity(proxy, "y") || 0;
              const throwBoost = clamp(vx * 0.0028 - vy * 0.0006, -3.2, 3.2);
              velRef.current = clamp(velRef.current + throwBoost, -4.2, 4.2);
              if (
                Math.abs(velRef.current) < 0.35 &&
                Math.abs(angleRef.current) > 4
              ) {
                velRef.current += angleRef.current > 0 ? -0.55 : 0.55;
              }
              targetCordRef.current = CORD_REST;
              gsap.set(proxy, { x: 0, y: CORD_REST });
            },
          });

          const pulse = gsap.to(bulb, {
            "--filament": 1,
            duration: 2.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

          return () => {
            gsap.ticker.remove(tick);
            drag.kill();
            pulse.kill();
            intro.kill();
            InertiaPlugin.untrack(proxy, "x,y");
            proxy.remove();
          };
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [applyPose] },
  );

  const toggleLight = () => {
    const next = !litRef.current;
    litRef.current = next;
    setLit(next);
    applyPose(angleRef.current, cordLenRef.current);
    if (next && bloomRef.current) {
      gsap.fromTo(
        bloomRef.current,
        { scale: 0.72 },
        { scale: 1, duration: 0.55, ease: "power2.out" },
      );
    }
  };

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative isolate z-0 flex min-h-[72svh] w-full flex-col items-center justify-center overflow-hidden bg-[var(--bg-page)] px-5 py-28 md:py-36",
        className,
      )}
      style={
        {
          "--lamp-bx": "50%",
          "--lamp-by": "140px",
          "--lamp-on": lit ? 1 : 0.18,
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          ref={glowRef}
          className="absolute left-1/2 top-8 h-[30rem] w-[30rem] -translate-x-1/2 will-change-transform"
          style={{
            background:
              "radial-gradient(circle at 50% 35%, var(--lamp-glow) 0%, transparent 64%)",
            filter: "blur(22px)",
            opacity: "calc(var(--lamp-glow-opacity) * var(--lamp-on))",
          }}
        />
        <div
          ref={bloomRef}
          className="absolute left-1/2 top-14 h-[38rem] w-[44rem] -translate-x-1/2 will-change-transform"
          style={{
            background:
              "radial-gradient(ellipse at 50% 28%, var(--lamp-amber) 0%, transparent 60%)",
            filter: "blur(36px)",
            opacity: "calc(var(--lamp-bloom-opacity) * var(--lamp-on))",
          }}
        />
        <div
          ref={rimRef}
          className="absolute left-1/2 top-20 h-[24rem] w-[34rem] -translate-x-1/2 will-change-transform"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, var(--lamp-rim) 0%, transparent 58%)",
            filter: "blur(42px)",
            opacity: "calc(var(--lamp-rim-opacity) * var(--lamp-on))",
          }}
        />
        {/* Downward cone — tracks bulb via --lamp-bx / --lamp-by */}
        <div
          className="absolute h-[26rem] w-[min(36rem,92vw)] -translate-x-1/2"
          style={{
            left: "var(--lamp-bx)",
            top: "calc(var(--lamp-by) + 1.25rem)",
            background:
              "conic-gradient(from 200deg at 50% 0%, transparent 0deg, var(--lamp-beam) 28deg, var(--lamp-amber) 50deg, var(--lamp-beam) 72deg, transparent 100deg)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 45%, transparent 88%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 45%, transparent 88%)",
            opacity: "calc(var(--lamp-cone-opacity) * var(--lamp-on))",
            filter: "blur(8px)",
          }}
        />
        <div
          className="absolute left-1/2 top-[7.5rem] h-px w-[min(30rem,70vw)] -translate-x-1/2"
          style={{
            backgroundImage:
              "linear-gradient(to right, transparent, var(--lamp-line), transparent)",
            opacity: "calc(0.4 + var(--lamp-on) * 0.6)",
          }}
        />
      </div>

      {/* Fixture above content so drag always wins over headlines */}
      <div className="absolute inset-x-0 top-0 z-[60] flex h-[17rem] justify-center md:h-[18rem]">
        <div ref={pivotRef} className="relative h-full w-24">
          <div
            className="absolute left-1/2 top-0 z-20 h-3.5 w-11 -translate-x-1/2 rounded-b-md border border-[var(--border)] bg-[var(--bg-elevated)] shadow-sm"
            style={{
              boxShadow:
                "0 1px 0 color-mix(in srgb, var(--text-primary) 12%, transparent)",
            }}
          />

          <div
            ref={armRef}
            className="absolute left-1/2 top-3 w-full origin-top -translate-x-1/2"
            style={{ height: CORD_REST + 56 }}
          >
            <svg
              className="absolute left-1/2 top-0 h-full w-8 -translate-x-1/2 overflow-visible"
              viewBox={`0 0 32 ${CORD_REST + 56}`}
              fill="none"
              aria-hidden
            >
              <line
                ref={cordRef}
                x1="16"
                y1="0"
                x2="16"
                y2={CORD_REST}
                stroke="var(--lamp-cord)"
                strokeWidth="2.75"
                strokeLinecap="round"
              />
            </svg>

            <button
              ref={bulbRef}
              type="button"
              onDoubleClick={(e) => {
                e.preventDefault();
                toggleLight();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleLight();
                }
              }}
              aria-pressed={lit}
              aria-label={
                lit
                  ? "Hanging lamp on. Drag to swing. Double-click or press Enter to toggle."
                  : "Hanging lamp off. Drag to swing. Double-click or press Enter to toggle."
              }
              className="absolute left-1/2 top-[9.25rem] z-30 flex -translate-x-1/2 cursor-grab touch-none flex-col items-center outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-[var(--lamp-amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-page)]"
              style={
                {
                  "--filament": lit ? 0.85 : 0.15,
                } as React.CSSProperties
              }
            >
              <span
                className="relative z-10 h-3.5 w-7 rounded-t-sm border border-[var(--border)]"
                style={{
                  background:
                    "linear-gradient(180deg, color-mix(in srgb, var(--text-muted) 45%, var(--bg-elevated)), var(--bg-elevated))",
                }}
              />
              <span
                className="relative -mt-px flex h-14 w-11 items-center justify-center rounded-[45%_45%_48%_48%/40%_40%_58%_58%] border transition-[box-shadow,background,border-color] duration-300"
                style={{
                  borderColor: lit
                    ? "var(--lamp-bulb-edge)"
                    : "color-mix(in srgb, var(--text-primary) 28%, var(--border))",
                  background: lit
                    ? "radial-gradient(circle at 38% 28%, #fff8e8 0%, var(--lamp-bulb-glass) 42%, var(--lamp-core) 78%, color-mix(in srgb, var(--lamp-amber) 80%, transparent) 100%)"
                    : "radial-gradient(circle at 40% 30%, color-mix(in srgb, var(--text-muted) 18%, var(--bg-elevated)), var(--bg-elevated) 70%)",
                  boxShadow: lit
                    ? "0 0 18px color-mix(in srgb, var(--lamp-core) 75%, transparent), 0 0 42px color-mix(in srgb, var(--lamp-amber) 65%, transparent), 0 8px 28px color-mix(in srgb, var(--lamp-amber) 35%, transparent), inset 0 1px 0 color-mix(in srgb, #fff 55%, transparent)"
                    : "inset 0 1px 0 color-mix(in srgb, var(--text-primary) 6%, transparent)",
                }}
              >
                <span
                  className="block h-5 w-3 rounded-sm"
                  style={{
                    background: `linear-gradient(180deg, transparent 8%, color-mix(in srgb, var(--lamp-filament) calc(var(--filament) * 100%), transparent) 48%, transparent 92%)`,
                    opacity: lit ? 1 : 0.4,
                    filter: lit
                      ? "drop-shadow(0 0 4px color-mix(in srgb, var(--lamp-filament) 80%, transparent))"
                      : "none",
                  }}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {hint ? (
        <p className="pointer-events-none absolute left-1/2 top-[14.75rem] z-[55] -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:top-[15.5rem]">
          Drag the lamp · double-click to toggle
        </p>
      ) : null}

      <div
        className={cn(
          "relative z-40 mt-24 flex w-full max-w-3xl flex-col items-center pt-6 md:mt-28 md:pt-8",
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
