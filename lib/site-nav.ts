/** Page sections in scroll order (top → bottom) */
export const siteNavLinks = [
  {
    label: "Home",
    shortLabel: "Home",
    id: "hero",
    hint: "Build your Bali desk today",
  },
  {
    label: "Who it's for",
    shortLabel: "For you",
    id: "personas",
    hint: "Nomad personas we serve",
  },
  {
    label: "Why monis",
    shortLabel: "Why us",
    id: "benefits",
    hint: "Delivery, flexibility, trust",
  },
  {
    label: "How it works",
    shortLabel: "Process",
    id: "how-it-works",
    hint: "3 steps to a ready desk",
  },
  {
    label: "Build",
    shortLabel: "Build",
    id: "nomad-presets",
    hint: "3D canvas & presets",
  },
] as const;

export type SiteNavLinkId = (typeof siteNavLinks)[number]["id"];
