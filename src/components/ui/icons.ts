import {
  BadgeCheck,
  BarChart3,
  Building2,
  FileText,
  Globe,
  Handshake,
  Heart,
  KeyRound,
  Users,
} from 'lucide-react';

/**
 * Named icon registry, so content modules can reference an icon by string
 * without importing React components into the content layer.
 */
export const icons = {
  globe: Globe,
  users: Users,
  heart: Heart,
  fileText: FileText,
  badgeCheck: BadgeCheck,
  keyRound: KeyRound,
  barChart: BarChart3,
  building: Building2,
  handshake: Handshake,
} as const;

export type IconName = keyof typeof icons;
