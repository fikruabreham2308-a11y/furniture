// Image Gallery Logic
function updateImg(element) {
    const mainImg = document.getElementById('mainImage');
    mainImg.src = element.src;

    // Reset all thumbs
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    // Set active thumb
    element.classList.add('active');
}

// Shopping Cart Logic
function addToCart() {
    let count = parseInt(localStorage.getItem('cartQty') || 0);
    localStorage.setItem('cartQty', count + 1);
    updateCartDisplay();
}

function updateCartDisplay() {
    const display = document.getElementById('cart-count');
    if (display) {
        display.innerText = localStorage.getItem('cartQty') || 0;
    }
}

// Initialize on Load
window.onload = updateCartDisplay;