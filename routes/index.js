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

var eventDataSchema = new Schema({
  title: String,
  starttime: String,
  endTime: String
})

// Model (access to the collection)
var UserData = mongoose.model('UserData', userDataSchema);
var EventData = mongoose.model('EventData', eventDataSchema);

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

  // this saves and then finds the record id
  // just created and then finds that record
  // data.save(function(err, record){
  //   var newId = record._id;
  //   UserData.find({_id:newId})
  //     .then(function(doc){
  //       res.render('index', {items: doc});
  //     });
  // });
  data.save();
  res.redirect('/');
});

router.post('/insert002', function(req, res, next){
  var event0 = {
    title: req.body.title,
    starttime: req.body.starttime,
    endtime: req.body.endtime
  };

  var data002 = new EventData(events0);

  data002.save();
  res.redirect('/calendar');
})

// router.get('/get-data', function(req,res,next){
//   UserData.find()
//   .then(function(doc){
//     res.render('index', {items: doc});
//   });
// });

router.get('/data', function(req,res,next){
  UserData.find()
    .then(function(doc){
      res.render('data', {items: doc});
    });

    // EventData.find()
    // .then(function(doc){
    //   res.render('index', {events: doc});
    // });
});

// delete from button
router.get('/deletebtn/:id', function(req,res,next){
  var id = req.params.id;
  UserData.findByIdAndRemove(id).exec();
  res.redirect('/data');
})

/* Post find results*/
router.post('/finddoc', function(req,res,next){
  var search = req.body.search;
  UserData.find().or([{title: search}, {content: search}]) // this allows us to find the value in multiple fields
    .then(function(doc){
      res.render('find', {items:doc});
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  UserData.find()
    .then(function(doc){
      res.render('index', { items: doc});
    });
});

router.get('/newpet', function(req, res, next) {
  res.render('newpet', { title: 'New Pet' });
});

router.get('/calendar', function(req, res, next) {
  res.render('calendar', { title: 'Calendar' });
});

router.get('/createevent', function(req, res, next){
  res.render('createevent', { title: 'Create Event'})
});

router.get('/emergency', function(req, res, next){
  res.render('emergency', { title: 'Vets Nearby'})
});

module.exports = router;
