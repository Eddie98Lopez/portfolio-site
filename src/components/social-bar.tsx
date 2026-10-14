import Link from "next/link";
import type { ComponentType } from "react";
import {
  SiFacebook,
  SiInstagram,
  SiX,
  SiTiktok,
  SiYoutube,
  SiTwitch,
  SiGithub,
} from "@icons-pack/react-simple-icons";

export type SocialLink = {
  platform: string;
  href: string;
};

type SocialLinksBarProps = {
  links: SocialLink[];
};

type IconProps = { className?: string };

// LinkedIn is NOT in Simple Icons (removed in v14 over trademark restrictions),
// so we ship it as an inline SVG. Same 24x24 viewBox and currentColor fill as
// the Simple Icons components, so it sizes and colors identically.
function LinkedinIcon({ className }: IconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

// Platform name -> icon component. Keys are lowercased so the lookup is
// case-insensitive. "twitter" and "x" both resolve to the X logo (SiX).
const ICONS: Record<string, ComponentType<IconProps>> = {
  facebook: SiFacebook,
  instagram: SiInstagram,
  twitter: SiX,
  x: SiX,
  tiktok: SiTiktok,
  linkedin: LinkedinIcon,
  youtube: SiYoutube,
  twitch: SiTwitch,
  github: SiGithub,
};

export default function SocialLinksBar({ links }: SocialLinksBarProps) {
  return (
    <ul className="flex items-center gap-3 justify-center">
      {links.map(({ platform, href }) => {
        const Icon = ICONS[platform.toLowerCase()];
        if (!Icon) return null; // skip any platform that isn't mapped

        return (
          <li key={`${platform}-${href}`}>
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={platform}
              className="group block"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition-colors hover:bg-neutral-900 hover:text-white">
                <Icon className="size-6" />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
