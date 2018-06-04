$(document).ready(() => {
    console.log('separate js file working')
    // sessionStorage.setItem('dude', 'Nelson Rincon');
    // let val = sessionStorage.getItem('dude');
    // console.log(val);
    // var api_url = '/api';
    var api_key = 'afdbde1b23986061250c4e55fd79a7d2';

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
                            <a onclick= "movieSelected('${id}')" class="btn" href="#">Movie Deatils</a>
                        </div>
                    </div>
                    
                    `;
                })
                $('#movieInfo').html(output)
            })
            .catch((error) => {
                console.error(error);
            });

    function movieSelected(id){
        console.log('getting movieSelected function');
        sessionStorage.setItem('movieId', id);
        window.location = 'movie.html';
        return false;
    }

    function getMovie(id){
        var api_url = 'https://api.themoviedb.org/3/movie/'+id+'?api_key='+api_key;
        console.log('particularmovieid: '+ id);
        console.log('particularmovieurl: '+ api_url);
        axios.get(api_url)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    }
});
