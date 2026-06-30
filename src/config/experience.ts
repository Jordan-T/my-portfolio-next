import type { Experience } from "@/types";

/** Work experience, most recent first. */
export const experience: Experience[] = [
  {
    company: "Refectory",
    companyInfo: "anciennement Dejbox",
    role: "Développeur Front-End Senior",
    startDate: "2020-05-01",
    endDate: undefined,
    url: "https://www.refectory.fr/",
    highlights: [
      "Pilotage et développement de l'écosystème Nuxt/Vue (E-commerce, Back-office, App logistique) pour absorber 35 000 repas/jour et gérer les pics de charge critiques.",
      "Refonte du tunnel d'achat (hausse du panier moyen via A/B testing) avec une forte exigence UI/UX (micro-interactions, audits de performance Vue 3).",
      "Mentorat technique de proximité d'un développeur junior (transition de WordPress vers Vue/Nuxt) jusqu'à sa pleine autonomie.",
    ],
  },
  {
    company: "altima°",
    companyInfo: "intégré au groupe Accenture",
    role: "Développeur Front-End & Lead front technique",
    startDate: "2015-07-08",
    endDate: "2020-04-29",
    url: "https://newsroom.accenture.fr/fr/news/2017/company-news-release-altima-commerce-digital",
    highlights: [
      "Lead front technique sur le compte Crédit Agricole (sous-traitance IBM) : structure CSS pour une trentaine de devs back, intégration au CMS Adobe AEM, formation de deux juniors.",
      "Gouvernance de design system chez AXA : centralisation de 100+ couleurs via linter dans un fichier SASS unique, rendant chaque ajout conscient.",
      "Présentations techniques internes et évaluation de technos pour l'équipe : POC Gatsby présenté puis écarté, accompagnement sur les bonnes pratiques Vue.",
    ],
  },
  {
    company: "insitaction",
    role: "Intégrateur Front-End",
    startDate: "2011-10-01",
    endDate: "2015-07-07",
    url: "https://www.datasolution.fr/partenariat-datasolution-altavia/",
    highlights: [
      "Industrialisation des pratiques de l'agence (normes Atomic Design, SASS/Compass, JS modulaire et POO).",
      "Conception d'expériences interactives et de configurateurs visuels avancés.",
      "Intégration UI et optimisation de sites e-commerce (Décathlon, Flunch Traiteur, …) et de sites vitrines animés (Geonaute 360, …).",
    ],
  },
];

const firstJobStartDate = experience.sort((a, b) => {
  const aDate = a.startDate ? new Date(a.startDate) : new Date();
  const bDate = b.startDate ? new Date(b.startDate) : new Date();
  return aDate.getTime() - bDate.getTime();
})[0]?.startDate;

export const yearsOfExperience = firstJobStartDate
  ? Math.floor(
      (new Date().getTime() - new Date(firstJobStartDate).getTime()) /
        (1000 * 60 * 60 * 24 * 365),
    )
  : 0;
