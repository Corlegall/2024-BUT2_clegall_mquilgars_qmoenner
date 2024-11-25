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


app.get('/', async (req, res) => {
  const user = await usrModel.getUserById(2);
  res.render('index', { user });
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
  try {
    const login = req.body.login;
    const mdp = req.body.password;

    if (!login || !mdp) {
      return res.render('login', { error: "Veuillez remplir tous les champs." });
    }

    const user = await usrModel.checkLogin(login);

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

app.get('/catalogue', (req, res) => res.render('catalogue'));
app.get('/produits', (req, res) => res.render('produits'));
app.get('/administration', (req, res) => res.render('administration'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/gestion', (req, res) => res.render('gestion'));
app.get('/location', (req, res) => res.render('location'));
app.get('/compte', (req, res) => res.render('compte'));

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
