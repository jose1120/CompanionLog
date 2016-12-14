var express = require('express');
var router = express.Router();

// mongoose connection
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');

// schema (blueprint)
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  name: String,
  breed: String,
  gender: String,
  dob: Date,
  color: String,
  weight: Number
});

// Model (access to the collection)
var UserData = mongoose.model('UserData', userDataSchema);

// insert (CRUD)
router.post('/insert', function(req,res,next){
  var item = {
    name: req.body.name,
    breed: req.body.breed,
    gender: req.body.gender,
    dob: req.body.dob,
    color: req.body.color,
    weight: req.body.weight
  };

  var data = new UserData(item);

  data.save();
  res.redirect('/');
});

router.get('/get-data', function(req,res,next){
  UserData.find()
  .then(function(doc){
    res.render('index', {items: doc});
  });
});

router.get('/data', function(req,res,next){
  UserData.find()
    .then(function(doc){
      res.render('data', {items: doc});
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Companion Log' });
});

router.get('/newpet', function(req, res, next) {
  res.render('newpet', { title: 'New Pet' });
});

router.get('/calendar', function(req, res, next) {
  res.render('calendar', { title: 'Calendar' });
});

module.exports = router;
