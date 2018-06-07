var api_key = 'afdbde1b23986061250c4e55fd79a7d2';

function movieSelected(id) {
    console.log('getting movieSelected function');
    sessionStorage.setItem('movieId', id);
    window.location = 'movie';
    return false;
}

function fetchAPIOneMovie(id){
    var movieId = sessionStorage.getItem('movieId');
    var api_url = 'https://api.themoviedb.org/3/movie/'+movieId+'?api_key='+api_key;
    console.log('particularmovieid: '+ movieId);
    console.log('particularmovieurl: '+ api_url);
    axios.get(api_url)
         .then(getMovieVariables)
         .catch(console.error)
    }

function getMovieVariables (res) {
    var title = res.data.title;
    var poster = res.data.backdrop_path;
    var img = "https://image.tmdb.org/t/p/w500"+poster;
    var genre = res.data.genres[0].name;
    var second_genre = res.data.genres[1].name;
    var released = res.data.release_date;
    var runtime = res.data.runtime;
    var budget = res.data.budget;
    var revenue = res.data.revenue;
    var overview = res.data.overview;
    var imdb_id = res.data.imdb_id;
    var generatedMovie = buildMovieHTML({title: title, poster:poster, img:img, genre:genre, second_genre:second_genre, released:released, runtime:runtime, budget:budget, revenue:revenue, overview:overview, imdb_id:imdb_id});
    appendOneMovie(generatedMovie)

}


function buildMovieHTML({title: title, poster:poster, img:img, genre:genre, second_genre:second_genre, released:released, runtime:runtime, budget:budget, revenue:revenue, overview:overview, imdb_id:imdb_id}) {
            var output = `
                <div class='row'>
                    <div class='col m8 materialboxed'>
                        <img src="${img}" width="950">
                    </div>
                    <div class='col m4'>
                        <h2>${title}</h2>
                        <ul class="collection">
                        <li class"collection-item"><strong>Genre:</strong>  ${genre}</li>
                        <li class"collection-item"><strong>Second Genre:</strong>  ${second_genre}</li>
                        <li class"collection-item"><strong>Released:</strong>  ${released}</li>
                        <li class"collection-item"><strong>Runtime:</strong>  ${runtime} minutes</li>
                        <li class"collection-item"><strong>Budget:</strong>  ${budget}</li>
                        <li class"collection-item"><strong>Revenue:</strong>  ${revenue}</li>
                        </ul>
                    </div>
                </div>
                <div class='row'>
                    <div class="well">
                        <h3>Plot</h3>
                        ${overview}
                        <hr>
                        <a href="http://imdb.com/title/${imdb_id}" target="_blank" class="btn">View IMDB</a>
                        <a href="/" class="btn">Go Back to Search</a>
                    </div>
                </div>
            `;
            return output;
}

function appendOneMovie(movie){
    $('#movie').html(movie);
}

$(document).ready(() => {
    console.log('separate js file working')
    // sessionStorage.setItem('dude', 'Nelson Rincon');
    // let val = sessionStorage.getItem('dude');
    // console.log(val);
    // var api_url = '/api';

    $('#myForm').submit((evt) => {
        evt.preventDefault();
        var searchText = $('#search').val();
        console.log(searchText);
        getAllSearchedMovies(searchText);
    });

    function getAllSearchedMovies(searchText){
        var api_url = 'https://api.themoviedb.org/3/search/movie?api_key='+api_key+'&query='+searchText;
        axios.get(api_url)
            .then(getAllMoviesVariable)
            .catch(console.error)
        }


    function getAllMoviesVariable(res) {
        var movies = res.data.results;
        var searchedMovies = buildAllMoviesHTML(movies);
        appendAllMovies(searchedMovies);
    }

    function buildAllMoviesHTML(movies){
        var output = ''
        $.each(movies, (index, movie) => {
            var poster = movie.poster_path;
            var img = "https://image.tmdb.org/t/p/w200"+poster;
            var id = movie.id;
            output += `
            <div class="col m3">
                <div class="well center-align">
                    <img src="${img}">
                    <h6>${movie.title}</h6>
                    <a onclick="movieSelected('${movie.id}');" class="btn" href="#">Movie Details</a>
                </div>
            </div>
            
            `;
        })
        return output;
    }
});

function appendAllMovies(movies){
    $('#movieInfo').html(movies)
}







// .then((res) => {
//     var movies = res.data.results;
//     getMoviesData(movies);
// })

// .then(function (res) {
//     var movies = res.data.results
//     getMoviesData(movies)
// })

// .then(callback)

// function callback (res) {
//     // ...
// }