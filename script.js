// Sample products
const products = [
    {
        id: 1,
        name: 'T-Shirt',
        price: 19.99,
        image: 'assets/Images/winter.jpg'
    },
    {
        id: 2,
        name: 'Jeans',
        price: 49.99,
        image: 'assets/Images/image2.jpg'
    },
    {
        id: 3,
        name: 'Jacket',
        price: 89.99,
        image: 'assets/Images/8.jpg'
    },
    {
        id: 4,
        name: 'Dress',
        price: 69.99,
        image: 'assets/Images/8.jpg'
    },
    {
        id: 5,
        name: 'Sneakers',
        price: 79.99,
        image: 'assets/Images/8.jpg'
    },
    {
        id: 6,
        name: 'Hat',
        price: 24.99,
        image: 'assets/Images/8.jpg'
    }
];

// DOM elements
const productGrid = document.querySelector('.product-grid');
const cartCount = document.querySelector('.cart-count');
const cartModal = document.querySelector('.cart-modal');
const checkoutModal = document.querySelector('.checkout-modal');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalAmount = document.getElementById('cart-total-amount');
const checkoutBtn = document.getElementById('checkout-btn');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

let cart = [];

// Render products
function renderProducts() {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(prod => prod.id === productId);
    cart.push(product);
    updateCart();
}

// Update cart
function updateCart() {
    cartCount.textContent = cart.length;
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name}</p>
            <p>$${item.price.toFixed(2)}</p>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price;
    });

    cartTotalAmount.textContent = total.toFixed(2);
}

// Event listeners
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.dataset.id, 10);
        addToCart(productId);
    }
});

checkoutBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
    checkoutModal.style.display = 'flex';
});

// Open and close modals
document.querySelector('.cart-icon').addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-modal')) {
        cartModal.style.display = 'none';
    }

    if (e.target.classList.contains('checkout-modal')) {
        checkoutModal.style.display = 'none';
    }
});

// Mega Menu functionality
const productLink = document.querySelector('.nav-links li:nth-child(2) > a');
const megaMenu = document.querySelector('.mega-menu');

productLink.addEventListener('mouseenter', () => {
    megaMenu.style.display = 'block';
});

megaMenu.addEventListener('mouseleave', () => {
    megaMenu.style.display = 'none';
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
        navLinks.classList.remove('active');
    }
});

// Initialize
renderProducts();