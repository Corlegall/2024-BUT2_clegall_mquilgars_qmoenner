const db = require('./database');

module.exports = {
  getAllLocations: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          location.id, 
          location.date_debut AS dateDebut, 
          location.date_retour_prevue AS dateRetourPrevue, 
          location.date_retour_effective AS dateRetourEffective, 
          location.prix_total AS prix, 
          produit.marque AS produitMarque, 
          produit.modele AS produitModele, 
          utilisateur.nom AS utilisateurNom, 
          utilisateur.prenom AS utilisateurPrenom
        FROM location
        JOIN produit ON location.produit_id = produit.id
        JOIN utilisateur ON location.utilisateur_id = utilisateur.id
      `;
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};