# Déploiement

L'application aide une adhérente de **L'BURN** (association d'accompagnement des femmes touchées par le burn-out) à choisir entre les parcours **BURN TO BE ALIVE (BBA)** et **BURN'ette is BACK (BIB)**. Elle affiche ses ressources et ses parcours — pour l'instant avec des données en dur, sans questionnaire ni paiement réels.

## Services

- `frontend/` : Next.js en export statique servi par nginx, port 80 du conteneur (8080 sur la VM). **Seul service exposé au public.**
- `api/` : Node sans dépendance, port 8081. Expose `/health` et `/sante` ; aucune route métier pour l'instant.

## Services externes

Aucun pour l'itération 1 : ni base de données, ni appel LLM, ni paiement. Rien ne casse ailleurs si l'API tombe, le front n'en dépend pas encore.

## Fragile / inachevé

- Le parcours « recommandé » (BBA) affiché à l'écran est **fixé en dur** : le questionnaire de stade qui doit le déterminer n'est pas encore codé.
- Les ressources affichées sont une sélection neutre de 4 titres réels du module 1 de BBA (`documents-association/focus-parcours-bba-bib.pdf`) ; deux ressources du même module ont été volontairement écartées (sujets sensibles) pour cette démo.
- Pas de choix de persona, pas de détail de parcours, pas de tarif, pas de redirection HelloAsso : prévus dans les itérations suivantes (voir `ITERATIONS.md`).

## Contacts

À compléter par l'équipe (non fournis dans la passation).
