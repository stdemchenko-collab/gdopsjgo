// Global cart variable
let cart = [];

// Load cart on page load
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartCount();
    renderCart();
    setupCheckout();
});

// Render cart items
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');
    
    if (cart.length === 0) {
        cartContent.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }
    
    cartContent.style.display = 'grid';
    emptyCart.style.display = 'none';
    
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="product-name">${item.name}</td>
            <td>${item.price.toLocaleString('ru-RU')} ₽</td>
            <td>
                <div class="cart-item-quantity">
                    <button onclick="changeQuantity(${item.id}, -1)">−</button>
                    <input type="number" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)" min="1">
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
            </td>
            <td>${(item.price * item.quantity).toLocaleString('ru-RU')} ₽</td>
            <td>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Удалить</button>
            </td>
        `;
        cartItems.appendChild(row);
    });
    
    updateTotals();
}

// Change quantity
function changeQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartCount();
            renderCart();
        }
    }
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    const quantity = parseInt(newQuantity);
    if (quantity > 0) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            saveCart();
            updateCartCount();
            renderCart();
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
    showNotification('Товар удален из корзины');
}

// Update totals
function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 5000 ? 0 : 300;
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = subtotal.toLocaleString('ru-RU') + ' ₽';
    document.getElementById('shipping').textContent = shipping.toLocaleString('ru-RU') + ' ₽';
    document.getElementById('total').textContent = total.toLocaleString('ru-RU') + ' ₽';
}

// Setup checkout
function setupCheckout() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', performCheckout);
    }
}

// Perform checkout
function performCheckout() {
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = total > 5000 ? 0 : 300;
    const finalTotal = total + shipping;
    
    const message = `
Сумма заказа: ${finalTotal.toLocaleString('ru-RU')} ₽

Товары:
${cart.map(item => `- ${item.name} x${item.quantity} = ${(item.price * item.quantity).toLocaleString('ru-RU')} ₽`).join('\n')}

Спасибо за покупку! Ваш заказ будет обработан в ближайшее время.
    `;
    
    alert(message);
    cart = [];
    saveCart();
    updateCartCount();
    renderCart();
    showNotification('Заказ успешно оформлен!');
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
