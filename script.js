document.addEventListener('DOMContentLoaded', () => {
    const cartItems = [];

    // Function to render cart items on the cart page
    function renderCartOnCartPage() {
        const cartItemsContainer = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');

        cartItemsContainer.innerHTML = ''; // Clear existing items

        let totalPrice = 0;

        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - Quantity: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
            cartItemsContainer.appendChild(li);

            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }

    // Function to render product cards on the home page
    function renderProductCards() {
        const productContainer = document.querySelector('.product-container');

        // Simulated product data
        const products = [
            { id: 1, name: 'Mobile Model 1', price: 15000 },
            { id: 2, name: 'Mobile Model 2', price: 13000 },
            { id: 3, name: 'Mobile Model 3', price: 13000 },
        ];

        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');

            const image = document.createElement('img');
            image.src = `mobile${product.id}.jpg`;
            image.alt = `Mobile Model ${product.id}`;

            const title = document.createElement('div');
            title.classList.add('product-title');
            title.textContent = product.name;

            const price = document.createElement('div');
            price.classList.add('product-price');
            price.textContent = `$${product.price.toFixed(2)}`;

            const detailsLink = document.createElement('a');
            detailsLink.classList.add('details-link');
            detailsLink.href = `/product/mobile${product.id}.html`;
            detailsLink.textContent = 'View Details';

            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Add to Cart';
            addToCartButton.dataset.itemId = product.id;
            addToCartButton.dataset.itemName = product.name;
            addToCartButton.dataset.itemPrice = product.price.toFixed(2);
            addToCartButton.addEventListener('click', addToCart);

            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(price);
            card.appendChild(detailsLink);
            card.appendChild(addToCartButton);

            productContainer.appendChild(card);
        });
    }

    // Function to handle "Add to Cart" button clicks
    function addToCart() {
        const itemId = parseInt(this.dataset.itemId);
        const itemName = this.dataset.itemName;
        const itemPrice = parseFloat(this.dataset.itemPrice);

        const newItem = {
            id: itemId,
            name: itemName,
            price: itemPrice,
            quantity: 1,
        };

        const existingItemIndex = cartItems.findIndex(item => item.id === itemId);

        if (existingItemIndex !== -1) {
            cartItems[existingItemIndex].quantity += 1;
        } else {
            cartItems.push(newItem);
        }

        renderCartOnCartPage();
    }

    // Initial render on page load
    renderCartOnCartPage();

    // Render product cards on the home page
    renderProductCards();
});
// Define the API endpoint
const apiUrl = 'https://mobileapplication.onrender/user-register';

// Data to be sent (this could be an object, JSON, etc.)
const requestData = {
  key1: 'value1',
  key2: 'value2'
};

// Make a POST request to send data
fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // Specify the content type if sending JSON data
    // Additional headers if needed
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  },
  body: JSON.stringify(requestData) // Convert data to JSON format
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parse the response if expecting JSON
  })
  .then(data => {
    console.log('Data sent successfully:', data);
    // Handle the response data here
  })
  .catch(error => {
    console.error('Error sending data:', error);
    // Handle errors here
  });
