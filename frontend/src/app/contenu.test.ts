import { describe, expect, it } from "vitest";
import { getMediasDuParcours, type Media } from "./contenu";

const medias: Media[] = [
  { id: "a", parcoursId: "bba", titre: "Ressource A", detail: "Détail A" },
  { id: "b", parcoursId: "bib", titre: "Ressource B", detail: "Détail B" },
  { id: "c", parcoursId: "bba", titre: "Ressource C", detail: "Détail C" },
];

describe("getMediasDuParcours", () => {
  it("retourne uniquement les médias du parcours demandé", () => {
    expect(getMediasDuParcours("bba", medias)).toEqual([medias[0], medias[2]]);
  });

  it("retourne un tableau vide quand le parcours n'a aucun média", () => {
    expect(getMediasDuParcours("bib", [medias[0], medias[2]])).toEqual([]);
  });
});
