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
            fetchMovies(POPULAR_URL);
        });
        tagsEl.append(clear);
    }
}

// FUNCTION - FETCH Movies FROM API (Popular)

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

function fetchSearchMovies(url) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.results);
            if (data.results.length !== 0) {
                listSearches(data.results);
            } else {
                MAIN.innerHTML = `<p class="warning">Sorry! Results Not Found</p>`;
            }
        });
}

// FUNCTION - List Movies (CARD) (Popular)

function listMovies(data) {
    MAIN.innerHTML = "";

    data.forEach((movieCard) => {
        const { id, title, poster_path, vote_average, overview } = movieCard;
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
                <br/>

                <button class="know-more" id="${id}">Trailer</button>
                <button class="more-detail" id="${id + "d"}">Details</button>

            </div>
        `;
        MAIN.appendChild(movieEl);

        document.getElementById(id).addEventListener("click", () => {
            console.log(id);
            openNav(movieCard);
        });

        document.getElementById(id + "d").addEventListener("click", () => {
            console.log(id);
            openDetailNav(movieCard);
        });
    });
}

function listSearches(data) {
    MAIN.innerHTML = "";

    data.forEach((movieCard) => {
        const { id, title, poster_path, vote_average, overview } = movieCard;
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
                <br/>

                <button class="know-more" id="${id}">Trailer</button>
                <button class="more-detail" id="${id + "d"}">Details</button>

            </div>
        `;
        MAIN.appendChild(movieEl);

        document.getElementById(id).addEventListener("click", () => {
            console.log(id);
            openNav(movieCard);
        });

        document.getElementById(id + "d").addEventListener("click", () => {
            console.log(id);
            openDetailNav(movieCard);
        });
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
        fetchSearchMovies(SEARCH_URL + "&query=" + searchTerm);
    } else {
        fetchMovies(POPULAR_URL);
    }
});

const overlayContent = document.getElementById("overlay-content");

// FUNCTION - MOVIES TRAILER OVERLAY
function openNav(movieCard) {
    let id = movieCard.id;
    fetch(BASE_URL + "/movie/" + id + "/videos?" + API_KEY)
        .then((res) => res.json())
        .then((videoData) => {
            console.log(videoData);
            if (videoData) {
                document.getElementById("myNav").style.width = "100%";
                if (videoData.results.length > 0) {
                    var embed = [];
                    var dots = [];
                    videoData.results.forEach((video, idx) => {
                        let { name, key, site } = video;

                        if (site == "YouTube") {
                            embed.push(`
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        `);
                            dots.push(`
                                <span class="dot">${idx + 1}</span>
                        `);
                        }
                    });
                    var content = `
                        <h1 class="warning">${movieCard.original_title}</h1>
                        </br>

                        ${embed.join("")}
                        <br/>

                        <div class="dots">${dots.join("")}</div>
                    `;
                    overlayContent.innerHTML = content;
                    activeSlide = 0;
                    showVideos();
                } else {
                    overlayContent.innerHTML = `<p class="warning">Sorry! Results Not Found</p>`;
                }
            }
        });
    document.getElementById("myNav").style.width = "100%";
}

const overlayContent2 = document.getElementById("overlay-content2");

function openDetailNav(movieCard) {
    document.getElementById("detailNav").style.width = "100%";
    console.log(movieCard);

    var content2 = `
                        <h1 class="warning">${movieCard.original_title}</h1>
                        <img src="${movieCard.poster_path ? IMAGE_URL + movieCard.poster_path : "https://placehold.co/1080x1580"}"
                alt="${movieCard.original_title}">
                        <h3 class="warning">Release Date: ${movieCard.release_date}</h3>
                        <h3 class="warning" id="overview">Overview: ${movieCard.overview}</h3>
                        <h3 class="warning">Vote Average: ${movieCard.vote_average}</h3>
                        <h3 class="warning">Vote Count: ${movieCard.vote_count}</h3>
                    `;
    overlayContent2.innerHTML = content2;
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
    document.getElementById("detailNav").style.width = "0%";
}

var activeSlide = 0;
var totalVideos = 0;
function showVideos() {
    let embedClasses = document.querySelectorAll(".embed");
    let dots = document.querySelectorAll(".dot");

    totalVideos = embedClasses.length;
    embedClasses.forEach((embedTag, idx) => {
        if (activeSlide == idx) {
            embedTag.classList.add("show");
            embedTag.classList.remove("hide");
        } else {
            embedTag.classList.add("hide");
            embedTag.classList.remove("show");
        }
    });

    dots.forEach((dot, indx) => {
        if (activeSlide == indx) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

leftArrow.addEventListener("click", () => {
    if (activeSlide > 0) {
        activeSlide--;
    } else {
        activeSlide = totalVideos - 1;
    }

    showVideos();
});

rightArrow.addEventListener("click", () => {
    if (activeSlide < totalVideos - 1) {
        activeSlide++;
    } else {
        activeSlide = 0;
    }
    showVideos();
});
