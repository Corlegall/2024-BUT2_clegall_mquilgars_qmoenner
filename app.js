const express = require('express');
const app = express();
const usrModel = require('./models/user.js');

const session = require('express-session');
app.set('view engine', 'ejs');
const md5 = require('md5');

app.use(express.static('public'));
app.use(session({
  secret: 'OOF',
  resave: false,
  saveUninitialized: false
}));


app.get('/', async function (req, res) {
  const user = await usrModel.getUserById(2);
  res.render('index', { user });
});





app.get('/login', function (req, res) {
  res.render('login', { error: null });
});

app.get('/catalogue', function (req, res) {
  res.render('catalogue');
});

app.post('/login', async function (req, res) {
  const login = req.body.login;
  const mdp = req.body.password;

  const user = await usrModel.checkLogin(login);

  if (user != false && user.password == md5(mdp)) {
    req.session.userId = user.id; 
    req.session.role = user.type_utilisateur; 
    return res.redirect("/");
  }
}); 


app.post('/login', async function (req, res) {
  const login = req.body.login;
  const mdp = req.body.password;

  const user = await usrModel.checkLogin(login); 

  if (user != false && user.password == md5(mdp)) {
    req.session.userid = user.id;  
    req.session.role = user.type_utilisateur;
    return res.redirect("/");
  }

  res.render('login', { error: "Erreur dans le login/mdp" });
});


app.use(function (req, res) {
  res.status(404).render('404');
});

app.listen(3000, function () {
  console.log('server running on port 3000');
});