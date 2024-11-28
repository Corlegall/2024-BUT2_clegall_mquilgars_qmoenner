const db = require('./database');

module.exports = {
    // Récupérer un utilisateur par son login (pseudo ou email)
    checkLogin: (login) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM utilisateur WHERE pseudo = ? OR email = ?';
            db.query(query, [login, login], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]); // Retourne le premier résultat (utilisateur trouvé)
                }
            });
        });
    },

    // Récupérer un utilisateur par son ID
    getUserById: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM utilisateur WHERE id = ?';
            db.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]); // Retourne le premier résultat
                }
            });
        });
    },

    // Récupérer un utilisateur par son email
    getUserByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM utilisateur WHERE email = ?';
            db.query(query, [email], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]); // Retourne le premier résultat
                }
            });
        });
    },

    // Récupérer un utilisateur par son pseudo
    getUserByPseudo: (pseudo) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM utilisateur WHERE pseudo = ?';
            db.query(query, [pseudo], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]); // Retourne le premier résultat
                }
            });
        });
    },

    // Ajouter un utilisateur (par exemple, lors de l'inscription)
    createUser: (user) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO utilisateur (pseudo, email, nom, prenom, date_naissance, password) 
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            db.query(query, [
                user.pseudo,
                user.email,
                user.nom,
                user.prenom,
                user.dateNaissance,
                user.password,
            ], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.insertId); // Retourne l'ID de l'utilisateur ajouté
                }
            });
        });
    },
};
