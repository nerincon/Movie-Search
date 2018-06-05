var api_key = 'afdbde1b23986061250c4e55fd79a7d2';

function movieSelected(id) {
    console.log('getting movieSelected function');
    sessionStorage.setItem('movieId', id);
    window.location = 'movie';
    return false;
}

function getMovie(id){
    var movieId = sessionStorage.getItem('movieId');
    var api_url = 'https://api.themoviedb.org/3/movie/'+movieId+'?api_key='+api_key;
    console.log('particularmovieid: '+ movieId);
    console.log('particularmovieurl: '+ api_url);
    axios.get(api_url)
        .then((res) => {
            console.log(res);
            var poster = res.data.backdrop_path;
            var img = "https://image.tmdb.org/t/p/w500"+poster;
            var movie = res.data;

            var output = `
                <div class='row'>
                    <div class='col m8 materialboxed'>
                        <img src="${img}" width="950">
                    </div>
                    <div class='col m4'>
                        <h2>${movie.title}</h2>
                        <ul class="collection">
                        <li class"collection-item"><strong>Genre:</strong>  ${movie.genres[0].name}</li>
                        <li class"collection-item"><strong>Second Genre:</strong>  ${movie.genres[1].name}</li>
                        <li class"collection-item"><strong>Released:</strong>  ${movie.release_date}</li>
                        <li class"collection-item"><strong>Runtime:</strong>  ${movie.runtime} minutes</li>
                        <li class"collection-item"><strong>Budget:</strong>  ${Number(movie.budget)}</li>
                        <li class"collection-item"><strong>Revenue:</strong>  ${movie.revenue}</li>
                        </ul>
                    </div>
                </div>
                <div class='row'>
                    <div class="well">
                        <h3>Plot</h3>
                        ${movie.overview}
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn">View IMDB</a>
                        <a href="/" class="btn">Go Back to Search</a>
                    </div>
                </div>
            `;

            $('#movie').html(output);
        })
        .catch((error) => {
            console.error(error);
        });
}

$(document).ready(() => {
    console.log('separate js file working')
    // sessionStorage.setItem('dude', 'Nelson Rincon');
    // let val = sessionStorage.getItem('dude');
    // console.log(val);
    // var api_url = '/api';

    $('#myForm').submit((evt) => {
        var searchText = $('#search').val();
        getMovies(searchText);
        evt.preventDefault();
    });

    function getMovies(searchText){
        var api_url = 'https://api.themoviedb.org/3/search/movie?api_key='+api_key+'&query='+searchText;
        axios.get(api_url)
            .then((res) => {
                var movies = res.data.results;
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
                            <a onclick="movieSelected('${id}');" class="btn" href="#">Movie Details</a>
                        </div>
                    </div>
                    
                    `;
                })
                $('#movieInfo').html(output)
            })
            .catch((error) => {
                console.error(error);
            });

    }
});
