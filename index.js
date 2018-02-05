var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var multer = require('multer');
var upload = multer({ dest: 'public/uploads/' });

app.use(express.static("public"));

var offers =[];

app.get('/', function (req, res) {
    res.render('home.ejs');
  });

// accéder au formulaire de depot

app.get('/deposer', function (req,res) {
    res.render('placead.ejs');
});


//creer son annonce

app.post ("/deposer", function(req,res){
var NewOffer = {};
NewOffer.id = offers.length + 1;
NewOffer.title = req.body.title;
    

offers.push(NewOffer);
console.log(offers);
res.redirect('/')
});

//accéder au rendu d'annonce

app.get('/annonce/:id', function (req, res) {
    res.render('viewad.ejs');
  });


app.listen(3000, "localhost", function() {
console.log("Server is listening...");
});
  