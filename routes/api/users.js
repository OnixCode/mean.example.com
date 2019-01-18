//The purpose of this page is to define routes to an endpoint
var express = require('express');
var router = express.Router();

var Users = require('../../models/users');//Users references a table

router.get('/', function(req, res, next) {//request, response and next to return all users
  Users.find({},function(err, users){ //{} empty JSON object
    if(err){
     return res.json({'success':false, 'error': err});//'' are variables
   }
    return res.json({'success':true, 'users': users});
  });
});

router.get('/:userId', function(req,res){ //return one user

  var userId = req.params.userId;//get parameters
   Users.findOne({'_id':userId}, function(err, user){//findOne returns the first match and
    //query is '_id':userId
     if(err){
      return res.json({'success':false, 'error': err});
    }
     return res.json({'success':true, 'user': user});
   });
 });

 router.post('/', function(req, res) {

  Users.create(new Users({//create is a property of Mongoose for Users, new Users is an arguement for
    //a new user
    username: req.body.username,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }), function(err, user){

    if(err){
      return res.json({success: false, user: req.body, error: err});
    }

    return res.json({success: true, user: user});//user:user returns just the created user record

  });
});

router.put('/', function(req, res){//an edit function to splice data together

  Users.findOne({'_id': req.body._id}, function(err, user){

   if(err) {
     return res.json({success: false, error: err});
   }

   if(user) {

    let data = req.body;

    if(data.username){//check if each piece of data is coming in from user request before
      //processing
      user.username = data.username;
    }

    if(data.email){
    user.email = data.email;
    }

    if(data.first_name){
    user.first_name = data.first_name;
    }

    if(data.last_name){
    user.last_name = data.last_name;
    }

    user.save(function(err){
      if(err){
        return res.json({success: false, error: err});
      }else{
        return res.json({success: true, user:user});
      }
    });

   }

  });

});

router.delete('/:userId', function(req,res){

  var userId = req.params.userId;

  Users.remove({'_id':userId}, function(err,removed){

    if(err){
      return res.json({success: false, error: err});
    }

    return res.json({success: true, status: removed});

  });

});
module.exports = router;