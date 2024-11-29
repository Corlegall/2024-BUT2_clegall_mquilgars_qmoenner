const db = require('./database'); // Importer la connexion à la base de données

module.exports = {
    /**
     * Vérifie si un utilisateur existe via son email.
     * @param {string} email - L'email de l'utilisateur.
     * @returns {Promise<object|null>} - L'utilisateur correspondant ou null.
     */
    getUserByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM utilisateur WHERE email = ?';
            db.query(query, [email], (err, results) => {
                if (err) {
                    console.error('Erreur lors de la récupération de l\'email :', err);
                    return reject(err);
                }
                resolve(results[0] || null); // Retourne null si aucun utilisateur trouvé
            });
        });
    },

    /**
     * Vérifie si un utilisateur existe via son login.
     * @param {string} login - Le login de l'utilisateur.
     * @returns {Promise<object|null>} - L'utilisateur correspondant ou null.
     */
    checkLogin: (login) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM utilisateur WHERE login = ?'; // "login" au lieu de "pseudo" pour cohérence
            db.query(query, [login], (err, results) => {
                if (err) {
                    console.error('Erreur lors de la vérification du login :', err);
                    return reject(err);
                }
                resolve(results[0] || null); // Retourne null si aucun utilisateur trouvé
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
                user.login,  // login ou pseudo
                user.password, // Mot de passe crypté
                user.nom,
                user.prenom,
                user.ddn,      // Date de naissance
                user.email,
                user.type_utilisateur,
            ];

            db.query(query, values, (err, results) => {
                if (err) {
                    console.error('Erreur lors de l\'ajout d\'un utilisateur :', err);
                    return reject(err);
                }
                resolve(results.insertId); // Retourne l'ID du nouvel utilisateur
            });
        });
    },
};
