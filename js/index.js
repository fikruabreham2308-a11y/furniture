/**
 * index.js - Home Page Logic
 */

// Function to add products to the cart and save to LocalStorage
function addToCart(name, price) {
    // 1. Fetch current cart from storage or start a new list
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

    // 2. Create the product object (using a random ID for uniqueness)
    const product = {
        id: "HF-" + Math.floor(Math.random() * 9000 + 1000),
        name: name,
        price: parseInt(price),
        qty: 1
    };

    // 3. Logic: If product exists, increase quantity; otherwise, add new
    const existingIndex = cart.findIndex(item => item.name === name);
    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push(product);
    }

    // 4. Save to LocalStorage
    localStorage.setItem('cartItems', JSON.stringify(cart));

    // 5. Success Feedback & Redirect
    alert(`${name} added to your cart!`);
    window.location.href = 'cart.html'; 
}

// Function to update the number shown on the navbar cart icon
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const countElement = document.getElementById('cart-count');
    
    if (countElement) {
        // Calculate total number of items
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        countElement.innerText = totalItems;
    }
}



// Add this to index.html to show the featured item from Admin
window.onload = function() {
    const featImg = localStorage.getItem('featuredImage');
    const featName = localStorage.getItem('featuredName');
    if(featImg) {
        document.getElementById('displayFeatured').innerHTML = `
            <h2>Special Featured: ${featName}</h2>
            <img src="${featImg}" style="width:300px; border-radius:15px;">
        `;
    }
}
// Run update count every time the page loads
document.addEventListener('DOMContentLoaded', updateCartCount);

