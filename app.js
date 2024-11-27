const express = require('express');
const session = require('express-session');
const md5 = require('md5');
const usrModel = require('./models/user.js');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Configuration des sessions
app.use(session({
    secret: 'OOF', // Changez pour une clé plus sécurisée en production
    resave: false,
    saveUninitialized: false
}));

// Middleware pour injecter `user` dans toutes les vues
app.use(async (req, res, next) => {
    if (req.session.userId) {
        try {
            const user = await usrModel.getUserById(req.session.userId);
            res.locals.user = user; // `user` est disponible dans toutes les vues
        } catch (err) {
            console.error("Erreur lors de la récupération de l'utilisateur :", err);
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }
    next();
});

// Route d'accueil : redirige vers la page de connexion si non connecté
app.get('/', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    res.render('index'); // `user` est automatiquement disponible via res.locals
});

// Route de connexion
app.get('/login', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/');
    }
    res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
    try {
        const login = req.body.login;
        const mdp = req.body.password;

        if (!login || !mdp) {
            return res.render('login', { error: "Veuillez remplir tous les champs." });
        }

        const user = await usrModel.checklogin(login);

        if (user && user.password === md5(mdp)) {
            req.session.userId = user.id;
            req.session.role = user.type_utilisateur;
            return res.redirect('/');
        }

        res.render('login', { error: "Identifiant ou mot de passe incorrect." });
    } catch (err) {
        console.error("Erreur lors de la connexion :", err);
        res.render('login', { error: "Une erreur s'est produite, veuillez réessayer." });
    }
});

// Route de déconnexion
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Erreur lors de la déconnexion :", err);
            return res.status(500).send("Une erreur s'est produite lors de la déconnexion.");
        }
        res.redirect('/login');
    });
});

// Autres pages (accessible si connecté)
app.get('/catalogue', (req, res) => res.render('catalogue'));
app.get('/produits', (req, res) => res.render('produits'));
app.get('/administration', (req, res) => res.render('administration'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/gestion', (req, res) => res.render('gestion'));
app.get('/location', (req, res) => res.render('location'));

// Route "Compte" protégée (accessible si non connecté)
app.get('/compte', (req, res) => {
    res.render('compte'); // Peut être personnalisée selon votre logique
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).render('404');
});

// Démarrage du serveur
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
