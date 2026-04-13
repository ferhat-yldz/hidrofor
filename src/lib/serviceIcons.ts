import {
  Activity,
  Droplet,
  Target,
  Award,
  Zap,
  Clock,
  Wrench,
  Waves,
  ShieldCheck,
  Shield,
  Gauge,
} from "lucide-react";
import type { ServiceIconKey, ServiceIconMap } from "@/types/content";

export const SERVICE_ICON_MAP: ServiceIconMap = {
  activity: Activity,
  droplet: Droplet,
  target: Target,
  award: Award,
  zap: Zap,
  clock: Clock,
  wrench: Wrench,
  waves: Waves,
  shieldCheck: ShieldCheck,
  shield: Shield,
  gauge: Gauge,
};

export function isServiceIconKey(k: string): k is ServiceIconKey {
  return k in SERVICE_ICON_MAP;
}
