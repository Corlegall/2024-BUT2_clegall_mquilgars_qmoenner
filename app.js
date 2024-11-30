const express = require('express');
const session = require('express-session');
const md5 = require('md5');
const usrModel = require('./models/user.js');
const produitModel = require('./models/produit.js');
const locationModel = require('./models/location.js');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.use(
    session({
        secret: 'OOF',
        resave: false,
        saveUninitialized: false,
    })
);

// Middleware pour injecter les données utilisateur dans toutes les vues
app.use((req, res, next) => {
    if (req.session.userId) {
        res.locals.user = {
            id: req.session.userId,
            prenom: req.session.prenom || 'Prénom',
            nom: req.session.nom || 'Nom',
            login: req.session.login || 'Login',
        };
    } else {
        res.locals.user = null; 
    }
    next();
});

// Vérifier si un utilisateur est authentifié
const isAuthenticated = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
};

// Connexion
app.get('/', isAuthenticated, (req, res) => {
    res.render('index');
});
app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;

        if (!login || !password) {
            return res.render('login', { error: 'Veuillez remplir tous les champs.' });
        }

        const user = await usrModel.checkLogin(login);

        if (user && user.password === md5(password)) {
            req.session.userId = user.id;
            req.session.prenom = user.prenom;
            req.session.nom = user.nom;
            req.session.login = user.login;
            req.session.role = user.type_utilisateur;

            return res.redirect('/');
        }
        res.render('login', { error: 'Identifiant ou mot de passe incorrect.' });
    } catch (err) {
        console.error('Erreur lors de la connexion :', err);
        res.render('login', { error: 'Une erreur est survenue. Veuillez réessayer.' });
    }
});

// Déconnexion
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erreur lors de la déconnexion :', err);
            return res.status(500).send('Erreur lors de la déconnexion.');
        }
        res.redirect('/login');
    });
});

// Catalogue
app.get('/catalogue', async (req, res) => {
    try {
        const produits = await produitModel.getAllProduits();
        res.render('catalogue', { produits });
    } catch (err) {
        console.error('Erreur lors de la récupération des produits :', err);
        res.render('catalogue', { produits: [] });
    }
});

// Création de compte
app.get('/compte', (req, res) => {
    res.render('compte', { error: null });
});

app.post('/compte', async (req, res) => {
    try {
        const { login, prenom, nom, email, ddn, password, confirmPassword } = req.body;

        if (!login || !prenom || !nom || !email || !ddn || !password || !confirmPassword) {
            return res.render('compte', { error: 'Tous les champs sont requis.' });
        }
        if (password !== confirmPassword) {
            return res.render('compte', { error: 'Les mots de passe ne correspondent pas.' });
        }
        const existingUser = await usrModel.getUserByEmail(email);
        if (existingUser) {
            return res.render('compte', { error: 'Cet e-mail est déjà utilisé.' });
        }
        const hashedPassword = md5(password);

        const result = await usrModel.addUser({
            login,
            prenom,
            nom,
            email,
            ddn, 
            password: hashedPassword,
            type_utilisateur: 'client' 
        });

        if (result) {
            req.session.userId = result.id;
            req.session.prenom = prenom;
            req.session.nom = nom;
            req.session.login = login;
            req.session.role = 'client';

            return res.redirect('/');
        } else {
            res.render('compte', { error: 'Erreur lors de la création du compte.' });
        }
    } catch (err) {
        console.error('Erreur lors de la création du compte :', err);
        res.render('compte', { error: 'Une erreur interne est survenue.' });
    }
});

// Route locations protégée
app.get('/location', isAuthenticated, async (req, res) => {
    try {
        const locations = await locationModel.getAllLocations();
        const formattedLocations = locations.map((location) => ({
            ...location,
            dateDebut: formatDate(location.dateDebut),
            dateRetourPrevue: formatDate(location.dateRetourPrevue),
            dateRetourEffective: location.dateRetourEffective
                ? formatDate(location.dateRetourEffective)
                : null,
        }));

        res.render('location', { locations: formattedLocations });
    } catch (err) {
        console.error('Erreur lors de la récupération des locations :', err);
        res.status(500).render('location', { locations: [] });
    }
});

// Les routes
app.get('/produits', (req, res) => res.render('produits'));
app.get('/administration', isAuthenticated, (req, res) => res.render('administration'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/gestion', isAuthenticated, (req, res) => res.render('gestion'));

// 404
app.use((req, res) => {
    res.status(404).render('404');
});

// Fonction pour formater les dates
function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

// Démarrage du serveur avec nodemon
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
