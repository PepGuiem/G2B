document.addEventListener("DOMContentLoaded", function() {
    const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const listContainer = document.querySelector('.list-products');
    const priceElement = document.getElementById("price");
    const clearElement = document.getElementById("clear");
    var totalPrice = 0;
    shoppingCart.forEach(item => {
      totalPrice = totalPrice + parseFloat(item.price);
      const productDiv = document.createElement('div');
      productDiv.innerHTML = `
          <p>${item.name}</p>
          <p>${item.price}</p>
      `;
      listContainer.appendChild(productDiv);
    });
    priceElement.innerHTML = "Total :  " + totalPrice.toFixed(2) + "€";

    clearElement.addEventListener("click", () => {
      localStorage.setItem('shoppingCart', JSON.stringify([]));
      location.reload();
    });
  });