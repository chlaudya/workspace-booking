const HEADER_OFFSET = 80;

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function smoothScrollTo(
  element: HTMLElement | null,
  offset = HEADER_OFFSET,
) {
  if (!element || typeof window === 'undefined') return;

  const top =
    element.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });
}

export function smoothScrollToId(id: string, offset = HEADER_OFFSET) {
  smoothScrollTo(document.getElementById(id), offset);
}

export function smoothScrollToTop() {
  if (typeof window === 'undefined') return;

  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });
}
