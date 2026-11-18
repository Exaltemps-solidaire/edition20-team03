# Plan d'itérations — L'BURN, parcours après questionnaire

Plan validé le 2026-11-18.

Source du plan : proposé par l'agent (aucun plan d'itérations trouvé dans la passation de l'équipe `ANVVE9`).

Itération 1 : temps restant annoncé au début du codage — **30 minutes** (2026-11-18).

Temps restant annoncé : **60 minutes** (question reposée le 2026-11-18 — le temps restant avait changé depuis la précédente réponse de 20 minutes ; l'itération 1 ci-dessous n'a pas encore été codée).
Durée du tour de test de l'équipe dans PM Lab : **10 minutes** (valeur par défaut).

Capacité estimée : codage (≤10 min) + ~5 min de publication + 10 min de tour de test ≈ 20 à 25 minutes par itération. Avec 60 minutes, **deux itérations tiennent avec de la marge** (≈44 min cumulées) ; une troisième (questionnaire de stade) dépasserait le temps restant si elle s'ajoutait aux deux premières — elle reste donc en « À venir » et sera replanifiée après l'itération 2, selon le temps qui restera réellement.

Hors périmètre (rappel du PRD, pas remis en cause) : suivi de progression par module, back-office, ACTIV' et Sentinelle, modules 5-6 de BIB, gestion des ateliers Feel Good au-delà de leur mention, connexion/inscription/mot de passe, notifications email, KPI et tableaux de bord.

---

## Itération 1 : le squelette est publié et montre les ressources du parcours recommandé, puis les deux parcours BBA/BIB

Rescopée le 2026-11-18 à la demande du développeur (la version précédente, un simple écran « Découverte des parcours », n'a pas été codée).

⚠️ Hypothèse restante, à confirmer avant le pitch :
- Le résultat du questionnaire de stade (pas encore codé, prévu en itération ultérieure) est **fixé en dur** pour cette démo : parcours recommandé = **BBA**.

`poppler-utils` a été installé sur la machine pour lire les PDF de l'association : les ressources affichées sont donc le **vrai contenu** de `documents-association/focus-parcours-bba-bib.pdf` (Module 1 — Épuisement, introduction obligatoire de BBA), en sélection neutre de 4 ressources sur les 6 listées (les deux titres les plus sensibles — RQTH, idées noires — sont laissés de côté pour cette démo) :
- Qu'est-ce que le burn-out ? / Comprendre mon burn-out (vidéo)
- Les phases de reconstruction post burn-out (vidéo)
- Les acteurs de la prise en charge (vidéo — document association : « en cours de production »)
- Burn-out parental (vidéo, ressource optionnelle)

- **Dans le périmètre** :
  - `.env.example` et `DEPLOIEMENT.md` à la racine (exigés par la DoD dès l'itération 1).
  - Écran unique (`frontend/src/app/page.tsx`), desktop uniquement (pas de mobile-first), remplaçant la page par défaut de Next.js, avec deux sections empilées :
    1. **« Vos ressources »** : les 4 ressources réelles ci-dessus (module 1 de BBA, parcours recommandé en dur), via une fonction de filtrage `getMediasDuParcours(parcoursId, medias)`.
    2. **Les deux parcours**, BBA et BIB, celui recommandé (BBA) portant un badge « Recommandé pour vous ».
  - Déploiement complet selon la recette du `/CLAUDE.md` du serveur (compose, build, push, up).
- **Hors périmètre** : questionnaire de stade réel (et tout calcul d'orientation), écran « Qui êtes-vous ? » (choix du persona), détail du parcours, tarif, redirection HelloAsso, les 2 ressources sensibles écartées (RQTH, idées noires), les ateliers socles du module 1 (non affichés dans cette itération).
- **Critères d'acceptation** :
  - Étant donné l'application déployée, quand on ouvre `/`, alors on voit la section « Vos ressources » avec les 4 ressources réelles du module 1 de BBA.
  - Étant donné le même écran, alors on voit les deux parcours BBA et BIB, BBA portant le badge « Recommandé pour vous ».
  - Étant donné l'application déployée, quand on appelle `/health` et `/sante` sur 8080 et 8081, alors les quatre répondent (déjà présents dans `frontend/public/` et `api/src`, à vérifier).
- **Hypothèse de l'équipe couverte** : aucune formalisée (`cadrage/5-hypotheses.md` vide) — l'itération applique le scénario du PRD avec un résultat de questionnaire fixé en dur, faute de questionnaire réel codé.
- **Codage estimé** : 9 minutes (écran plus riche que la version précédente, reste sous le plafond de 10 minutes).
- **Fichiers prévus** : `.env.example`, `DEPLOIEMENT.md`, `frontend/src/app/page.tsx`, `frontend/src/app/page.module.css`, un fichier de données en dur (médias + parcours, ex. `frontend/src/app/contenu.ts`) — 5 fichiers hors déploiement, à la limite de la règle de taille.
- **Tests unitaires prévus** : 1 à 2 tests Vitest sur `getMediasDuParcours(parcoursId, medias)` — retourne les médias du bon parcours, tableau vide si parcours inconnu (logique pure, pas de test sur le balisage).
- **Étapes ajoutées à la démo** (`e2e/demo.spec.ts`) : ouvrir `/`, vérifier la section « Vos ressources » et le badge « Recommandé pour vous » sur le parcours BBA.
- **Bilan** :
  - **Durée de codage réelle** : chrono à 9 min (`.iterations/1.debut` → `.iterations/1.fin`), à la limite du plafond de 10 minutes — mais l'essentiel de ce temps a été consommé par la surveillance du démarrage de la plateforme (voir ci-dessous), pas par l'écriture du code elle-même, qui a été plus rapide. Pas de dépassement du plafond.
  - **Fait** : les 3 critères d'acceptation sont satisfaits — ressources réelles affichées, badge « Recommandé pour vous » sur BBA, `/health` et `/sante` répondent `200` sur 8080 et 8081 (vérifié par `curl` depuis la VM).
  - **Reporté** : rien de prévu n'a dû être coupé ; le questionnaire de stade réel reste en « À venir » comme prévu.
  - **Imprévu (hors code)** : le démarrage de la plateforme (`gitlab-ci-local`) a buté sur le quota anonyme de Docker Hub (`toomanyrequests`) — `registry.internal`, `postgres.internal` et le stockage objet n'ont pas pu se créer lors de la première passe. Résolu en demandant au développeur de lancer `podman login docker.io` (son compte), puis en relançant une seconde passe complète : tous les services sont montés. Pas de conséquence sur le périmètre de l'itération, mais la publication a pris largement plus de temps que les ~5 minutes habituelles.
  - **Harnais** : rien de bloqué — `./scripts/verifier-deployabilite.sh` → aucune borne, `npm test` → 4 tests passés (2 api/contenu + 2 frontend), `./scripts/signaler-version.sh 1` accepté du premier coup.
  - **Démo (hors DoD)** : étape ajoutée à `e2e/demo.spec.ts`, mais `npm run demo` échoue dans cet environnement — bibliothèque système manquante pour Chromium headless (`libatk-1.0.so.0`). Non bloquant, à corriger (ou ignorer) plus tard si le temps le permet.
  - **Modifications** :
    - `.env.example` (nouveau) — variable `PORT` documentée, exigée par le contrat de déployabilité.
    - `DEPLOIEMENT.md` (nouveau) — page de déploiement résumant services, dépendances externes (aucune) et points fragiles.
    - `frontend/src/app/contenu.ts` (nouveau) — données en dur (médias réels du module 1 BBA, parcours BBA/BIB) et `getMediasDuParcours`, sert les critères « ressources » et « badge ».
    - `frontend/src/app/contenu.test.ts` (nouveau) — 2 tests Vitest sur `getMediasDuParcours`.
    - `frontend/src/app/page.tsx` (réécrit) — écran unique desktop remplaçant la page par défaut, sert les 2 premiers critères d'acceptation.
    - `frontend/src/app/page.module.css` (réécrit) — mise en page desktop fixe, pas de media queries.
    - `frontend/src/app/layout.tsx` (modifié) — titre/description de la page.
    - `frontend/nginx.conf` (modifié) — en-têtes de sécurité et CSP repris du gabarit `core-platform/templates/nginx.conf`, adaptés (pas de `localhost:8501`/`:9000`, `connect-src 'self'` suffisant).
    - `api/Dockerfile`, `frontend/Dockerfile` (modifiés) — images de base qualifiées en `docker.io/library/...`, exigé par le `/CLAUDE.md` racine.
    - `podman-compose.yml` (nouveau, racine de `/srv/team03/app`) — déploiement `frontend` (8080) + `api` (8081) sur `core-network`.
    - `e2e/demo.spec.ts` (modifié) — étape de vérification des ressources et du badge recommandé.

---

## Itération 2 : on choisit un persona avant d'entrer sur l'application

- **Dans le périmètre** :
  - Écran « Qui êtes-vous ? », affiché au démarrage : liste de personas en dur (une par rôle du scénario — BURN'ette en reconstruction, BURN'ette en remobilisation, direction de l'association), avec nom et rôle.
  - Choisir un persona mène à l'écran « Découverte des parcours » (itération 1).
  - Bouton « Changer de persona » visible en haut de l'écran « Découverte des parcours », qui ramène à l'écran « Qui êtes-vous ? ».
  - Pas de persistance au-delà de la session en cours (état en mémoire, pas de compte).
- **Hors périmètre** : authentification réelle, création de compte, persistance entre sessions, questionnaire de stade.
- **Critères d'acceptation** :
  - Étant donné l'application qui démarre, quand elle charge, alors l'écran « Qui êtes-vous ? » s'affiche avant tout autre écran.
  - Étant donné l'écran « Qui êtes-vous ? », quand on choisit une personne dans la liste, alors on arrive sur l'écran « Découverte des parcours ».
  - Étant donné l'écran « Découverte des parcours », quand on clique sur « Changer de persona », alors on revient à l'écran « Qui êtes-vous ? ».
- **Hypothèse de l'équipe couverte** : aucune hypothèse formalisée dans la passation ; cette itération applique la règle produit du PRD (« pas de connexion, l'application commence par faire choisir l'utilisateur qu'on incarne »).
- **Codage estimé** : 6 minutes.
- **Fichiers prévus** : un composant/écran « Qui êtes-vous ? », un petit module de données des personas en dur, une modification de `frontend/src/app/page.tsx` pour le bouton de changement et le routage entre les deux écrans (≈4 fichiers).
- **Tests unitaires prévus** : 1 test sur la fonction de sélection/recherche du persona actif (logique pure, pas de balisage).
- **Étapes ajoutées à la démo** (`e2e/demo.spec.ts`) : choisir un persona sur l'écran « Qui êtes-vous ? », vérifier l'arrivée sur « Découverte des parcours », cliquer sur « Changer de persona » et vérifier le retour à l'écran de choix.
- **Bilan** : _à remplir en fin d'itération (durée de codage réelle, dépassement éventuel, fait, reporté, modifications fichier par fichier)_

---

## À venir (ordre de priorité du PRD, à détailler au fil de l'eau)

1. Questionnaire de stade (interactif, une question à la fois, sans injonction à la vitesse) → résultat orienté (BBA ou BIB) avec explication courte.
2. Détail du parcours orienté : modules, contenus (ressources, ateliers socles, ateliers Feel Good), tarif affiché comme variable (jamais inventé).
3. Bouton d'inscription redirigeant vers HelloAsso pour finaliser l'achat.
