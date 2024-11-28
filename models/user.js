const db = require('./database');

module.exports = {
    // Récupérer un utilisateur par son login
    checkLogin: (login) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM utilisateur WHERE login = ?';
            db.query(query, [login], (err, results) => {
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

    // Ajouter un utilisateur (par exemple, lors de l'inscription)
    addUser: (user) => {
        return new Promise((resolve, reject) => {
            const query = `
        INSERT INTO utilisateur (login, password, nom, prenom, ddn, email, type_utilisateur) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
            db.query(query, [
                user.login,
                user.password,
                user.nom,
                user.prenom,
                user.ddn,
                user.email,
                user.type_utilisateur
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
