---
title: "Jordan-T Labs"
description: "Mon terrain de jeu front-end : des démos et expériences techniques (CSS, animations, performance, WebGL, POCs), chacune avec son explication et un retour d'expérience. En Astro, zéro JavaScript par défaut."
status: "wip"
featured: true
date: "2026-05-01"
decision: "Un projet à part en Astro plutôt que dans le portfolio Next : un bac à sable agressivement statique et agnostique aux frameworks, où chaque démo paie son propre coût en JavaScript sans contaminer le reste. Le portfolio reste le produit durable et labs reste le terrain de jeu."
takeaways:
  - "Mon terrain de jeu front-end : je publie des démos et expériences techniques (CSS, animations, performance, WebGL, POCs), chacune avec son explication et un retour d'expérience."
  - "Astro est agnostique aux frameworks : une démo peut embarquer React, Vue, Svelte ou du TypeScript pur dans son propre îlot, sans toucher au reste du site."
  - "Zéro JavaScript client par défaut : l'interactivité passe par des îlots, hydratés seulement là où c'est nécessaire (client:visible / client:idle)."
  - "Le but est explicite : montrer des expériences et récupérer des retours. C'est le principe même du projet."
external: "https://labs.jordan-t.dev"
tags:
  - label: "Astro"
    type: "framework"
  - label: "TypeScript"
    type: "language"
  - label: "MDX"
    type: "tool"
---

Dans l'article du portfolio, j'expliquais pourquoi j'avais écarté Astro pour jordan-t.dev. Labs, c'est l'autre moitié de cette décision : le projet où Astro devient le bon outil. Mon terrain de jeu front-end, où je publie des démos accompagnées d'une explication et d'un retour d'expérience.

## Pourquoi un projet à part

Le portfolio est le produit durable. Il garde la porte ouverte au rendu serveur et à un large écosystème, et il a sa propre feuille de route. À côté, j'avais besoin d'un endroit pour publier de petites expériences front : une animation CSS, un test de performance, un POC. Des choses où la priorité n'est pas l'évolutivité, mais un socle JavaScript quasi nul et le modèle d'îlots.

Les loger dans le portfolio aurait coûté des deux côtés : soit diluer sa feuille de route, soit imposer son framework à du contenu qui n'a pas les mêmes contraintes. J'ai donc fait un site statique distinct, labs.jordan-t.dev, en Astro avec un export 100 % statique, déployé sur Vercel. Les deux sites se renvoient l'un à l'autre dans l'en-tête et le pied de page.

Le coût est assumé : deux projets et deux déploiements à maintenir en parallèle, au lieu d'un seul. En échange, chacun optimise son propre objectif sans compromis sur celui de l'autre.

## Astro ici, Next là-bas : le même critère, deux réponses

Pour le portfolio, le critère décisif n'était pas le site isolé, c'était la suite : pouvoir évoluer vers du serveur, m'appuyer sur un écosystème large. Next l'emportait, et Astro m'aurait sans doute enfermé dans le statique.

Pour labs, la contrainte est exactement inversée. Ici, il n'y a que du contenu et des démos, aucun besoin de marge côté serveur. La propriété qui « enfermait » avec Astro, le statique pur, est précisément celle que je recherche. Même raisonnement, conclusion opposée. C'est ce qui me fait dire qu'un outil n'est ni bon ni mauvais dans l'absolu : il colle, ou non, à une contrainte donnée.

## Agnostique aux frameworks : le vrai atout d'un terrain de jeu

C'est l'argument qui fait d'Astro le bon choix pour un labo, plus encore que le statique. Astro n'impose aucun framework d'interface. Une démo peut embarquer React, une autre Vue ou Svelte, une troisième rester en TypeScript pur. Chacune vit dans son propre îlot, sans que j'aie à réarchitecturer le site.

Le socle, lui, ne bouge pas : du HTML statique, zéro JavaScript par défaut. Seul l'îlot qui en a besoin paie le coût de sa techno, et ce coût reste local à la démo. C'est exactement ce qu'on attend d'un terrain de jeu : tester une idée avec l'outil qui lui convient, sans contaminer le reste.

Pour être honnête sur l'état réel : aujourd'hui, seul Preact est branché dans le projet. La porte est ouverte, les autres frameworks s'ajoutent via les intégrations officielles d'Astro, mais je préfère ne pas présenter comme acquis ce qui ne l'est pas encore.

## Le JavaScript est un budget

La règle du portfolio se retrouve ici, appliquée par défaut. Les composants `.astro` sont rendus en HTML statique au build : zéro JavaScript tant que rien ne le justifie. L'interactivité passe uniquement par des îlots, hydratés en `client:visible` ou `client:idle`, jamais `client:load`. Chaque îlot est une feuille de l'arbre, il ne réhydrate pas toute la page autour de lui.

Preact sert de runtime par défaut, pour garder le poids d'un îlot au minimum. Les autres frameworks restent disponibles au cas par cas, quand une démo le mérite vraiment.

## Un cadre pour le site, de la liberté pour les démos

Un labo n'a d'intérêt que si on peut y bricoler librement. Le risque, quand on aime l'architecture propre, c'est de tout verrouiller au point de s'empêcher d'expérimenter.

J'ai donc séparé deux niveaux. Le shell du site, la mise en page, la navigation, les cartes, reste tenu et cohérent, dans une approche CSS-first. C'est lui qui donne au site son unité. Mais chaque démo garde sa latitude : son propre CSS, ses propres media queries si l'expérience l'exige. Le cadre est là pour servir d'appui, pas pour brider ce que je viens justement tester.

Un système de tokens partagés existe pour les couleurs et les espacements, mais je le traite comme un outil en cours, pas comme une règle fermée.

---

_Le site est en ligne pour une raison simple, qui est le principe même du projet : montrer des expériences, et récupérer des retours. Chaque expérience vient avec sa démo en direct et une courte explication de ce que j'ai cherché à faire. Si une démo vous parle, si vous repérez un comportement étrange, ou si vous voulez discuter d'un choix, n'hésitez pas à m'écrire._
