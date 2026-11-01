// Sample Cart Data (In a real app, this comes from LocalStorage)
let cart = [
    { name: "Executive Sofa", price: 25000, qty: 1 },
    { name: "Wooden Dining Table", price: 18000, qty: 1 }
];

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

function renderCart() {
    const tableBody = document.getElementById('cart-table-body');
    if (cart.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center">Your cart is empty</td></tr>';
        return;
    }

    tableBody.innerHTML = cart.map((item, index) => `
        <tr>
            <td><strong>${item.name}</strong></td>
            <td>${item.price} ETB</td>
            <td>${item.qty}</td>
            <td>${item.price * item.qty} ETB</td>
            <td><button onclick="removeItem(${index})" style="border:none; color:red; cursor:pointer; background:none"><i class="fas fa-trash"></i></button></td>
        </tr>
    `).join('');
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

function clearCart() {
    cart = [];
    renderCart();
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.checkout-step').forEach(s => s.style.display = 'none');
    
    // Show target section
    document.getElementById(sectionId).style.display = 'block';

    // Update Progress bar visuals
    const sections = ['cart-section', 'info-section', 'payment-section', 'review-section'];
    const stepNum = sections.indexOf(sectionId) + 1;
    
    for(let i=1; i<=4; i++) {
        const el = document.getElementById('st' + i);
        if(i <= stepNum) el.classList.add('active');
        else el.classList.remove('active');
    }

    // If review page, populate data
    if(sectionId === 'review-section') prepareReview();
}

function prepareReview() {
    document.getElementById('rev-name').innerText = document.getElementById('cust-name').value || "N/A";
    document.getElementById('rev-phone').innerText = document.getElementById('cust-phone').value || "N/A";
    document.getElementById('rev-location').innerText = document.getElementById('cust-city').value;
    document.getElementById('rev-addr').innerText = document.getElementById('cust-address').value;
    
    const payMethod = document.querySelector('input[name="payment"]:checked').value;
    document.getElementById('rev-pay').innerText = payMethod;

    // Calculate Total
    let total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    document.getElementById('rev-total').innerText = total + " ETB";

    document.getElementById('rev-items').innerHTML = cart.map(item => 
        `<p style="display:flex; justify-content:space-between"><span>${item.name} x${item.qty}</span> <span>${item.price * item.qty} ETB</span></p>`
    ).join('');
}

function placeOrder() {
    const orderId = Math.floor(1000 + Math.random() * 9000);
    document.getElementById('final-order-id').innerText = orderId;
    document.getElementById('success-modal').style.display = 'flex';
}