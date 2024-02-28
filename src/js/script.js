const MAX_ROWS = 25;
const GAMES_PER_ROW = 4;
const TOTAL_GAMES = MAX_ROWS * GAMES_PER_ROW; 
const API_KEY = "78631e57d2f04a009a24fb2ae423e716";
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
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
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
  // Crear el contenedor principal de la tarjeta
  const cardDiv1 = document.createElement('div');
  cardDiv1.classList.add('card');

  // Crear la imagen de la tarjeta
  const cardImg = document.createElement('img');
  cardImg.classList.add('card-img-top');
  cardImg.setAttribute('src', game.background_image);
  cardImg.setAttribute('alt', 'Card image cap');
  cardImg.setAttribute('width', '262');
  cardImg.setAttribute('height', '186');
  cardDiv1.appendChild(cardImg);

  // Crear el cuerpo de la tarjeta
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardListGroup = document.createElement('ul');
  cardListGroup.classList.add('list-group', 'list-group-flush');
  // Añadir el título de la tarjeta

  const cardTitle = document.createElement('li');
  cardTitle.classList.add('list-group-item');
  cardTitle.textContent = game.name;
  cardListGroup.appendChild(cardTitle);

  // Añadir el texto de precio a la tarjeta
  const cardText = document.createElement('li');
  cardText.classList.add('list-group-item');
  cardText.textContent = `Price: ${calculatePrice(game.released)}`;
  cardListGroup.appendChild(cardText);

  // Añadir la lista de grupos de la tarjeta


  // Añadir el rating a la tarjeta
  const cardRating = document.createElement('li');
  cardRating.classList.add('list-group-item');
  cardRating.textContent = `Rating: ${game.rating}`;
  cardListGroup.appendChild(cardRating);

  // Añadir la fecha de lanzamiento a la tarjeta
  const cardReleased = document.createElement('li');
  cardReleased.classList.add('list-group-item');
  cardReleased.textContent = `Released: ${game.released}`;
  cardListGroup.appendChild(cardReleased);

  // Añadir la lista de grupos a la tarjeta
  cardDiv1.appendChild(cardListGroup);

  // Añadir el segundo cuerpo de la tarjeta
  const cardSecondBody = document.createElement('div');
  cardSecondBody.classList.add('card-body');

  // Añadir el botón de compra a la tarjeta
  const purchaseButton = document.createElement('button');
  purchaseButton.classList.add('btn', 'btn-warning', 'fw-bold');
  purchaseButton.setAttribute('type', 'button');
  purchaseButton.textContent = 'PURCHASE';
  purchaseButton.addEventListener('click', () => addToCart(game.name, price));
  cardSecondBody.appendChild(purchaseButton);

  // Añadir el botón de vista a la tarjeta
  const viewButton = document.createElement('button');
  viewButton.classList.add('btn', 'btn-primary');
  viewButton.setAttribute('type', 'button');
  viewButton.textContent = 'View';
  viewButton.addEventListener('click', () => showGame(game.id));
  cardSecondBody.appendChild(viewButton);

  // Añadir el segundo cuerpo a la tarjeta
  cardDiv1.appendChild(cardSecondBody);

// Añadir la tarjeta al contenedor principal
document.body.appendChild(cardDiv1);
  return cardDiv1;
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

function showGame(id){
  var game = games.find(game => game.id == id);
  localStorage.setItem('game', JSON.stringify(game))
  window.location.href = "./game";
}

function addToCart(gameName, gamePrice) {
  const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  shoppingCart.push({ name: gameName, price: gamePrice });
  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}

//Función meter info de los géneros

async function fetchGenres() {
  const apiKey = '78631e57d2f04a009a24fb2ae423e716';
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