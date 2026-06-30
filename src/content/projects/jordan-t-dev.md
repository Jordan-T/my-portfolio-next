---
image: "/projects/jordan-t-dev.svg"
title: "jordan-t.dev v2"
description: "Refonte complète du portfolio sous Next.js : performance, accessibilité, pérennité, dépôt public et un CV généré automatiquement. Le tout, sans jamais oublier de se faire plaisir."
status: "done"
featured: true
date: "2026-06-01"
decision: "Quitter Gatsby pour Next.js App Router : la plateforme a rattrapé ce qui justifiait Gatsby. React Server Components par défaut, CSS-First, et un site qui reste navigable sans aucun JavaScript."
takeaways:
  - "Migration de Gatsby vers Next.js App Router : la plateforme a rattrapé ce qui justifiait Gatsby, et la maintenance devenait trop coûteuse."
  - "React Server Components par défaut et approche CSS-First : le JavaScript client est traité comme un budget, pas comme un acquis."
  - "Le site reste navigable sans aucun JavaScript, et l'accessibilité (clavier, focus, mouvement réduit) a été conçue dès le départ."
  - "Résultat : Lighthouse 99/100/100 sur mobile, avec un Total Blocking Time à 0 ms et zéro décalage de mise en page."
external: "https://jordan-t.dev"
github: "https://github.com/Jordan-T/my-portfolio-next"
tags:
  - label: "Next.js"
    type: "framework"
  - label: "TypeScript"
    type: "language"
  - label: "CSS Modules"
    type: "tool"
  - label: "MDX"
    type: "tool"
  - label: "Performance"
    type: "concept"
  - label: "Accessibilité"
    type: "concept"
---

Ce site. Une refonte complète, où chaque choix technique devient sa propre démonstration.

## Pourquoi refondre

Gatsby a été un bon choix en son temps, surtout pour sa couche de données et son pipeline d'images (placeholders SVG, formats responsives, lazy-loading natif). Mais l'écosystème a bougé, et moi avec. Ce que Gatsby résolvait via une abstraction lourde, la plateforme le fait aujourd'hui nativement, et la v1 embarquait du JavaScript client malgré un objectif inverse.

Le déclencheur réel, c'est la maintenance. Les montées de version sur Gatsby devenaient complexes et chronophages. Je cherchais un socle durable, qui limite la dette technique, plutôt qu'un choix optimal sur un seul critère à un instant donné.

## Pourquoi Next, et pas Astro

Astro était tentant : zéro JS par défaut, architecture en îlots, idéal pour un site de contenu comme celui-ci. En génération statique pure, il aurait sans doute produit un build plus léger que Next, qui ajoute toujours un peu de JavaScript. Pour ce site précis, ça aurait suffi.

Le critère décisif n'est pas ce site isolé, c'est la suite. Next est massivement implanté, son écosystème (RSC, View Transitions, gestion des images) domine la concurrence, et il laisse la porte ouverte au dynamique côté serveur si je veux faire évoluer le projet. Astro m'aurait sans doute enfermé dans le statique, comme Gatsby m'avait enfermé sur les montées de version. Entre le plus léger maintenant et le plus évolutif ensuite, j'ai tranché pour la durabilité.

## Le JavaScript est un budget

La règle que je me suis fixée inverse la logique habituelle. Au lieu d'ajouter du client par défaut et de retirer « si on a le temps », chaque kilo-octet de JavaScript doit gagner sa place.

- **Architecture :** React Server Components par défaut, tout est serveur sauf preuve du contraire. Les rares îlots interactifs sont des `'use client'` explicites et isolés, jamais une contamination de tout l'arbre.
- **Styles :** CSS Modules plutôt que Tailwind ou CSS-in-JS, pour garder un runtime de style à zéro. L'animation passe par le CSS natif (scroll-driven animations, View Transitions), sans framework dédié.
- **Décisions tracées :** le dépôt est public, et chaque arbitrage vit dans un ADR versionné (`.ai/decisions/`). J'écris mes décisions pour pouvoir les discuter plus tard, pas seulement pour les prendre.

## Le CV, généré depuis une source unique

Le CV téléchargeable n'est pas un fichier maintenu à la main. Il est généré automatiquement à partir de la même configuration que le site, via `@react-pdf/renderer`. L'idée : une seule source de vérité, pour que le CV ne puisse jamais contredire le site.

Les vrais défis étaient ailleurs que dans la génération elle-même. D'abord le typage strict des données, pour garantir que ce qui alimente le PDF est exactement ce qui alimente le site. Ensuite la mise en page : le moteur de rendu PDF n'utilise qu'un sous-ensemble de Flexbox, avec ses propres contraintes, qu'il a fallu apprivoiser pour rester fidèle au rendu web.

## L'accessibilité, conçue et non rattrapée

Le site reste lisible et utilisable avec JavaScript désactivé. C'est de l'amélioration progressive au sens strict : le contenu est rendu côté serveur et vit dans le HTML servi, la navigation repose sur de vrais liens. Ce qui marche sans JS marche aussi quand le JS échoue à charger, sur connexion lente ou bundle en erreur.

Concrètement, l'accessibilité a été traitée dès la conception : navigation entièrement au clavier avec des focus toujours visibles, un lien d'évitement pour rejoindre directement le contenu, et le respect de `prefers-reduced-motion` pour qui désactive les animations.

Le soin va jusqu'à l'impression du CV. Plutôt que d'empiler des surcharges CSS, la couleur a été pensée à la racine : la luminosité de la teinte primaire est calibrée pour rester identique à l'écran, tout en garantissant un contraste correct une fois imprimée en noir et blanc.

## Les chiffres

Pour vérifier ces arbitrages, les mesures comptent autant que les intentions. Sur Lighthouse, en émulation mobile (Moto G Power, 4G lente) :

- **Performances :** 99
- **Accessibilité :** 100
- **Bonnes pratiques :** 100
- **First Contentful Paint :** 0,9 s
- **Largest Contentful Paint :** 2,0 s
- **Total Blocking Time :** 0 ms
- **Cumulative Layout Shift :** 0
- **Speed Index :** 0,9 s

Le TBT à 0 ms et le CLS à 0 sont les deux chiffres qui résument la démarche : le thread principal n'est jamais bloqué par du JavaScript au démarrage, et rien ne saute à l'écran pendant le chargement. C'est la conséquence directe du « JS est un budget ».

Je croise aussi avec GTmetrix, qui note Grade A (100 % en performance, 99 % en structure) et apporte d'autres angles utiles comme le waterfall réseau. Croiser deux outils évite de s'enfermer dans un seul référentiel.

---

_Ce projet est vivant et open-source. Si vous repérez un axe d'amélioration, un comportement inattendu, ou si vous voulez simplement échanger sur ces choix d'architecture, n'hésitez pas à ouvrir une issue sur le dépôt._
