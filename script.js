// Search Movies JS Start
const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");

// load movies from API
async function loadMovies(searchTerm) {
  const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=49fa8152`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  // console.log(data.Search);
  if (data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

function displayMovieList(movies) {
  searchList.innerHTML = "";
  for (let idx = 0; idx < movies.length; idx++) {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = movies[idx].imdbID;
    movieListItem.classList.add("search-list-item");
    if (movies[idx].Poster != "N/A") moviePoster = movies[idx].Poster;
    else moviePoster = "image_not_found.png";

    movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}

let addMovies = [];
function loadMovieDetails() {
  const searchListMovies = searchList.querySelectorAll(".search-list-item");
  searchListMovies.forEach((movie) => {
    movie.addEventListener("click", async () => {
      // console.log(movie.dataset.id);
      searchList.classList.add("hide-search-list");
      movieSearchBox.value = "";
      const result = await fetch(
        `https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=49fa8152`
      );
      const movieDetails = await result.json();
      console.log(movieDetails);
      addMovies.push(movieDetails);
      localStorage.setItem("movies", JSON.stringify(addMovies)) || [];
      displayMovieDetails(movieDetails);
    });
  });
}

function displayMovieDetails(details) {
  resultGrid.innerHTML = `
    <div class = "movie-poster col-11 col-lg-4 mx-auto">
        <img class="img-fluid" src = "${
          details.Poster != "N/A" ? details.Poster : "image_not_found.png"
        }" alt = "movie poster">
    </div>
    <div class = "movie-info col-11 col-lg-7 mx-auto text-search">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b>Award:</b> ${details.Awards}</p>
        <button onclick="addToWatchlist()" class="btn btn-danger"><i class="bi bi-plus-square-fill"></i> Watchlist</button>
    </div>
    `;
}

window.addEventListener("click", (event) => {
  if (event.target.className != "form-control") {
    searchList.classList.add("hide-search-list");
  }
});
// Search Movies JS End

// Grid Movies JS Start
let grid = document.getElementById("grid_append");
fetchData = async () => {
  try {
    const res = await fetch(`https://www.omdbapi.com/?s=good&apikey=49fa8152`);
    const data = await res.json();
    // console.log(data.Search);
    showData(data.Search);
  } catch (error) {
    console.log(error);
  }
};
fetchData();
showData = (data) => {
  data.forEach((movie) => {
    const { Poster, Title, Year } = movie;
    // console.log(movie);
    const gridData = `<div class="mb-5 col-md-6 col-10 col-lg-4 col-xl-3 mx-auto" id="grid-item">
    <img src=${Poster} class="mb-2 img-fluid" alt=${Title}/>
    <h5>${Title}</h5>
    <p>${Year}</p>
    <button onclick="addToWatchlist()" class="btn btn-danger"><i class="bi bi-plus-square-fill"></i> Watchlist</button>
    </div>`;
    grid.insertAdjacentHTML("beforeend", gridData);
  });
};

// Grid Movies JS End

// Whatslist Start

addToWatchlist = () => {
  alert("Added into Watchlist");
};
removeToWatchlist = () => {
  alert("Remove from Watchlist");
};

// Watchlist
const watchList = document.getElementById("watchlist");

fetchWatchList = async () => {
  try {
    const res = await fetch(`https://www.omdbapi.com/?s=thor&apikey=49fa8152`);
    const item = await res.json();
    // console.log(data.Search);
    showWatchList(item.Search);
  } catch (error) {
    console.log(error);
  }
};
fetchWatchList();
showWatchList = (item) => {
  item.forEach((movie) => {
    const { Poster, Title, Year } = movie;
    // console.log(movie);
    const gridWatchList = `<div class="mb-5 col-md-6 col-10 col-lg-4 col-xl-3 mx-auto" id="grid-item">
    <img src=${Poster} class="mb-2 img-fluid" alt=${Title}/>
    <h5>${Title}</h5>
    <p>${Year}</p>
    <button onclick="removeToWatchlist()" class="btn btn-danger"><i class="bi bi-dash-square-fill"></i> Remove From Watchlist</button>
    </div>`;
    watchList.insertAdjacentHTML("beforeend", gridWatchList);
  });
};
