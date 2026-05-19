import {
  BadgeCheck,
  Shield,
  Clock3,
  AlertTriangle,
  CalendarCheck2,
  Wifi,
  Code2,
  Video,
  type LucideIcon,
} from "lucide-react";
import type { BookingPhase } from "./types";

export const hostReliability: {
  label: string;
  value: string;
  icon: LucideIcon;
}[] = [
  { label: "Identity", value: "Verified", icon: BadgeCheck },
  { label: "Payment", value: "Verified", icon: Shield },
  { label: "Avg response", value: "< 12 min", icon: Clock3 },
  { label: "Completion rate", value: "98.6%", icon: CalendarCheck2 },
  { label: "Dispute rate", value: "0.7%", icon: AlertTriangle },
];

export const trustTimeline: { key: BookingPhase; label: string }[] = [
  { key: "request-sent", label: "Request sent" },
  { key: "host-confirmed", label: "Host confirmed" },
  { key: "hold-authorized", label: "Payment hold authorized" },
  { key: "contract-signed", label: "Contract signed" },
  { key: "key-handoff", label: "Key handoff" },
];

export const nomadPresets = [
  {
    id: "deep-work",
    title: "Deep Work",
    subtitle: "Focus-heavy coding days",
    icon: Code2,
    productIds: [
      "desk-modern",
      "chair-ergonomic",
      "monitor-27",
      "headphones",
      "lamp",
    ],
  },
  {
    id: "creator",
    title: "Creator Studio",
    subtitle: "Calls, streams, content",
    icon: Video,
    productIds: [
      "desk-modern",
      "chair-ergonomic",
      "monitor-ultrawide",
      "webcam",
      "headphones",
    ],
  },
  {
    id: "minimal-travel",
    title: "Minimal Travel",
    subtitle: "Lean setup, easy move",
    icon: Wifi,
    productIds: [
      "desk-compact",
      "chair-minimal",
      "monitor-27",
      "keyboard",
      "mouse",
    ],
  },
] as const;
