var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  var drinks = [
    { name: 'Bloody Mary', drunkness: 3 }
  ];
  var tagline = "makes something cool";

  res.render('index',
   { title: 'Express', 
   tagline:tagline,
   drinks1:drinks});
});
router.get('/about', function(req, res) {
  let items = [{ title: "foo", id: 1 }, { title: "bar", id: 2}];
  res.render('about',{items:items}
  );
});

router.get('/form', function(req, res) {
  res.render('form');
});

module.exports = router;
