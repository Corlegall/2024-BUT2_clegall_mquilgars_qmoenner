const express = require('express');
const app = express();
const usrModel = require('./models/user.js');
const session = require('express-session');
const md5 = require('md5');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));


app.use(session({
  secret: 'OOF',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  if (req.session.userId) {
    // Exemple de données utilisateur stockées en session
    res.locals.user = {
      id: req.session.userId,
      prenom: req.session.prenom || 'Prénom',
      nom: req.session.nom || 'Nom',
    };
  } else {
    res.locals.user = null; // Aucun utilisateur connecté
  }
  next();
});


app.get('/', async (req, res) => {
  const user = await usrModel.getUserById(2);
  res.render('index', { user });
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
      req.session.role = user.type_utilisateur;

      return res.redirect('/');
    } else {
      res.render('login', { error: 'Identifiant ou mot de passe incorrect.' });
    }
  } catch (err) {
    console.error('Erreur lors de la connexion :', err);
    res.render('login', { error: 'Une erreur est survenue. Veuillez réessayer.' });
  }
});

const produitModel = require('./models/produit.js');

app.get('/catalogue', async (req, res) => {
  try {
    const produits = await produitModel.getAllProduits(); // Récupère les produits depuis le modèle
    res.render('catalogue', { produits }); // Passe 'produits' à la vue
  } catch (err) {
    console.error('Erreur lors de la récupération des produits :', err);
    res.render('catalogue', { produits: [] }); // Passe une liste vide en cas d'erreur
  }
});

function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

const locationModel = require('./models/location.js'); // Import du modèle

app.get('/location', async (req, res) => {
  try {
    const locations = await locationModel.getAllLocations();

    // Formater les dates
    const formattedLocations = locations.map(location => ({
      ...location,
      dateDebut: formatDate(location.dateDebut),
      dateRetourPrevue: formatDate(location.dateRetourPrevue),
      dateRetourEffective: location.dateRetourEffective ? formatDate(location.dateRetourEffective) : null,
    }));

    res.render('location', { locations: formattedLocations });
  } catch (err) {
    console.error('Erreur lors de la récupération des locations :', err);
    res.status(500).render('location', { locations: [] });
  }
});


app.get('/produits', (req, res) => res.render('produits'));
app.get('/administration', (req, res) => res.render('administration'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/gestion', (req, res) => res.render('gestion'));
app.get('/compte', (req, res) => res.render('compte'));

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});