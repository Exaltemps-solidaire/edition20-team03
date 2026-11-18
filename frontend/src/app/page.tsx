import styles from "./page.module.css";
import { MEDIAS, PARCOURS, PARCOURS_RECOMMANDE, getMediasDuParcours } from "./contenu";

export default function Home() {
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
          {PARCOURS.map((parcours) => (
            <article key={parcours.id} className={styles.parcoursCard}>
              {parcours.id === PARCOURS_RECOMMANDE && (
                <span className={styles.badge}>Recommandé pour vous</span>
              )}
              <h3>{parcours.titre}</h3>
              <p>{parcours.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
