---
title: "Unlocker Game"
description: "Mini-jeu inspiré des coffres R.P.D. de Resident Evil 2 Remake."
status: "done"
featured: false
date: "2019-12-20"
decision: "Partir de la base que l'ami connaît, du jQuery, puis migrer vers TypeScript avec Vite pour lui montrer qu'un changement d'outil est sûr et progressif. Pas de framework mais des composants maison isolés : plus de code à écrire soi-même, en échange d'un périmètre clair par composant et du plaisir de tout maîtriser."
external: "https://unlock-game.vercel.app/"
github: "https://github.com/Jordan-T/unlock-game"
tags:
  - label: "TypeScript"
    type: "language"
  - label: "SCSS"
    type: "language"
  - label: "Vite"
    type: "tool"
---

Mini-jeu inspiré du coffre portatif R.P.D. de Resident Evil 2 Remake : il faut trouver la
bonne combinaison pour l'ouvrir, contre la montre et avec les bruitages d'ambiance qui vont
avec. À l'origine, une discussion avec un ami qui voulait recréer ce petit puzzle. Je sortais
d'une formation TypeScript et je cherchais un prétexte pour mettre en pratique, en soignant au
passage le style en CSS. Je l'ai fait vite, juste pour le plaisir.

## Dédramatiser le changement de techno

Pour démarrer, j'ai posé le jeu sur une base que mon ami connaissait : du jQuery, dans un bac
à sable en ligne, puis du JavaScript classique. Mais j'ai toujours été convaincu par
TypeScript. Alors quand j'ai fait passer le projet sous Vite, j'en ai profité pour tout migrer
en TS, et montrer à mon ami, plutôt réticent, que changer d'outil est sûr et pas si compliqué.

## Pas de framework, juste des composants maison

Le jeu n'utilise aucun framework d'interface. Quelques petits composants en TypeScript,
écrits en classes au-dessus d'utilitaires maison pour manipuler le DOM. L'intérêt de ce
découpage : chaque composant a son propre périmètre, le cadran, le minuteur, les sons, et on
peut intervenir sur l'un sans risquer d'en casser un autre. Pour un projet fait pour le
plaisir, c'était aussi un bon terrain pour tester Vite et TypeScript sans aucun enjeu.

## Recréer l'ambiance du coffre en CSS

Le plaisir tenait autant au rendu qu'au code. Tout l'habillage repose sur du SCSS : le cadran,
les boutons, le minuteur, et des bruitages (ambiance, bip, victoire, erreur) avec un bouton
pour couper le son. Je me suis appuyé sur les propriétés personnalisées CSS pour gérer les
états du jeu. Rien de spectaculaire, mais c'est ce qui donne au mini-jeu son petit air de
Resident Evil.
