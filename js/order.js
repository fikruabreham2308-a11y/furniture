document.addEventListener('DOMContentLoaded', () => {
    loadOrderSummary();
});

function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('hossana_cart')) || [];
    const summaryContainer = document.getElementById('summary-items');
    let subtotal = 0;

    if (cart.length === 0) {
        summaryContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    summaryContainer.innerHTML = cart.map(item => {
        // Clean price string to number for calculation
        const priceNum = parseInt(item.price.replace(/[^\d]/g, ''));
        subtotal += priceNum;
        return `
            <div class="item-row">
                <span>${item.name}</span>
                <span>${item.price}</span>
            </div>
        `;
    }).join('');

    document.getElementById('subtotal').innerText = subtotal.toLocaleString() + " ETB";
    document.getElementById('grandTotal').innerText = subtotal.toLocaleString() + " ETB";
    document.getElementById('cart-count').innerText = cart.length;
}

function submitFinalOrder() {
    const name = document.getElementById('orderName').value;
    const phone = document.getElementById('orderPhone').value;
    const area = document.getElementById('orderArea').value;

    if (!name || !phone || !area) {
        alert("Please fill in all delivery details.");
        return;
    }

    // Generate Order ID
    const orderID = "HSN-" + Math.floor(100000 + Math.random() * 900000);
    document.getElementById('finalOrderID').innerText = "#" + orderID;

    // Show Success Modal
    document.getElementById('successModal').style.display = 'flex';

    // Clear Cart after order
    localStorage.removeItem('hossana_cart');
}