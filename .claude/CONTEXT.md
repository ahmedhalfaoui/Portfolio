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
- [ ] Vraies coordonnées (email, téléphone) — actuellement placeholders
- [ ] Vérifier les infos des cartouches (outils/années inventés, à corriger par Ahmed)
- [ ] Créer le repo GitHub côté client + ajouter la clé publique
- [ ] Premier push une fois le remote connu

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
