# Caisse manifestation - version v9

Version simple HTML/CSS/JavaScript pour GitHub Pages et iPad.

## Nouveautés v9

- Bouton **Bilan** : total espèces, CB, remboursements, total net, ventes par produit.
- Bouton **Commandes** : liste de toutes les commandes et remboursements.
- Gestion des remboursements : une commande n'est jamais supprimée ; le remboursement crée une écriture négative liée à la commande d'origine.
- Export CSV enrichi avec type vente/remboursement et motif.

## Installation GitHub Pages

1. Déposer tous les fichiers à la racine du dépôt GitHub.
2. Aller dans **Settings > Pages**.
3. Choisir la branche `main` et le dossier `/root`.
4. Ouvrir l'URL GitHub Pages sur l'iPad.
5. Dans Safari : Partager > Ajouter à l'écran d'accueil.


## Ajustements ticket compact
- Les catégories Boisson / Plat / Dessert ne sont plus affichées dans la commande ni sur le ticket.
- Le menu est affiché de manière compacte : chaque élément avec sa case, composition en retrait.


## v17
- Sélection du bénévole au moment de valider une commande bénévole.
- Remboursement rapide par produit, sans chercher la commande d’origine.
- Le remboursement rapide crée une écriture négative dans le bilan et le CSV.


## v17
- Correction choix composés : une seule ligne par aliment, avec compteur quand le nombre à choisir est supérieur à 1.
- Les quantités sont conservées pour la commande, le ticket et le suivi de stock.


## v17
- Choix des menus affichés en 2 colonnes par rubrique pour réduire l'ascenseur sur iPad.
- Les compteurs de choix multiples restent sur une seule ligne par aliment.


## v17
- Dans les menus, affichage en 2 colonnes uniquement quand la rubrique contient seulement des produits simples.
- Les rubriques avec un plat composé comme l’assiette gourmande repassent en affichage une colonne pour éviter les bugs de saisie.


## v18.16
- Optimisation iPad 10 pouces paysage.
- Suppression des mots Produits / Boissons / Restauration / Consignes dans la zone produits.
- Restauration limitee a 8 boutons par defaut.
- Somme payee plus compacte.


## v18.16

- Texte centré dans les boutons produits.
- Stock affiché dans le bouton quand le suivi est actif.
- Bouton bloqué/grisé si le stock suivi est à 0.
- Bilan, commandes et export CSV déplacés dans Paramètres.
- Bloc Merguez/Saucisses fixe en bas de la zone Produits.


## v18.16
- Masque les accompagnements imposés dans les écrans de choix.
- Trie le ticket par boissons, entrées, plats, fromages, desserts puis consignes.
- Les menus sont imprimés directement par éléments, sans ligne de menu inutile.


## v18.16
- Ticket encore plus compact.
- Titre du ticket à la même taille que le reste.
- Suppression des lignes séparatrices et des espaces entre produits.
- Colonne prix resserrée et alignée à droite.


## v18.16
- Ticket : taille des produits remise comme la version précédente.
- Titre même taille que les produits.
- Espacement compact conservé, sans ligne entre les produits.


## v18.16
- Dialogues personnalisées pour annulation, erreurs et confirmations.
- Pas d’impression pour les commandes négatives ou nulles.
- Dernier produit saisi affiché en haut de la commande.
- Commandes et bilan affichés directement dans Paramètres.
- Export CSV lancé directement depuis l’onglet Export CSV.
- Remboursement espèces uniquement, sans motif.


## v18.16
- Correction des boutons Annuler et Espèces après ajout des dialogues personnalisés.
- Ajout du dialogue message/confirmation manquant dans la page.


## v18.16
- Correction forcée des prix : assiette gourmande 7 €, consigne 2 €, retour -2 €.
- Fenêtre de choix menu/assiette plus compacte.
- Choix saucisse/merguez affiché sur une ligne compacte pour éviter l'ascenseur sur iPad paysage.


## v18.16
- Menu : boissons autorisées uniquement.
- Eau minérale 50 cl : réduction -0,50 € dans le menu.
- Coca, Oasis, Ice Tea et bière pression 25 cl sans supplément.
- Verres de vin avec supplément +0,50 €.


## v18.16 - Stocks en colonnes
- Écran Stocks affiché en 2 ou 3 colonnes selon la largeur.
- Affichage du nom uniquement, sans catégorie.


## v18.16
- Nom de manifestation affiché sur une seule ligne dans le bandeau : Comité des Fêtes-Moroges.
- Liste des bénévoles préchargée et triée alphabétiquement.
- Sélection des bénévoles en boutons sur 2 colonnes.

## v2026.01
- Paramètres > Produits réorganisé par zones visibles : Boissons, Restauration, Consignes.
- Présentation plus légère, moins de bordures, cartes produits plus compactes.


## v2026.01
- Paramètres > Produits : choix multiples affichés en 2 ou 3 colonnes.
- Suppression de l'indication simple/composé dans les listes de choix.


## v2026.03
- Ajout du verre de crémant à 3 €.
- Pichet bière à 10 €.
- Café placé en dernier dans les boissons.
- Ordre restauration : frites, assiette gourmande, menu, puis desserts.
- Stocks initiaux forcés : saucisses 25, merguez 25, glaces vanille 40.
- Commandes bénévoles imprimées et statut réglé/à régler modifiable dans Paramètres > Commandes.
- Rendu d'argent en CB bloqué : espèces uniquement pour retours/remboursements.


## v2026.12
- Stocks produits et aliments en non suivi par défaut.
- Paramètres produits plus compacts.
- Ajout/suppression de boutons par zone.
- Déplacement des boutons conservé avec ▲/▼.


## v2026.12
- Paramètres Produits réorganisés en lignes compactes.
- Catégorie et option Remboursable conservées.
- Flèches rapprochées du produit, champ nom élargi.
- Bouton supprimer réduit.
- Produits et aliments en stock non suivi par défaut.


## v2026.12
- Boutons de remise a zero renommes selon leur action.
- Effacer les commandes fonctionne avec confirmation.
- Reinitialiser le bilan fonctionne avec confirmation.
- Reinitialiser toute l application fonctionne depuis General.
- Boutons d action fixes en bas de la fenetre Parametres.


## v2026.12

- Correction des réinitialisations : commandes et bilan sont maintenant séparés.
- Effacer les commandes conserve le bilan.
- Réinitialiser le bilan conserve les commandes.


## v2026.12
- Correction ergonomique : les boutons fixes en bas des parametres ne masquent plus les dernieres lignes des listes.


## v2026.12
- Correction paramètres : chaque onglet a son propre ascenseur interne.
- Les boutons du bas restent visibles sans masquer la liste.


## v2026.12
- Réinitialisation spécifique par onglet dans Paramètres.
- Produits : vide uniquement les boutons produits.
- Aliments : efface uniquement les aliments.
- Stocks : met tous les stocks en non suivi.
- Bénévoles : efface uniquement la liste des bénévoles.
- Général conserve la réinitialisation complète de l’application.
