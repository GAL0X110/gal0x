import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  Send,
  Globe,
  Twitter,
  type LucideIcon,
} from "lucide-react";
import type { SocialKey } from "@/config/profile";

const ICONS: Record<SocialKey, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  telegram: Send,
  email: Mail,
  twitter: Twitter,
  website: Globe,
};

export function SocialIcon({
  icon,
  className,
}: {
  icon: SocialKey;
  className?: string;
}) {
  const Icon = ICONS[icon] ?? Globe;
  return <Icon className={className} aria-hidden="true" />;
}
