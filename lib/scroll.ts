const HEADER_OFFSET = 80;

export function smoothScrollTo(
  element: HTMLElement | null,
  offset = HEADER_OFFSET,
) {
  if (!element || typeof window === 'undefined') return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  const top =
    element.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  });
}
