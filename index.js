var dotenv = require('dotenv').config();
    express = require('express');
    nunjucks = require('nunjucks');
    body_parser = require('body-parser');
    axios = require('axios');
    apicache = require('apicache');
    cache = apicache.middleware;
    app = express();
    



app.use(express.static(__dirname + "/public"));
app.set('view engine', 'html');
app.use(body_parser.urlencoded({extended: false}));

var api_key = 'afdbde1b23986061250c4e55fd79a7d2';



// var api_url = 'https://api.themoviedb.org/3/search/movie?api_key='+api_key+'&query=silence of the lambs';
;
// var config = {
//     params: {
//     brewed_before: "11-2012",
//     abv_gt: 6
//     }
// };

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    noCache: true
    });



app.get('/', function (req, res) {
    res.render('index');
    });

app.get('/movie', function (req, res) {
    var id = req.params.id;
    res.render('movie');
    });

// app.get('/api', cache('5 minutes'), function (req, res, next) {
//     console.log('Generating a new response');
    
//     var search = req.query.search;
//     console.log('search: '+search);

//     var api_url = 'https://api.themoviedb.org/3/search/movie?api_key='+api_key+'&query='+search;
//     console.log('url: '+ api_url);
//     var config = {
//         params: {
//         brewed_before: "11-2012",
//         abv_gt: 6
//         }
//     };

    // axios.get(api_url, config)
    //     .then(function (r) {
    //         console.log('sending back data')
    //         console.log(r)
    //         var data = r.data
    
    //         res.json({title: r.data.title, temp: r.data.temp});
    //     })
    //     .catch(next);
    // });




app.listen(8000, function () {
    console.log('Listening on port 8000');
    });