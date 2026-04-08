// Global cart variable
let cart = [];

// Load cart from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    renderProducts(products);
    updateCartCount();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const filtered = getProductsByCategory(filter);
            renderProducts(filtered);
        });
    });
}

// Render products to the page
function renderProducts(productsToRender) {
    const productsList = document.getElementById('productsList');
    
    if (!productsList) return;
    
    productsList.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productsList.appendChild(productCard);
    });
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.product_id = product.id;
    
    const isInCart = cart.some(item => item.id === product.id);
    
    card.innerHTML = `
        <a href="product.html?id=${product.id}" class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </a>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <a href="product.html?id=${product.id}" style="text-decoration: none; color: inherit;">
                <h4 class="product-name">${product.name}</h4>
            </a>
            <p class="product-description">${product.description}</p>
            <div class="product-rating">⭐ ${product.rating} / 5</div>
            <div class="product-price">${product.price.toLocaleString('ru-RU')} ₽</div>
            <button class="add-to-cart-btn ${isInCart ? 'added' : ''}" 
                    data-id="${product.id}"
                    onclick="addToCart(${product.id})">
                ${isInCart ? '✓ В корзине' : 'Добавить в корзину'}
            </button>
        </div>
    `;
    
    return card;
}

// Add product to cart
function addToCart(productId) {
    const product = getProductById(productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    updateButtonState(productId);
    showNotification(`${product.name} добавлен в корзину!`);
}

// Update button state
function updateButtonState(productId) {
    const btn = document.querySelector(`[data-id="${productId}"]`);
    if (btn) {
        btn.classList.add('added');
        btn.textContent = '✓ В корзине';
    }
}

// Perform search
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query === '') {
        renderProducts(products);
        return;
    }
    
    const results = searchProducts(query);
    renderProducts(results);
}

// Update cart count in header
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #10b981;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        z-index: 1000;
        animation: slideIn 0.3s ease-in-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
