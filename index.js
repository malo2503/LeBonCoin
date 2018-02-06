var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var _ = require("lodash");

var multer = require("multer");
var upload = multer({ dest: "public/uploads/" });

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/leboncoin");

// 1) Definir le schema - A faire qu'une fois
var offerSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  picture: String,
  location: String,
  pseudo: String,
  email: String,
  phone: String,
});

// 2) Definir le model - A faire qu'une fois
var ClassifiedAd = mongoose.model("ClassifiedAd", offerSchema);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function(req, res) {
  res.render("home.ejs");
});

// accéder au formulaire de depot

app.get("/deposer", function(req, res) {
  res.render("placeoffer.ejs");
});

//creer son annonce

app.post("/deposer", upload.single("picture"), function(req, res) {
  var NewOffer = new ClassifiedAd({
  title : req.body.title,
  description : req.body.description,
  price : req.body.price,
  picture : req.file.filename,
  location : req.body.location,
  pseudo : req.body.pseudo,
  email : req.body.email,
  phone : req.body.phone,
  });
  NewOffer.save(function(err, obj) {
    if (err) {
      console.log("something went wrong");
    } else {
      console.log("we just saved the new Offer " + obj.title);
    }
  res.redirect("/annonce/" + NewOffer.id);
  });
});

//accéder au rendu d'annonce

/*app.get("/annonce/:id", function(req, res) {
  var id = parseInt(req.params.id);
  var offer = _.find(offers, ["id", id]);
  console.log(offer);
  res.render("viewoffer.ejs", { offer });
});
*/

app.listen(3000, "localhost", function() {
  console.log("Server is listening...");
});
