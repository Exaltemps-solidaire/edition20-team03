// Données en dur pour l'itération 1 : pas encore d'API ni de questionnaire de stade réel.

export type ParcoursId = "bba" | "bib";

export type Parcours = {
  id: ParcoursId;
  titre: string;
  description: string;
};

export type Media = {
  id: string;
  parcoursId: ParcoursId;
  titre: string;
  detail: string;
};

export const PARCOURS: Parcours[] = [
  {
    id: "bba",
    titre: "BURN TO BE ALIVE (BBA)",
    description: "Modules 1 à 3 — épuisement, récupération, introspection.",
  },
  {
    id: "bib",
    titre: "BURN'ette is BACK (BIB)",
    description: "Modules 4 à 6 — projection, mise en action, stabilisation.",
  },
];

// Module 1 — Épuisement (introduction), obligatoire avant la suite du parcours BBA.
// Source : documents-association/focus-parcours-bba-bib.pdf.
// Sélection neutre : les ressources les plus sensibles (RQTH, idées noires) sont écartées pour cette démo.
export const MEDIAS: Media[] = [
  {
    id: "comprendre-mon-burn-out",
    parcoursId: "bba",
    titre: "Qu'est-ce que le burn-out ? / Comprendre mon burn-out",
    detail: "Vidéo, prérequis avant les ateliers socles. Atelier associé : 1.1 Comprendre mon burn-out (en visio ou en présentiel).",
  },
  {
    id: "phases-reconstruction",
    parcoursId: "bba",
    titre: "Les phases de reconstruction post burn-out",
    detail: "Vidéo, prérequis avant les ateliers socles. Atelier associé : 1.2 Mon chemin de rétablissement — « Les chemins de rétablissement : mobiliser des ressources autour de soi » (en visio ou en présentiel).",
  },
  {
    id: "acteurs-prise-en-charge",
    parcoursId: "bba",
    titre: "Les acteurs de la prise en charge",
    detail: "Vidéo, prérequis avant les ateliers socles (en cours de production).",
  },
  {
    id: "burn-out-parental",
    parcoursId: "bba",
    titre: "Burn-out parental",
    detail: "Vidéo, ressource optionnelle.",
  },
];

// Le questionnaire de stade n'est pas encore codé (itération ultérieure) :
// le parcours recommandé est fixé en dur pour cette démo.
export const PARCOURS_RECOMMANDE: ParcoursId = "bba";

export function getMediasDuParcours(parcoursId: ParcoursId, medias: Media[]): Media[] {
  return medias.filter((media) => media.parcoursId === parcoursId);
}
