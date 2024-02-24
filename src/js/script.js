document.addEventListener("DOMContentLoaded", function() {
    const API_KEY = "5686df9be51c45e0bcf75d315b3d5168";
    const GAME_URL = "https://api.rawg.io/api/games?key=" + API_KEY;
    const MAX_ROWS = 25;
    const GAMES_PER_ROW = 4;
    const MIN_RATING = 4.1;
    const TOTAL_GAMES = MAX_ROWS * GAMES_PER_ROW; // Calculamos el total de juegos a mostrar
  
    function fetchGameData(page) {
      return fetch(`${GAME_URL}&page=${page}`)
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
  
    function createCard(game) {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
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
           <button type="button" class="btn btn-warning fw-bold">PURCHASE</button>
          </div>
      `;
      return cardDiv;
    }
  
    function renderGameCards() {
      const container = document.getElementById("gameCardsContainer");
      let gamesRendered = 0; 
      let currentRow;
  
      for (let i = 0; i < MAX_ROWS; i++) {
        currentRow = document.createElement("div");
        currentRow.className = "row mt-3 mx-3";
  
        fetchGameData(i + 1)
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
  
    renderGameCards();
});

