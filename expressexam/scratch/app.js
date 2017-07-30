const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser")


//--------Body Parser ----------------------
app.use(bodyParser.urlencoded({	extended: true }))
app.use(bodyParser.json());

//--------Serve static resource -------------
app.use('/public', express.static('public'))

//---------View Template Engine -------------
const nunjucks = require('nunjucks')
nunjucks.configure('views', {
	autoescape: true,
	cache: false,
	express: app,
	watch: true
})
app.engine('html', nunjucks.render)
app.set('view engine', 'html')


app.get('/',(req,res) =>{
  let articles = [
    {
      id:1,
      title:'Article One',
      author:'Alex',
      body:'This is article one'
    },
    {
      id:2,
      title:'Article Two',
      author:'Alex Two',
      body:'This is article Two'
    },
    {
      id:3,
      title:'Article Three',
      author:'Alex Three',
      body:'This is article Three'
    }
  ]
  res.render('index',{
    title:'Articles',
    articles:articles
  })
})


// Get single Article
app.get('/article/:id', (req,res) =>{
  article.findById(req.params.id, (err,article) =>{
    res.render('article',{
      article:article
    })
  })
})

//Add Route
app.get('/article/add', (req,res) =>{
    let articles = [
    {
      id:1,
      title:'Article One',
      author:'Alex',
      body:'This is article one'
    },
    {
      id:2,
      title:'Article Two',
      author:'Alex Two',
      body:'This is article Two'
    },
    {
      id:3,
      title:'Article Three',
      author:'Alex Three',
      body:'This is article Three'
    }
  ]
  res.render('add_article',{
    title:'Add Article',
    articles:articles
  })
})

app.listen(port, () =>{
  console.log('Server is running on port: '+ port);
})