import { describe, expect, it } from "vitest";
import { getMediasDuParcours, type Media } from "./contenu";

const medias: Media[] = [
  { id: "a", parcoursId: "bba", titre: "Ressource A" },
  { id: "b", parcoursId: "bib", titre: "Ressource B" },
  { id: "c", parcoursId: "bba", titre: "Ressource C" },
];

describe("getMediasDuParcours", () => {
  it("retourne uniquement les médias du parcours demandé", () => {
    expect(getMediasDuParcours("bba", medias)).toEqual([medias[0], medias[2]]);
  });

  it("retourne un tableau vide quand le parcours n'a aucun média", () => {
    expect(getMediasDuParcours("bib", [medias[0], medias[2]])).toEqual([]);
  });
});
