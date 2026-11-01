// Sample data for testing if localStorage is empty
let cart = JSON.parse(localStorage.getItem('cart')) || [
    { name: "Luxury Sofa", price: 25000, qty: 1 },
    { name: "Coffee Table", price: 8000, qty: 1 }
];

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

// Function to switch between Checkout sections
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.checkout-step').forEach(sec => sec.style.display = 'none');
    
    // Show selected section
    document.getElementById(sectionId).style.display = 'block';

    // Update Progress Bar
    updateProgress(sectionId);
}

function updateProgress(sectionId) {
    const steps = { 'cart-section': 1, 'info-section': 2, 'payment-section': 3 };
    const currentStep = steps[sectionId];

    document.querySelectorAll('.step').forEach((step, index) => {
        if (index < currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

function renderCart() {
    const tbody = document.getElementById('cart-table-body');
    tbody.innerHTML = "";
    let totalAll = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        totalAll += itemTotal;
        tbody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.price} ETB</td>
                <td>${item.qty}</td>
                <td>${itemTotal} ETB</td>
                <td><button onclick="removeItem(${index})" style="background:none; color:red; cursor:pointer;">X</button></td>
            </tr>
        `;
    });
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    renderCart();
}

function placeOrder() {
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;
    const payment = document.querySelector('input[name="payment"]:checked').value;

    if (!name || !phone || !address) {
        alert("Please fill in all shipping details.");
        return;
    }

    // Generate Order Summary in Modal
    let total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const summary = `
        <p><strong>Customer:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Payment Method:</strong> ${payment}</p>
        <hr>
        <p><strong>Total Paid: ${total} ETB</strong></p>
    `;

    document.getElementById('order-summary-details').innerHTML = summary;
    document.getElementById('success-modal').style.display = 'flex';
    
    // Optional: Clear cart after order
    localStorage.removeItem('cart');
}