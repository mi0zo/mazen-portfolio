import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SpringConfig {
  tension?: number;
  friction?: number;
  mass?: number;
}

export function createSpring(
  config: SpringConfig = {},
  onUpdate: (value: number) => void
) {
  const tension = config.tension ?? 120;
  const friction = config.friction ?? 14;
  const mass = config.mass ?? 1;

  let current = 0;
  let target = 0;
  let velocity = 0;
  let rafId = 0;
  let lastTime = 0;

  function step(time: number) {
    if (!lastTime) lastTime = time;
    const dt = Math.min((time - lastTime) / 1000, 0.064);
    lastTime = time;

    // Semi-implicit Euler integration
    const force = -tension * (current - target);
    const damping = -friction * velocity;
    const accel = (force + damping) / mass;

    velocity += accel * dt;
    current += velocity * dt;

    onUpdate(current);

    if (Math.abs(velocity) > 0.0005 || Math.abs(current - target) > 0.0005) {
      rafId = requestAnimationFrame(step);
    } else {
      current = target;
      velocity = 0;
      onUpdate(current);
      rafId = 0;
      lastTime = 0;
    }
  }

  return {
    set(newTarget: number) {
      target = newTarget;
      if (!rafId) {
        lastTime = 0;
        rafId = requestAnimationFrame(step);
      }
    },
    snap(newTarget: number) {
      target = newTarget;
      current = newTarget;
      velocity = 0;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      onUpdate(current);
    },
    get() {
      return current;
    },
    destroy() {
      if (rafId) cancelAnimationFrame(rafId);
    },
  };
}

