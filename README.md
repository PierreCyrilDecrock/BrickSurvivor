# Brick Survivor (PWA)

Casse-brique roguelike synthwave. Installable sur téléphone et jouable hors ligne.

## Mettre en ligne sur GitHub Pages

1. Crée un dépôt GitHub (public) et envoie-y **tout le contenu de ce dossier** à la racine
   (`index.html`, `sw.js`, `manifest.webmanifest`, `icons/`, `fonts/`, `.nojekyll`).
2. Dans le dépôt : **Settings → Pages → Build and deployment**.
   Source : *Deploy from a branch*, branche `main`, dossier `/ (root)`.
3. Après une minute, le jeu est disponible sur `https://TON-PSEUDO.github.io/NOM-DU-DEPOT/`.

Tous les chemins sont relatifs : le jeu fonctionne aussi bien à la racine d'un domaine que dans un sous-dossier.

## Installer sur le téléphone

- **iPhone (Safari)** : bouton Partager, puis « Sur l'écran d'accueil ».
- **Android (Chrome)** : menu ⋮, puis « Installer l'application ».

## Publier une nouvelle version

Remplace `index.html`, puis change `VERSION` en haut de `sw.js` (par exemple `v0.6.1`).
Les joueurs reçoivent la nouvelle version au deuxième lancement.

## Notes

- La progression (cristaux, héros, réglages, records) est enregistrée dans le navigateur, sur chaque appareil.
- Aucune requête externe : les polices (Audiowide, VT323) sont incluses dans `fonts/`.
