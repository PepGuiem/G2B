const MAX_ROWS = 25;
const GAMES_PER_ROW = 4;
const TOTAL_GAMES = MAX_ROWS * GAMES_PER_ROW; 
const API_KEY = "1baca15855374a6db824d20988b6f976";
const GAME_URL = "https://api.rawg.io/api/games?key=" + API_KEY;
const MIN_RATING = 4.1;
var page = 0;
var games = [];
var selectedGenre = null; 

document.addEventListener("DOMContentLoaded", function() {
    populateGenres(); 
    renderGameCards();
});

function filterByGenre(genre) {
  selectedGenre = genre; 
  resetGameCards();
  renderGameCards();
}

function resetGameCards() {
  const container = document.getElementById("gameCardsContainer");
  container.innerHTML = ''; 
  page = 0;
  games = []; 
}

function mostrarMensaje() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    renderGameCards();
  }
}

window.addEventListener('scroll', mostrarMensaje);

function renderGameCards() {
  const container = document.getElementById("gameCardsContainer");
  let gamesRendered = 0; 
  let currentRow;

  for (let i = 0; i < MAX_ROWS; i++) {
    currentRow = document.createElement("div");
    currentRow.className = "row mt-3 mx-3";
    page = page + 1;
    fetchGameData(page + 1)
      .then(games => {
        games.forEach(game => {
          if (gamesRendered < TOTAL_GAMES) {
            const columnDiv = document.createElement("div");
            columnDiv.className = "col-lg-3 col-md-6 d-flex justify-content-center";
            const card = createCard(game);
            columnDiv.appendChild(card);
            currentRow.appendChild(columnDiv);
            gamesRendered++;
          }
        });
        container.appendChild(currentRow);
      })
      .catch(error => console.error("Error fetching game data:", error));
  }
}

function createCard(game) {
  games.push(game);
  const cardDiv = document.createElement("div");
  cardDiv.className = "card border-warning";
  cardDiv.style = "width: 18rem;";
  const price = calculatePrice(game.released);
  cardDiv.innerHTML = `
      <img class="card-img-top" src="${game.background_image}" alt="Card image cap" width="262" height="186">
      <div class="card-body">
        <h5 class="card-title">${game.name}</h5>
        <p class="card-text">Price: ${price}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Rating: ${game.rating}</li>
        <li class="list-group-item">Released: ${game.released}</li>
      </ul>
      <div class="card-body">
      <button type="button" class="btn btn-warning fw-bold" onclick="addToCart('${game.name}', '${price}')">PURCHASE</button>
      <a href="./game.html" onclick="showGame('${game.id}')><button type="button" class="btn btn-primary" ">View</button></a>
      </div>
  `;
  return cardDiv;
}

function addToCart(gameName, gamePrice) {
  const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  shoppingCart.push({ name: gameName, price: gamePrice });
  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}

function fetchGameData(page) {
  let url = `${GAME_URL}&page=${page}`;
  if (selectedGenre) {
    url += `&genres=${selectedGenre}`; 
  }
  return fetch(url)
    .then(response => response.json())
    .then(data => data.results.filter(game => game.rating >= MIN_RATING));
}

function calculatePrice(releaseDate) {
  const currentDate = new Date();
  const gameReleaseDate = new Date(releaseDate);
  const yearsDiff = currentDate.getFullYear() - gameReleaseDate.getFullYear();

  if (yearsDiff >= 10) {
    return "10.99€";
  } else if (yearsDiff >= 5) {
    return "20.99€";
  } else if (yearsDiff >= 3) {
    return "31.99€";
  } else if (yearsDiff >= 1) {
    return "50.99€";
  } else {
    return "60.99€";
  }
}

//Función para poner la info de la card del game del index.html en
function showGame(event, id){
  event.preventDefault();
  var game = games.find(game => game.id == id);
  localStorage.setItem('game', JSON.stringify(game))
  window.location.href = event.target.href;
}


//Función meter info de los géneros

async function fetchGenres() {
  const apiKey = '1baca15855374a6db824d20988b6f976';
  const apiUrl = `https://api.rawg.io/api/genres?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results.slice(0, 4); 
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function populateGenres() {
  const genres = await fetchGenres();
  genres.forEach((genre, index) => {
    const contenedor = document.getElementById((index + 1).toString()); 
    const imagen = contenedor.querySelector('img');
    const titulo = contenedor.querySelector('h3');

    imagen.src = genre.image_background;
    titulo.textContent = genre.name; 
  });
}

window.onload = populateGenres;