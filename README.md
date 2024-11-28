# 2024-BUT2_clegall_mquilgars_qmoenner

# Documentation du Projet : Site "Location de Matériel"


### Notre travail :

#### Quentin Moenner :

#### Page Produit (produit.ejs)

- **Resume** : Page produit pour la location de matérielle. Les fonctionnalités interactives sont gérées par JavaScript, et le design est assuré par des styles CSS intégrés.

- **Se que j'ai fait** : 

    - **Galerie d'images** :
    
            . Inclut un carrousel avec deux boutons (button) pour naviguer entre les images via la fonction changeImage(direction).

            . L'image principale est affichée dans <img id="mainImage" ...>.

            . Une galerie miniature permet de sélectionner une image avec un clic (onclick="setImage(this.src)").

    
    - **Détails du produit** :

            **Nom du produit :** "TAPIS DE COURSE CONNECTE RUN500".
        
            **Prix mensuel :** "89,9€ / mois".

            **Description :** Met en avant les caractéristiques techniques (vitesse, inclinaison, pliage compact).

        **Sélection de dates :**
           
            . Deux champs de type date (input type="date") permettent de choisir une période de location. Le changement de date appelle la fonction calculatePrice().

        **Disponibilité :**

            Un message (<p id="availabilityMessage">) indique si le produit est disponible.

        **Prix prévisionnel :**

            Calculé dynamiquement et affiché dans <p id="predictedPrice">.

        **Bouton de location :**
            
            Un bouton stylisé (class="rent-button") déclenche la fonction rentProduct() pour initier le processus de location.
        

    - **Interactions (JavaScript)** : Les fonctions mentionnées mais non définies dans ce code (présumées dans script.js) :

            . changeImage(direction): Change l'image principale en fonction d'une direction donnée (-1 ou 1).

            . setImage(src): Met à jour l'image principale selon une source (src) d'une miniature.

            . calculatePrice(): Calcule le prix de location selon les dates sélectionnées.

            . rentProduct(): Lance l'action de location, probablement une communication avec un backend.

            



#### Page Administrateur (administration.ejs)

- **Resume** : Page d'administration pour gérer des utilisateurs.

- **Se que j'ai fait** : 

    - **Formulaire modale** :
    
            . Permet d'ajouter ou de modifier les informations d'un utilisateur.

        **Champs inclus :**

            .ID (identifiant unique de l'utilisateur).

            .Nom (obligatoire).

            .Email (obligatoire)

            .Rôle (menu déroulant pour sélectionner "Utilisateur" ou "Admin").

            .Actions : boutons pour modifier ou supprimer un utilisateur.

        .Exemple d'utilisateur statique : "Jean Dupont, admin".
    
    - **Détails du produit** :

            .Nom du produit: "TAPIS DE COURSE CONNECTE RUN500".
        
            .Prix mensuel: "89,9€ / mois".

            .Description: Met en avant les caractéristiques techniques (vitesse, inclinaison, pliage compact).

        **Sélection de dates :**
           
            . Deux champs de type date (input type="date") permettent de choisir une période de location. Le changement de date appelle la fonction calculatePrice().

        **Disponibilité :**

            Un message (<p id="availabilityMessage">) indique si le produit est disponible.

        **Prix prévisionnel :**

            Calculé dynamiquement et affiché dans <p id="predictedPrice">.

        **Bouton de location :**
            
            Un bouton stylisé (class="rent-button") déclenche la fonction rentProduct() pour initier le processus de location.
        

    - **Interactions (JavaScript)** : Les fonctions mentionnées mais non définies dans ce code (présumées dans script.js) :

            .changeImage(direction): Change l'image principale en fonction d'une direction donnée (-1 ou 1).

            .setImage(src): Met à jour l'image principale selon une source (src) d'une miniature.

            .calculatePrice(): Calcule le prix de location selon les dates sélectionnées.

            .rentProduct(): Lance l'action de location, probablement une communication avec un backend.


#### Contact (contact.ejs)

- **Resume** : Page contact pour se rensaigner.

- **Se que j'ai fait** : 

    - **Contenu principal** :
    
            . Le contenu est organisé dans une section de type carte au centre de la page avec les éléments suivants.

        **Informations de contact :**

            .Email: Affiche une adresse générique, LocaFit@gmail.com.

            .Numéro de téléphone: Place pour un numéro fictif 00.00.00.00.00.

            .Créateurs du site: Liste les noms des développeurs : Quentin Moenner, Maël Quilgars, Corentin LE GALL.

            .Boutons vers les CV: Trois boutons permettent d'accéder aux CV des développeurs (aucune action n'est associée pour l'instant).


#### Page Script (script.js)

- **Resume** : Ce script contient plusieurs fonctionnalités réparties sur différentes parties d'un site web, incluant la gestion des images, la gestion des utilisateurs, le système de location, et la gestion des réservations.

- **Se que j'ai fait** : 

    - **Gestion des images de produit (carousel d'images)** :
    
            . Tableau d'images : Le tableau images contient les chemins vers différentes images d'un produit (ici, des images de tapis de course).

        **Navigation entre les images :**

            .La fonction changeImage(direction) change l'image affichée en fonction de la direction (suivant ou précédent).

            .La navigation est circulaire : si on dépasse la première ou la dernière image, le système revient à l'autre extrémité.

            .La fonction utilise l'élément HTML avec l'ID mainImage pour changer l'image affichée.

        **Sélection directe d'une image :**

            .La fonction setImage(src) permet de définir une image spécifique comme active en passant son chemin en argument.
    
    - **Gestion de la page administration** : Cette partie gère l'ajout, la modification, et la suppression d'utilisateurs via une interface.

        **Ajout d'utilisateur :**
        
            .En cliquant sur un bouton d'ajout (avec l'ID addUserBtn), une modale s'affiche pour remplir les informations d'un utilisateur (nom, e-mail, rôle).

            .Lors de la soumission du formulaire dans la modale, une nouvelle ligne est ajoutée à un tableau HTML (userTableBody) pour afficher les informations.

        **Modification d'utilisateur  :**
           
            . En cliquant sur le bouton "Modifier" dans une ligne du tableau, les données sont chargées dans la modale pour être modifiées.

            . Après validation, les données de la ligne sont mises à jour.


        **Suppression d'utilisateur :**

           En cliquant sur "Supprimer", la ligne correspondante est supprimée du tableau.

        **Prix prévisionnel :**

            Calculé dynamiquement et affiché dans <p id="predictedPrice">.

        **Bouton de location :**
            
            Un bouton stylisé (class="rent-button") déclenche la fonction rentProduct() pour initier le processus de location.


    - **Système de réservation et de location de produit** : Cette partie est centrée sur le processus de réservation et inclut la vérification de disponibilité, le calcul des prix, et la gestion des données de réservation.
        
        **Vérification de disponibilité :**
        
            .La fonction checkAvailability(startDate, endDate) compare une nouvelle période de réservation (début/fin) avec les réservations existantes.r les informations d'un utilisateur (nom, e-mail, rôle).

            .Elle vérifie si la période demandée ne chevauche pas d'autres périodes déjà réservées.

            .Les réservations existantes sont stockées dans localStorage.

        **Calcul du prix :**
           
            . Le prix journalier est calculé à partir d'un tarif mensuel (89,9 € par mois).

            . La durée de location est utilisée pour calculer le prix total.

            . Une réduction de 10 % est appliquée si la réservation dépasse 7 jours.

        **Location du produit :**
           
            . La fonction rentProduct() :

                . Vérifie la disponibilité.

                . Si disponible, stocke la réservation dans localStorage et affiche un message de confirmation.

                .Sinon, elle indique l'indisponibilité.

    - **Gestion des réservations enregistrées** : 

            .Les réservations sont stockées dans localStorage pour persister entre les sessions.

            .Fonctions associées :

                .getStoredReservations() : Récupère les réservations existantes.

                .storeReservation(reservation) : Ajoute une nouvelle réservation à localStorage.

                .displayReservations() : Affiche dans la console toutes les réservations existantes (utile pour débogage).

    - **Points techniques supplémentaires** :

            . Événements DOM :

                .Plusieurs événements (DOMContentLoaded et click) sont utilisés pour interagir avec les éléments HTML (boutons, formulaires, tableaux). 

            . Modale de gestion des utilisateurs : :

                .La gestion de l'affichage est réalisée en ajustant le style (display: flex ou display: none).

            . Validation de dates :
                
                .Les dates sont validées pour s'assurer que la date de fin est postérieure à la date de début.
            

#### Maël Quilgars:
# Catalogue

## Résumé
Page de présentation des produits disponibles dans le catalogue, avec des options de recherche, de tri, et une interface utilisateur responsive. Les données des produits sont extraites dynamiquement depuis une base de données.

---

## Ce que j'ai fait

### Barre de recherche
- Une barre de recherche intuitive avec :
  - Un champ de texte (`<input>`).
  - Un bouton de recherche (`🔍`).
- Les résultats sont filtrés dynamiquement en fonction des termes saisis.

### Options de tri
- Un menu déroulant (`<select>`) propose plusieurs critères de tri :
  - Prix croissant.
  - Prix décroissant.
  - Popularité.
  - Meilleures notes.

### Sidebar interactive
- Une barre latérale fixe avec des boutons pour accéder rapidement aux sections importantes du site :
  - Accueil.
  - Produits.
  - Services.
  - Contact.
  - À propos.
- Les boutons sont stylisés avec des effets au survol (`hover`).

### Affichage des produits
- Les produits sont affichés sous forme de **cartes**, regroupant :
  - Une image illustrative.
  - Le titre du produit.
  - Le prix.
  - Une brève description.
- Les données sont récupérées dynamiquement depuis une base de données et insérées dans les cartes grâce à EJS :
  ```ejs
  <% produits.forEach(produit => { %>
      <div class="product-item">
          <img src="<%= produit.image %>" alt="<%= produit.marque %> <%= produit.modele %>">
          <div class="product-title"><%= produit.marque %> <%= produit.modele %></div>
          <div class="product-price"><%= produit.prix %> €</div>
          <div class="product-description"><%= produit.description %></div>
      </div>
  <% }) %>


### Si aucun produit n'est disponible, un message informatif est affiché :

<% if (produits.length === 0) { %>
    <p>Aucun produit disponible.</p>
<% } %>


### Interactivité (JavaScript)
### Les fonctionnalités interactives comprennent :
#### La gestion des critères de tri via des événements sur le menu déroulant.
#### Le filtrage dynamique lors de la saisie dans la barre de recherche.



# page catalogue

# Location

## Résumé
Page dédiée à la gestion des locations sur LocFit. Les informations concernant les produits loués sont affichées dynamiquement à partir des données récupérées depuis la base de données.

---

## Ce que j'ai fait

### Présentation des locations
- Affichage des informations principales sur les produits loués, regroupées dans des **cartes produits** :
  - **Image du produit** : Affichée avec une image placeholder ou l'image réelle si disponible.
  - **Titre du produit** : Inclut la marque et le modèle.
  - **Utilisateur** : Prénom et nom de la personne ayant loué le produit.
  - **Dates** :
    - Date de retour effective si le produit a été retourné.
    - Message de rappel si le produit n'a pas encore été rendu.
  - **Prix total** de la location.
  - **Message** : Encourage les utilisateurs à respecter les délais de retour.

### Gestion des données avec EJS
- Les données de location sont générées dynamiquement grâce à des boucles et des conditions :
  ```ejs
  <% locations.forEach(location => { %>
      <div class="product-item">
          <img src="https://via.placeholder.com/200" alt="<%= location.produitMarque %> <%= location.produitModele %>">
          
          <div class="container_info">
              <div class="product-title">
                  <%= location.produitMarque %> - <%= location.produitModele %>
              </div>
          </div>

          <div class="product-location">
              Loué par : <%= location.utilisateurPrenom %> <%= location.utilisateurNom %>
          </div>

          <div class="product-dates">
              <% if (location.dateRetourEffective) { %>
                  <div class="product-date-effective">
                      <strong>Date de retour effective : <%= location.dateRetourEffective %></strong>
                  </div>
              <% } else { %>
                  <div class="product-date-effective">
                      <strong>Retour non encore effectué</strong>
                  </div>
              <% } %>
          </div>

          <div class="product-price">Prix total : <%= location.prix %> €</div>
          <div class="product-description">Veuillez respecter les délais de retour pour éviter les sanctions !</div>
      </div>
  <% }) %>



### Fonctionnalités interactives
#### Affichage conditionnel : Les dates de retour sont affichées en fonction de leur disponibilité.
#### Responsive design : Les cartes s'ajustent pour s'afficher de manière optimale sur différents appareils grâce à flex-wrap.




# Gestion de Produits

Ce projet est une interface utilisateur conçue pour gérer des produits, permettant aux utilisateurs de visualiser, rechercher, trier, ajouter et supprimer des produits.

##  Fonctionnalités

- **Réservation en cours** : Affiche les produits actuellement réservés, avec des options de recherche et de tri.
- **Matériel rendu par les clients** : Liste les produits rendus par les clients, également avec des outils de recherche et de tri.
- **Ajouter un produit** : Une section pour ajouter un nouveau produit avec un formulaire interactif (nom, prix, description et URL de l'image).
- **Supprimer un produit** : Permet de rechercher des produits et de les supprimer facilement.

## 🌟 Structure des pages

### 1. Réservation en cours
- Une barre de recherche pour filtrer les produits.
- Des options pour trier les produits par prix, popularité ou notes.
- Une grille affichant tous les produits disponibles avec leur nom et leur prix.

### 2. Matériel rendu par les clients
- Similaire à la section "Réservation en cours", mais affiche les produits qui ont été rendus.

### 3. Ajouter un produit
- Un formulaire contenant :
  - Nom du produit.
  - Prix.
  - Description.
  - URL de l'image.
- Un bouton pour valider et ajouter le produit à la base de données.

### 4. Supprimer un produit
- Une liste de produits avec des boutons individuels pour les supprimer.




#### Corentin :





---

## Problèmes rencontrés et solutions

#### Quentin Moenner


### Problème 1 : Réactivité de la galerie d'images
**Détail :** La galerie d'images sur la page produit avait des difficultés à afficher correctement les vignettes sur les écrans mobiles.  

**Solution :** Utilisation de `flex-wrap` pour rendre la galerie adaptative sur différentes tailles d'écran.

### Problème 2 : verification des disponibilité
**Détail :** la réservation qui était effectuer ne se gardais pas. ducoup il y avait pas de bloquage quand on reservait dans la même période que celui qui avait déja réservé.

**Solution :** Ajout de la fonction checkAvailability(startDate, endDate) qui compare une nouvelle période de réservation (début/fin) avec les réservations existantes. Elle vérifie si la période demandée ne chevauche pas d'autres périodes déjà réservées. Les réservations existantes sont stockées dans localStorage.

### Problème 3 : L'ajout de nouveaux utilisateur
**Détail :** Le bouton "Ajouter" en clickant dessus n'ouvrais pas le formulaire ducoup on ne pouvait pas crée de nouveaux utilisateurs. 

**Solution :** Ajout de la fonction addUserBtn, qui en clickant sur le bouton "Afficher", une modale s'affiche pour remplir les informations d'un utilisateur (nom, e-mail, rôle). Lors de la soumission du formulaire dans la modale, une nouvelle ligne est ajoutée à un tableau HTML (userTableBody) pour afficher les informations.


#### Maël

### Problème 1 : barre de recherche 
Les barres de recherche sont présente et stylée mais ne sont pas fonctionnel.  

**Solution :**
Implémentez une fonction JavaScript pour filtrer les produits affichés en fonction de la recherche de l'utilisateur.

### Problème 2 : produit cliquable 
Les produits ne sont pas cliquable et ne redirige pas vers la page produit.  

**Solution :** 
lié les pages catalogue et location a la page produit et implémenter un liens dans mes éléments produits.

### Problème 3 : ajout suppression produit
Les rubrique ajouter et supprimer un produit ne sont pas fonctionnelle et ne permettent pas d'interagire avec la base de donnée

**Solution :** 
Ajouter dans le backend une fontion pemettant de d'implementer dans la base de données des produit via le formulaire présent dans la page gestion ainsi que la fonction de retrait au clique sur l'icone poubelle.

### Problème 4 : matériel réserver et rendu
Les rubrique voir le matériel réserver et le matériel rendu ne sont pas lié a la base de donnée 

**Solution :** 
implémenter une fonction qui lie ma base de donnée a l'interface de gestion et que repartie les produit dans les catégorie matériel rendu et matériel en cours de réservation en fonction de leurs état de location .



#### Corentin



---

## Extensions et modules installés ( si il y a)

#### Quentin Moenner :

### Pas d'ajout


#### Maël :



#### Corentin :




