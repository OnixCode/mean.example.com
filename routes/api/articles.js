var express = require('express');
var router = express.Router();

  //Request that returns all user record
var Articles = require('../../models/articles');

router.get('/', function(req, res, next) {

 Articles.find({},function(err, articles){

   if(err){
    return res.json({'success':false, 'error': err});
  }

   return res.json({'success':true, 'articles': articles});
 });

});

router.get('/', function(req, res, next) {
 res.json({success: true});
});
 //
router.get('/:articleId', function(req,res){

 //Request that returns one user record

 var articleId = req.params.articleId;
  Articles.findOne({'_id':articleId}, function(err, article){
    if(err){
     return res.json({'success':false, 'error': err});
   }
    return res.json({'success':true, 'article': article});
  });

});

   //Post
router.post('/', function(req, res) {
 Articles.create(new Articles({
   title: req.body.title,
   slug: req.body.slug,
   body: req.body.body,
   keywords: req.body.keywords,
   description: req.body.description,
   published: req.body.published
 }), function(err, article){

   if(err){
     return res.json({success: false, article: req.body, error: err});
   }

   return res.json({success: true, article: article});

 });

});

 //PUT
router.put('/', function(req, res){

 Articles.findOne({'_id': req.body._id}, function(err, article){

  if(err) {
    return res.json({success: false, error: err});
  }else if (article) {

   let data = req.body;

   if(data.title){
     article.title = article.title;
    }
   if(data.slug){
    article.slug = article.slug;
    }
  if(data.body){
    article.body = article.body;
    }
  if(data.keywords){
    article.keywords = article.keywords;
    }
  if(data.description){
    article.description = article.description;
    }
  if(data.published){
    article.published = article.published;
    }
   article.save(function(err){
     if(err){
       return res.json({success: false, error: err});
     }else{
       return res.json({success: true, article:article});
     }
   });

  }

 });

});

 //Delete
router.delete('/:articleId', function(req,res){

 var articleId = req.params.articleId;

 Articles.remove({'_id':articleId}, function(err,removed){

   if(err){
     return res.json({success: false, error: err});
   }

   return res.json({success: true, status: removed});

 });

});

module.exports = router;
