const express = require('express');
const app = express();
const usrModel = require('./models/user.js')

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', async function (req, res) {
    const user = await usrModel.getUserById(2)
    res.render('index', {user});
});

app.use(function (req, res) {
  res.status(404).render('404');
});

app.listen(3000, function () {
  console.log('server running on port 3000');
});
