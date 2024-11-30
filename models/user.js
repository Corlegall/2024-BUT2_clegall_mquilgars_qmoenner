//Base de donné
const db = require('./database');


//Vérifie si un utilisateur existe via son email.
module.exports = {
    /**
     * 
     * @param {string} email 
     * @returns {Promise<object|null>} 
     */
    getUserByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM utilisateur WHERE email = ?';
            db.query(query, [email], (err, results) => {
                if (err) {
                    console.error('Erreur lors de la récupération de l\'email :', err);
                    return reject(err);
                }
                resolve(results[0] || null);
            });
        });
    },

    /**
     * Vérifie si il existe via son login.
     * @param {string} login - Le login de l'utilisateur.
     * @returns {Promise<object|null>} - L'utilisateur correspondant ou null.
     */
    checkLogin: (login) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM utilisateur WHERE login = ?';
            db.query(query, [login], (err, results) => {
                if (err) {
                    console.error('Erreur lors de la vérification du login :', err);
                    return reject(err);
                }
                resolve(results[0] || null); 
            });
        });
    },

    /**
     * Ajoute un utilisateur à la base de données.
     * @param {object} user - Les informations de l'utilisateur.
     * @returns {Promise<number>} - L'ID du nouvel utilisateur.
     */
    addUser: (user) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO utilisateur (login, password, nom, prenom, ddn, email, type_utilisateur)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
                user.login, 
                user.password, 
                user.nom,
                user.prenom,
                user.ddn,      
                user.email,
                user.type_utilisateur,
            ];

            db.query(query, values, (err, results) => {
                if (err) {
                    console.error('Erreur lors de l\'ajout d\'un utilisateur :', err);
                    return reject(err);
                }
                resolve(results.insertId); 
            });
        });
    },
};
