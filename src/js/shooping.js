document.addEventListener("DOMContentLoaded", function() {
    const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const listContainer = document.querySelector('.list-products');
  
    shoppingCart.forEach(item => {
      const productDiv = document.createElement('div');
      productDiv.innerHTML = `
        <div>
          <p>${item.name}</p>
          <p>${item.price}</p>
        </div>
      `;
      listContainer.appendChild(productDiv);
    });
  });