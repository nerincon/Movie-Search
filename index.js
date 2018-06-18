const dotenv = require('dotenv').config(),
  express = require('express'),
  nunjucks = require('nunjucks'),
  body_parser = require('body-parser'),
  axios = require('axios'),
  apicache = require('apicache'),
  cache = apicache.middleware,
  app = express()

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'html')
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended: false}))

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true
})

app.get('/', function (req, res) {
  res.render('index')
})

app.post('/api', cache('5 minutes'), function (req, res, next) {
  console.log(req.body, 'SEARCH STRING')
  console.log('Generating a new response')
  var search = req.body.searchString
  console.log('search: ' + search)
  var api_key = process.env.API_KEY

  var config = {
    params: {
      brewed_before: '11-2012',
      abv_gt: 6
    }
  }
  var api_url = 'https://api.themoviedb.org/3/search/movie?api_key=' + api_key + '&query=' + search
  console.log('url: ' + api_url)
  axios.get(api_url, config)
    .then(function (r) {
      console.log('sending back data')
      // console.log(r)
      var data = r.data.results
      res.json(data)
    })
    .catch(next)
})

app.get('/movie', function (req, res) {
  var id = req.params.id
  res.render('movie')
})

app.listen(8000, function () {
  console.log('Listening on port 8000')
})
