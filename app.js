const express = require('express');
const session = require('express-session');
const md5 = require('md5');
const usrModel = require('./models/user.js'); // Import une seule fois
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Configuration des sessions
app.use(session({
    secret: 'OOF',
    resave: false,
    saveUninitialized: false
}));

// Route d'accueil : redirige vers la page de connexion si non connecté
app.get('/', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login'); // Redirige vers login si non connecté
    }

    try {
        const user = await usrModel.getUserById(req.session.userId); // Utilisateur connecté
        res.render('index', { user });
    } catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur :", err);
        res.status(500).send("Une erreur s'est produite.");
    }
});

// Route pour afficher la page de connexion
app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// Route pour traiter le formulaire de connexion
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
            return res.redirect('/'); // Redirige vers la page d'accueil
        }

        res.render('login', { error: "Identifiant ou mot de passe incorrect." });
    } catch (err) {
        console.error("Erreur lors de la connexion :", err);
        res.render('login', { error: "Une erreur s'est produite, veuillez réessayer." });
    }
});

// Routes secondaires
app.get('/catalogue', (req, res) => res.render('catalogue'));
app.get('/produits', (req, res) => res.render('produits'));
app.get('/administration', (req, res) => res.render('administration'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/gestion', (req, res) => res.render('gestion'));
app.get('/location', (req, res) => res.render('location'));
app.get('/compte', (req, res) => res.render('compte'));

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).render('404');
});

// Démarrage du serveur
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

