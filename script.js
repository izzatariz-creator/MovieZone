// API

const API_KEY = "api_key=9bf3ce744d5c5df6ca18c4875bbb36f2";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500/";
const POPULAR_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const MAIN = document.getElementById("movieListPopular");
const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY;
const form = document.getElementById("searchMovie");
const search = document.getElementById("searchValue");
const tagsEl = document.getElementById("tags");

// API REQUEST - (POPULAR)
fetchMovies(POPULAR_URL);

// API - Genre
const genres = [
    {
        id: 28,
        name: "Action",
    },
    {
        id: 12,
        name: "Adventure",
    },
    {
        id: 16,
        name: "Animation",
    },
    {
        id: 35,
        name: "Comedy",
    },
    {
        id: 80,
        name: "Crime",
    },
    {
        id: 99,
        name: "Documentary",
    },
    {
        id: 18,
        name: "Drama",
    },
    {
        id: 10751,
        name: "Family",
    },
    {
        id: 14,
        name: "Fantasy",
    },
    {
        id: 36,
        name: "History",
    },
    {
        id: 27,
        name: "Horror",
    },
    {
        id: 10402,
        name: "Music",
    },
    {
        id: 9648,
        name: "Mystery",
    },
    {
        id: 10749,
        name: "Romance",
    },
    {
        id: 878,
        name: "Science Fiction",
    },
    {
        id: 10770,
        name: "TV Movie",
    },
    {
        id: 53,
        name: "Thriller",
    },
    {
        id: 10752,
        name: "War",
    },
    {
        id: 37,
        name: "Western",
    },
    ,
];

var selectedGenre = [];
setGenre();
function setGenre() {
    tagsEl.innerHTML = "";
    genres.forEach((genre) => {
        const t = document.createElement("div");
        t.classList.add("tag"); // add class tag
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener("click", () => {
            if (selectedGenre.length == 0) {
                selectedGenre.push(genre.id);
            } else {
                if (selectedGenre.includes(genre.id)) {
                    selectedGenre.forEach((id, idx) => {
                        if (id == genre.id) {
                            selectedGenre.splice(idx, 1);
                        }
                    });
                } else {
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre);
            fetchMovies(POPULAR_URL + "&with_genres=" + encodeURI(selectedGenre.join(",")));
            highlightSelection();
        });
        tagsEl.append(t);
    });
}

function highlightSelection() {
    const tags = document.querySelectorAll(".tag");
    tags.forEach((tag) => {
        tag.classList.remove("highlight");
    });
    clearBtn();
    if (selectedGenre.length != 0) {
        selectedGenre.forEach((id) => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.classList.add("highlight");
        });
    }
}

function clearBtn() {
    let clearBtn = document.getElementById("clear");
    if (clearBtn) {
        clearBtn.classList.add("highlight");
    } else {
        let clear = document.createElement("div");
        clear.classList.add("tag", "highlight");
        clear.id = "clear";
        clear.innerText = "Clear x";
        clear.addEventListener("click", () => {
            selectedGenre = [];
            setGenre();
            getMovies(API_URL);
        });
        tagsEl.append(clear);
    }
}

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
        <img src="${poster_path ? IMAGE_URL + poster_path : "https://placehold.co/1080x1580"}"
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
    selectedGenre = [];
    setGenre();

    if (searchTerm) {
        fetchMovies(SEARCH_URL + "&query=" + searchTerm);
    } else {
        fetchMovies(POPULAR_URL);
    }
});
