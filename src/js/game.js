document.addEventListener("DOMContentLoaded", function() {
  const gameData = JSON.parse(localStorage.getItem("game"));
  console.log(gameData)
  const div = document.getElementById("left");
  div.innerHTML = `
  <div class="carousel1">
          <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
          ${gameData.short_screenshots.map((element, index) => (
            `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" ${index === 0 ? 'class="active" aria-current="true"' : ''} aria-label="Slide ${index + 1}"></button>`
        ))}
          </div>
          <div class="carousel-inner">
          ${gameData.short_screenshots.map((element, index) => (
            `<div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${element.image}" class="d-block w-100" alt="Segundo Proyecto">
            </div>`
        ))}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Before</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
  </div>
  <div class="info text-white align-items-center d-flex"><ul>${gameData.platforms.map(element => `<li>${element.platform.name}</li>`).join('')}</ul></div>`;

  const right = document.getElementById("right");
  right.innerHTML = `
        <div class="imagen" style="background-image:url(${gameData.background_image});"> </div>
        <div class="title align-items-center d-flex"><h1 class="text-white">${gameData.name}</h1></div>
        <div class="text-white rating">
        <p>Rating: ${gameData.rating}</p>
        <p>Released: ${gameData.released}</p>
        <p>Rating count: ${gameData.ratings_count}</p>
        </div>
        <div class="buy">
        <h2 class="text-white">${calculatePrice(gameData.rating)}</h2>
        <button type="button" class="btn btn-warning fw-bold" onclick="addToCart('${gameData.name}', '${calculatePrice(gameData.rating)}')">PURCHASE</button>
        </div>
  `;
});


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

function addToCart(gameName, gamePrice) {
  const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  shoppingCart.push({ name: gameName, price: gamePrice });
  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}
