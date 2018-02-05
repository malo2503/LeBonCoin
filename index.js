var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require("lodash");

var multer = require('multer');
var upload = multer({ dest: 'public/uploads/' });

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var offers =[];

app.get('/', function (req, res) {
    res.render('home.ejs');
  });

// accéder au formulaire de depot

app.get('/deposer', function (req,res) {
    res.render('placeoffer.ejs');
});


//creer son annonce

app.post ("/deposer", upload.single("picture"), function(req,res){
  var NewOffer = {};
  NewOffer.id = offers.length + 1;
  NewOffer.title = req.body.title;
  NewOffer.description = req.body.description;
  NewOffer.price = req.body.price;
  NewOffer.picture = req.file.filename;
  NewOffer.location = req.body.location;
  NewOffer.pseudo = req.body.pseudo;
  NewOffer.email = req.body.email;
  NewOffer.phone = req.body.phone;
      

  offers.push(NewOffer);
  /* console.log(offers); */
  res.redirect('/annonce/'+ NewOffer.id);
});

//accéder au rendu d'annonce

app.get('/annonce/:id', function (req, res) {
  var id = parseInt(req.params.id);
  var offer = _.filter(offers, ["id", id]);
  console.log(offer);
  res.render('viewoffer.ejs', {offer});
});


app.listen(3000, "localhost", function() {
console.log("Server is listening...");
});
  