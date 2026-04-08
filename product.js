// Global cart variable
let cart = [];

// Load product details on page load
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartCount();
    
    // Get product ID from URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    
    if (productId) {
        const product = getProductById(productId);
        if (product) {
            displayProductDetail(product);
            displayRelatedProducts(product);
        } else {
            showError('Товар не найден');
        }
    } else {
        showError('ID товара не указан');
    }
});

// Display product details
function displayProductDetail(product) {
    const productDetail = document.getElementById('productDetail');
    const productName = document.getElementById('productName');
    
    productName.textContent = product.name;
    
    const isInCart = cart.some(item => item.id === product.id);
    
    productDetail.innerHTML = `
        <div class="product-detail-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-detail-info">
            <div class="product-detail-category">${product.category}</div>
            <h1>${product.name}</h1>
            <div class="product-detail-rating">⭐ ${product.rating} / 5 (${Math.floor(Math.random() * 1000) + 100} отзывов)</div>
            <div class="product-detail-price">${product.price.toLocaleString('ru-RU')} ₽</div>
            
            <div class="product-detail-description">
                <h3>Описание</h3>
                <p>${product.description}</p>
                <h3 style="margin-top: 20px;">Характеристики</h3>
                <pre style="white-space: pre-wrap; font-family: inherit; background: #f3f4f6; padding: 10px; border-radius: 4px;">${product.details}</pre>
            </div>
            
            <div class="quantity-selector">
                <label for="quantity">Количество:</label>
                <input type="number" id="quantity" min="1" value="1">
            </div>
            
            <button class="btn btn-primary btn-large ${isInCart ? 'added' : ''}" 
                    id="addToCartBtn"
                    onclick="addToCartFromDetail(${product.id})">
                ${isInCart ? '✓ Уже в корзине' : 'Добавить в корзину'}
            </button>
            <a href="index.html" class="btn btn-secondary btn-large">← Вернуться к товарам</a>
        </div>
    `;
}

// Display related products
function displayRelatedProducts(product) {
    const relatedList = document.getElementById('relatedList');
    const related = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);
    
    relatedList.innerHTML = '';
    
    related.forEach(relatedProduct => {
        const productCard = createRelatedProductCard(relatedProduct);
        relatedList.appendChild(productCard);
    });
}

// Create related product card
function createRelatedProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
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

// Add to cart from detail page
function addToCartFromDetail(productId) {
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const product = getProductById(productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartCount();
    updateDetailButtonState();
    showNotification(`${product.name} успешно добавлен в корзину!`);
}

// Add product to cart (from related products)
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
    updateRelatedButtonState(productId);
    showNotification(`${product.name} добавлен в корзину!`);
}

// Update button state for related products
function updateRelatedButtonState(productId) {
    const btn = document.querySelector(`[data-id="${productId}"]`);
    if (btn) {
        btn.classList.add('added');
        btn.textContent = '✓ В корзине';
    }
}

// Update button state for main product
function updateDetailButtonState() {
    const btn = document.getElementById('addToCartBtn');
    if (btn) {
        btn.classList.add('added');
        btn.textContent = '✓ Уже в корзине';
    }
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

// Show error message
function showError(message) {
    const productDetail = document.getElementById('productDetail');
    if (productDetail) {
        productDetail.innerHTML = `<p style="color: red; font-size: 18px;">${message}</p>`;
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
