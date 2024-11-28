# 2024-BUT2_clegall_mquilgars_qmoenner

# Documentation du Projet : Site "Location de Matériel"

## Description du Projet
Le projet est un **site web dynamique** destiné à un service de location de matériel sportif. Il inclut plusieurs pages fonctionnelles pour l'utilisateur :

1. **Page Produit** : Présente un produit spécifique, ses détails, et permet de choisir une période de location.
2. **Page Contact** : Fournit les coordonnées de l'équipe et des créateurs du site.

### Fonctionnalités principales :
#### Page Produit
- **Galerie d'images** : Navigation entre différentes images du produit.
- **Sélection des dates** : Choix interactif de la période de location, avec calcul automatique du prix.
- **Disponibilité en temps réel** : Indication de l'état du produit.
- **Action de location** : Bouton pour initier le processus de réservation.

#### Page Contact
- **Informations de contact** : Présente l'email, le numéro de téléphone et les créateurs du site.
- **Boutons CV** : Lien vers les CV des membres de l'équipe.

---

## Problèmes rencontrés et solutions

### Problème 1 : Gestion des styles spécifiques
**Détail :** Chaque page nécessitait une mise en page et des styles personnalisés.  
**Solution :** Création de fichiers CSS distincts (`style.contact.css`, etc.) pour isoler et organiser les styles propres à chaque page.

### Problème 2 : Réactivité de la galerie d'images
**Détail :** La galerie d'images sur la page produit avait des difficultés à afficher correctement les vignettes sur les écrans mobiles.  
**Solution :** Utilisation de `flex-wrap` pour rendre la galerie adaptative sur différentes tailles d'écran.

---

## Extensions et modules installés

### Frontend
- **HTML5** : Pour structurer les pages.
- **CSS3** : Pour un design personnalisé et responsive.
- **JavaScript** : Pour ajouter de l'interactivité (galerie d'images, boutons dynamiques).

### Backend
- **EJS** : Moteur de template utilisé pour rendre les composants réutilisables (comme le menu de navigation).
- **Express.js** : Framework pour servir les pages et gérer les routes.
- **Node.js** : Environnement pour exécuter le serveur.

---

## Instructions pour exécuter le projet

### Prérequis
1. Node.js (version 16.x ou supérieure)
2. NPM (Node Package Manager)

### Étapes

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/votre-repo/site-locafit.git
   cd site-locafit
