# MEMORY — Portfolio Halfaoui Ahmed

## Session 2026-08-14 — Création du site

### Décisions prises
- Site statique pur (HTML/CSS/JS) : déployable partout, zéro maintenance.
- Palette imposée par le client : celle du logo (indigo → bleu vif + blanc).
- Direction visuelle « dessin technique » : cotes, cartouches, trame
  millimétrée, élévations SVG au trait (placeholders remplaçables par les
  vrais rendus).
- Thème sombre : variables CSS sur `:root[data-theme="sombre"]` + bascule
  JS avec localStorage, application avant premier rendu (script inline dans
  `<head>` pour éviter le flash).

### Erreurs résolues
- `python3 -m http.server` bloqué en sandbox (PermissionError sur
  `os.getcwd()`) → utiliser `npx serve` dans launch.json.
- Aperçu `file://` du Browser pane = snapshot statique sans CSS → toujours
  passer par le serveur local.
- Nav qui débordait entre 720 et 960px (5 liens + toggle) → burger dès
  960px.

### Patterns découverts
- Convention SSH d'Armando : une clé + un alias par client/projet
  (`id_ed25519_<projet>` + `Host github-<projet>`, IdentitiesOnly yes).
  Reproduite pour `github-ahmed-portfolio`.
