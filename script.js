const Products = [
    { id: 1, name: 'Rolex Submariner', price: 7999 },
    { id: 2, name: 'Patek Philippe Nautilus ', price: 10999 },
    { id: 3, name: 'Omega Speedmaster ', price:4999 },
    { id: 4, name: 'Audemars Piguet Royal Oak', price: 8999 },
];

let cart = [];

// Render the products list
function renderProducts() {
    const productList = document.getElementById('products');
    productList.innerHTML = '';

    Products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
        <span>${product.name} ($${product.price})</span>
        <div>
          <button class="remove" onclick="updateCart(${product.id}, -1)">-</button>
          <span id="quantity-${product.id}">0</span>
          <button class="add" onclick="updateCart(${product.id}, 1)">+</button>
        </div>
      `;
        productList.appendChild(li);
    });
}

// Render the cart
function renderCart() {
    const cartProducts = document.getElementById('cart-products');
    const totalPrice = document.getElementById('total-price');

    // Clear the current cart display
    cartProducts.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'No Product added to the cart';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.color = '#6b7280';
        cartProducts.appendChild(emptyMessage);
        totalPrice.textContent = 'Total Price: $0';
        return;
    }

    cart.forEach(item => {
        const product = Products.find(p => p.id === item.id);
        total += product.price * item.quantity;

        const li = document.createElement('li');
        li.innerHTML = `${product.name} (x${item.quantity}) - $${product.price * item.quantity}`;
        cartProducts.appendChild(li);
    });

    totalPrice.textContent = `Total Price: $${total}`;
}

// Update cart functionality
function updateCart(productId, change) {
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex >= 0) {
        cart[productIndex].quantity += change;

        if (cart[productIndex].quantity <= 0) {
            cart.splice(productIndex, 1);
        }
    } else if (change > 0) {
        cart.push({ id: productId, quantity: 1 });
    }

    const productQuantity = document.getElementById(`quantity-${productId}`);
    const cartProduct = cart.find(item => item.id === productId);
    productQuantity.textContent = cartProduct ? cartProduct.quantity : 0;

    renderCart();
}

// Initialize the application
function init() {
    renderProducts();
    renderCart();
}

init();
