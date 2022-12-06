// API

const API_KEY = "api_key=9bf3ce744d5c5df6ca18c4875bbb36f2";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500/";

// API REQUEST - (POPULAR)

const POPULAR_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const MAIN = document.getElementById("movieListPopular");
fetchMovies(POPULAR_URL);

// API REQUEST - (SEARCH)
const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY;

// FUNCTION - FETCH Movies (Popular)

function fetchMovies(url) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.results);
            if (data.results.length !== 0) {
                listMovies(data.results);
            } else {
                MAIN.innerHTML = `<p class="warning">Sorry! Results Not Found</p>`;
            }
        });
}

// FUNCTION - List Movies (Popular)

function listMovies(data) {
    MAIN.innerHTML = "";

    data.forEach((movieCard) => {
        const { title, poster_path, vote_average, overview } = movieCard;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movieCard");
        movieEl.innerHTML = `
        <img src="${IMAGE_URL + poster_path}"
                alt="${title}">

            <div class="info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">
                <h2>${title}</h2>
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        MAIN.appendChild(movieEl);
    });
}

// FUNCTION - Determine Rating Colour

function getColor(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

// FUNCTION - Search Movies

searchMovie.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = searchValue.value;
    if (searchTerm) {
        fetchMovies(SEARCH_URL + "&query=" + searchTerm);
    } else {
        fetchMovies(POPULAR_URL);
    }
});
