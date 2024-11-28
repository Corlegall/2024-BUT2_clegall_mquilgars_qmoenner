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
            

#### Maël :



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



#### Corentin



---

## Extensions et modules installés ( si il y a)

#### Quentin Moenner :

### Pas d'ajout


#### Maël :



#### Corentin :




