const bdd = require("./database.js");

// Fonction pour récupérer un utilisateur par ID
async function getUserById(id) {
    const sql = "SELECT * FROM utilisateur WHERE id = ?";
    return new Promise((resolve, reject) => {
        bdd.query(sql, [id], (err, results) => {
            if (err) {
                return reject(err); // Rejette en cas d'erreur
            }
            if (results.length === 0) {
                return resolve(null); // Retourne null si aucun utilisateur n'est trouvé
            }
            resolve(results[0]); // Retourne le premier utilisateur trouvé
        });
    });
}

// Fonction pour vérifier si un login existe
async function checklogin(login) {
    const sql = "SELECT * FROM utilisateur WHERE login = ?";
    return new Promise((resolve, reject) => {
        bdd.query(sql, [login], (err, results) => {
            if (err) {
                return reject(err); // Rejette en cas d'erreur
            }
            if (results.length === 0) {
                return resolve(null); // Retourne null si aucun utilisateur n'est trouvé
            }
            resolve(results[0]); // Retourne l'utilisateur trouvé
        });
    });
}

// Exporter les fonctions pour les utiliser dans d'autres fichiers
module.exports = { getUserById, checklogin };
