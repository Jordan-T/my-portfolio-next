import type { Resource } from "@/types";

export const resources: Resource[] = [
  {
    id: "clean-code",
    title: "Clean Code",
    url: "https://www.amazon.fr/dp/0135398576",
    source: "Robert C. Martin",
    category: "Craft",
    type: "book",
    date: "2008",
    level: "essential",
    comment:
      "La règle du Boy Scout : on repart toujours d'un endroit plus propre qu'on l'a trouvé, même hors scope. Responsabilité unique par méthode, nommage explicite. Lu en Java, appliqué partout depuis.",
  },
  {
    id: "event-loop-archibald",
    title: "Dans la boucle : Jake Archibald (JSConf)",
    url: "https://www.youtube.com/watch?v=cCOL7MC4Pl0",
    source: "youtube.com",
    category: "JavaScript",
    type: "talk",
    date: "2018",
    level: "essential",
    comment:
      "La référence sur l'event loop JavaScript. Comprendre pourquoi une animation chope, pourquoi un calcul bloque le rendu : tout part de là. Intemporel.",
  },
  {
    id: "dette-conception",
    title:
      "Dette de conception : Julien Topçu & Josian Chevalier (Devoxx France 2026)",
    url: "https://youtu.be/lfACSvxl4uY",
    source: "youtube.com",
    category: "Architecture",
    type: "talk",
    date: "2026",
    level: "essential",
    comment:
      "La dette de conception ce sont les mauvaises décisions d'architecture prises sous pression, invisibles dans le code mais qui contraignent tout ce qui vient après. C'est exactement pour ça que je documente mes décisions en ADR.",
  },
  {
    id: "saving-web-16ms",
    title: "Saving the Web, 16ms at a Time (ReactRally)",
    url: "https://www.youtube.com/watch?v=_srJ7eHS3IM",
    source: "youtube.com",
    category: "Perf web",
    type: "talk",
    date: "2016",
    level: "recommended",
    comment:
      "Performance browser vue de l'intérieur : rendering pipeline, double RAF, pourquoi 16ms et pas 17. Ce qui m'a ancré dans l'idée que la perf se joue au niveau du browser, pas du framework.",
  },
  {
    id: "didier-girard-dev-augmente",
    title: "100k€/6 mois vs 1k€/70h : Didier Girard (Studio Devoxx France)",
    url: "https://www.youtube.com/watch?v=ag76AFt_UOA",
    source: "youtube.com",
    category: "Métier & IA",
    type: "talk",
    date: "2025",
    level: "recommended",
    comment:
      "Le dev n'est pas mort, il est redéfini. Ce qui m'a marqué : Sfeir ne recrute plus que des développeurs augmentés à l'IA. Le vrai sujet devient la structure, la partie longue, celle qui ne s'automatise pas.",
  },
  {
    id: "nathan-menard-dev-ia",
    title: "A-t-on encore besoin de développeurs ? Nathan Menard (Drakkar)",
    url: "https://www.youtube.com/watch?v=wWmIneNV2iI",
    source: "youtube.com",
    category: "Métier & IA",
    type: "talk",
    date: "2024",
    level: "interesting",
    comment:
      "Un regard lucide sur ce que l'IA a changé ces deux dernières années. L'IA ne porte ni la vision produit, ni l'intuition métier, ni la responsabilité de ce qu'elle génère.",
  },
  {
    id: "supercharged",
    title: "Supercharged : Paul Lewis & Surma (Chrome Developers)",
    url: "https://www.youtube.com/playlist?list=PLNYkxOF6rcIBz9ACEQRmO9Lw8PW7vn0lr",
    source: "youtube.com",
    category: "Perf web",
    type: "video",
    date: "2017",
    level: "interesting",
    comment:
      "Paul Lewis (l'inventeur du FLIP) et Surma décortiquent la perf de rendu. FLIP, will-change, animations qui restent sur le compositeur GPU au lieu de déclencher un reflow : tout ce qui m'a convaincu qu'une librairie d'animation est rarement nécessaire. La chaîne n'existe plus mais le contenu reste.",
  },
  {
    id: "http-203",
    title: "HTTP 203 : Jake Archibald & Surma (Chrome Developers)",
    url: "https://www.youtube.com/playlist?list=PLNYkxOF6rcIAKIQFsNbV0JDws_G_bnNo9",
    source: "youtube.com",
    category: "JavaScript",
    type: "video",
    date: "2022",
    level: "interesting",
    comment:
      "Jake Archibald et Surma discutent du web platform dans le détail, sans survendre. Là où Supercharged était centré perf, HTTP 203 ratisse plus large : APIs récentes, comportements subtils du navigateur. Une veille honnête.",
  },
  {
    id: "view-transitions-api",
    title: "View Transitions API : Smooth transitions (Chrome for Developers)",
    url: "https://developer.chrome.com/docs/web-platform/view-transitions",
    source: "developer.chrome.com",
    category: "Perf web",
    type: "article",
    date: "2023",
    level: "interesting",
    comment:
      "Animer la transition entre deux vues, même en multi-page, directement par le navigateur. Plus besoin de tracker les positions à la main comme avec le FLIP : on déclare l'état de départ et d'arrivée, le navigateur interpole. La démo HTTP 203 Playlist de Jake Archibald est la référence.",
  },
];
