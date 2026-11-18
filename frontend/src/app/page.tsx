"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { MEDIAS, PARCOURS, PARCOURS_RECOMMANDE, getMediasDuParcours, type ParcoursId } from "./contenu";

export default function Home() {
  const [parcoursOuvert, setParcoursOuvert] = useState<ParcoursId | null>(null);
  const mediasRecommandes = getMediasDuParcours(PARCOURS_RECOMMANDE, MEDIAS);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.association}>L&apos;BURN</p>
        <h1>Vos parcours</h1>
      </header>

      <section className={styles.section}>
        <h2>Vos ressources</h2>
        <ul className={styles.medias}>
          {mediasRecommandes.map((media) => (
            <li key={media.id} className={styles.media}>
              {media.titre}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Les parcours</h2>
        <div className={styles.parcoursListe}>
          {PARCOURS.map((parcours) => {
            const estOuvert = parcoursOuvert === parcours.id;
            const mediasDuParcours = getMediasDuParcours(parcours.id, MEDIAS);
            return (
              <article key={parcours.id} className={styles.parcoursCard}>
                {parcours.id === PARCOURS_RECOMMANDE && (
                  <span className={styles.badge}>Recommandé pour vous</span>
                )}
                <button
                  type="button"
                  className={styles.parcoursToggle}
                  onClick={() => setParcoursOuvert(estOuvert ? null : parcours.id)}
                  aria-expanded={estOuvert}
                >
                  <h3>{parcours.titre}</h3>
                </button>
                {estOuvert && (
                  <div className={styles.parcoursDetail}>
                    <p>{parcours.description}</p>
                    {mediasDuParcours.length > 0 && (
                      <ul className={styles.medias}>
                        {mediasDuParcours.map((media) => (
                          <li key={media.id} className={styles.media}>
                            {media.titre}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
