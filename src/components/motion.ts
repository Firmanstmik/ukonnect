/**
 * Shared motion primitives.
 *
 * `EASE_OUT` is the project's signature ease-out curve (cubic-bezier),
 * used by every animated surface so timing stays consistent. Typed `as const`
 * so Framer Motion infers the 4-tuple `Easing` type rather than `number[]`.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Softer deceleration for luxury surfaces — almost imperceptible, never mechanical. */
export const EASE_LUXURY = [0.16, 1, 0.3, 1] as const;
