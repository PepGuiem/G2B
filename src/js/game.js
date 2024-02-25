document.addEventListener("DOMContentLoaded", function() {
  const gameData = JSON.parse(localStorage.getItem("game"));
  console.log(gameData)
  const div = document.getElementById("left");
  div.innerHTML = `
  <div class="title align-items-center d-flex"><h1 class="text-white">${gameData.name}</h1></div>
  <div class="carousel" style="background-image: url(${gameData.background_image});"></div>
  <div class="info text-white align-items-center d-flex"><ul>${gameData.platforms.map(element => `<li>${element.platform.name}</li>`).join('')}</ul></div>`;


});