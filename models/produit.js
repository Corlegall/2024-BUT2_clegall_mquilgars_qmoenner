const db = require('./database');

module.exports = {
  getAllProduits: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT id, type, description, marque, modele, prix_location AS prix FROM produit`;
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