const express = require('express');
const app = express();

app.set('view engine','ejs');

app.use(express.static('public'));

app.get('/,function (req, res){res.render(index')

app.use(function (req,res){res.status(404).render('404');})

app.listent(3000,function(){
    console.log('server running on port 3000');
})