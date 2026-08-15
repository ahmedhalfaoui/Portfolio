# CONTEXT — Portfolio Halfaoui Ahmed

## Projet
Site portfolio one-page pour **Halfaoui Ahmed**, architecte et spécialiste
en visualisation architecturale (ArchViz). Site statique : HTML + CSS + JS,
sans build ni dépendances.

## Positionnement (briefing client)
Transforme des plans en rendus 3D photoréalistes : maisons individuelles,
restaurants, bâtiments publics, dossiers de concours. Livrables : rendus
ext/int, animations et visites virtuelles, visuels concours/permis, plans
et documents. Processus complet : modélisation → mise en scène/éclairage →
rendu → retouche. Ton : réactif, rigoureux, délais tenus. Pas d'emoji.

## Design
- Palette dérivée du logo (`assets/logo.png`) : dégradé indigo `#1B1464` →
  bleu vif `#2563F0`, blanc. Accent clair `#2352DB`.
- Signature : cotes de dimension (plans), planches avec cartouche,
  élévation SVG au trait qui se dessine au chargement.
- Typo : Archivo (display étendu + texte), IBM Plex Mono (annotations).
- Mode clair/sombre : bouton nav + `prefers-color-scheme` + localStorage
  (`data-theme="sombre"` sur `<html>`).

## Intégrations
- Formulaire de contact → Formspree `https://formspree.io/f/xjyboozp`
  (POST AJAX, statuts FR succès/erreur).
- Ce Formspree sera lié au compte GitHub/mail d'Ahmed (autre compte que
  ceux d'Armando).

## Git / Déploiement
- Clé SSH dédiée : `~/.ssh/id_ed25519_ahmed_portfolio`
- Alias SSH : `github-ahmed-portfolio` (dans `~/.ssh/config`)
- Remote à configurer : `git@github-ahmed-portfolio:COMPTE/REPO.git`
  (en attente du nom de compte/repo)

## À faire
- [ ] Vérifier les infos des cartouches (outils/années inventés, à corriger par Ahmed)

## Production (depuis le 2026-08-15)
- SITE EN LIGNE : https://ahmedhalfaoui.github.io/Portfolio/
- Remote : git@github-ahmed-portfolio:ahmedhalfaoui/Portfolio.git (clé active ✓)
- Déploiement : GitHub Actions (.github/workflows/deploy-pages.yml) sur push main
  — la branche gh-pages existe mais n'est PAS utilisée par Pages (source = Actions)
- Pour publier une modif : commit + `git push origin main` (le workflow fait le reste)
- Studio basé à LILLE (pas Tunis). Contact : uniquement via Formspree.
- Repo public : ne jamais y mettre de données sensibles (les .claude/*.md y sont visibles)

## Fait (2026-08-14, suite)
- 6 vrais rendus intégrés (`assets/projets/`, sources dans ~/Downloads :
  Villa1/Villa 2/danklou 2/Cuisine/Chambre1/Cabine2.png — attention,
  Villa1.png = villa brique/bassin, Villa 2.png = villa blanche)
- RGPD : consentement obligatoire + section #confidentialite + lien footer
- Anti-spam : honeypot `_gotcha` + filtre de domaines suspects (bit.ly,
  tinyurl…) + limite de liens + mots-clés — dans script.js
- Responsive mobile testé à 375px (boutons pleine largeur, cartouche 1 col)

## Serveur de dev
`npx serve -l 4173 .` (config dans `.claude/launch.json`)
