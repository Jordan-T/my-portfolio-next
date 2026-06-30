import type { AvailabilityStatus, SocialLink } from "@/types";
import { yearsOfExperience } from "@/config/experience";

/** Single source of truth for personal info used across the site. */
export const siteConfig = {
  name: "Jordan Taisne",
  creationYear: 2019,
  role: "Tech Lead Front-End · Junior Architect",
  location: "Lille Métropole, France",
  url: "https://jordan-t.dev",
  email: "contact@jordan-t.dev",
  cvUrl: "/cv.pdf",
  availabilityStatus: "passive" satisfies AvailabilityStatus,
  philosophy: `Plus de ${yearsOfExperience} ans à concevoir des architectures front-end durables. Bâtir un système robuste impose de traiter la performance et l'accessibilité comme des fondations. Convaincu que l'excellence se construit à plusieurs, je m'investis pour transmettre cette exigence au quotidien, susciter la passion technique et faire grandir l'équipe.`,
  socials: [
    { label: "GitHub", url: "https://github.com/Jordan-T" },
    { label: "GitLab", url: "https://gitlab.com/Jordan-T" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/jordantaisne59" },
  ] satisfies SocialLink[],
  languages: [
    { name: "Français", comment: "natif" },
    { name: "Anglais", comment: "compréhension fluide" },
  ],
  mobility: [
    { name: "Permis B - Véhiculé" },
    { name: "Télétravail : Flexible", comment: "Hybride ou Full" },
  ] satisfies { name: string; comment?: string }[],
  interests: ["Développement", "Course à pied", "Randonnée", "Jeux vidéo"],
} as const;
