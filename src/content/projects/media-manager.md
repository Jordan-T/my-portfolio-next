---
title: "Media Manager"
description: "Outil desktop de gestion et d'indexation de médiathèque locale."
status: "wip"
featured: true
published: false
date: "2026-01-01"
decision: "Architecture découplée Tauri + Rust pour le moteur d'indexation, React/TypeScript pour l'UI. Objectif : isoler les calculs lourds de parsing hors du thread principal et garantir une fluidité à 60 fps."
tags:
  - label: "Tauri"
    type: "framework"
  - label: "React"
    type: "framework"
  - label: "Axum"
    type: "framework"
  - label: "Rust"
    type: "language"
  - label: "TypeScript"
    type: "language"
  - label: "SQLite"
    type: "tool"
  - label: "Performance"
    type: "concept"
---

Outil desktop de gestion de médiathèque locale. Il scanne les dossiers, parse
les noms de fichiers, matche les métadonnées via l'API TMDB, puis renomme
proprement les fichiers selon une convention cohérente.

## Architecture en deux phases

**Phase 1 : Desktop local.** Application Tauri : un cœur Rust (scanner, parser,
accès SQLite) exposé à une interface React/TypeScript via l'IPC Tauri.

**Phase 2 : Portage serveur.** Réécriture de la couche backend en API REST Axum,
packagée en Docker pour tourner en continu sur un NAS.

## Pourquoi ce projet

Un terrain d'apprentissage Rust assumé, sur un besoin réel : reprendre le
contrôle d'une médiathèque que les outils existants gèrent mal.
