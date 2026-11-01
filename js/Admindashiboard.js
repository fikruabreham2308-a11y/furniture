// Database Arrays
let products = [];
let users = [];
let orders = [
    {id: 'ORD-101', customer: 'Abebe B.', product: 'Laptop Pro', status: 'Pending'},
    {id: 'ORD-102', customer: 'Sara K.', product: 'Smartphone G5', status: 'Shipped'}
];

let editUserIndex = -1;
let salesChartInstance = null; // Track chart to prevent overlap

// --- NAVIGATION ---
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
    
    // Trigger specific logic when page opens
    if(pageId === 'inventory') renderInventory();
    if(pageId === 'orders') renderOrders();
    if(pageId === 'reports') initSalesReport();
}

// --- USER MANAGEMENT ---
function addUser() {
    const user = {
        name: document.getElementById('username').value,
        email: document.getElementById('email').value,
        role: document.getElementById('role').value,
        phone: document.getElementById('phone').value
    };

    if (editUserIndex === -1) {
        users.push(user);
    } else {
        users[editUserIndex] = user;
        editUserIndex = -1;
        document.querySelector('#users .btn-add').innerText = "Add User";
    }

    renderUsers();
    updateStats();
    clearInputs(['username', 'email', 'password', 'phone', 'address']);
}

function renderUsers() {
    const tbody = document.getElementById('userTable');
    tbody.innerHTML = "";
    users.forEach((u, i) => {
        tbody.innerHTML += `
            <tr>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td><strong>${u.role}</strong></td>
                <td>${u.phone}</td>
                <td>
                    <button class="btn-edit" onclick="editUser(${i})">Edit</button>
                    <button class="btn-remove" onclick="removeUser(${i})">Remove</button>
                </td>
            </tr>`;
    });
}

function editUser(i) {
    const u = users[i];
    document.getElementById('username').value = u.name;
    document.getElementById('email').value = u.email;
    document.getElementById('role').value = u.role;
    document.getElementById('phone').value = u.phone;
    editUserIndex = i;
    document.querySelector('#users .btn-add').innerText = "Update User";
}

function removeUser(i) {
    users.splice(i, 1);
    renderUsers();
    updateStats();
}

// --- PRODUCT & PROMOTION ---
function addProduct() {
    const fileInput = document.getElementById('pimage');
    const name = document.getElementById('pname').value;
    const price = document.getElementById('pprice').value;

    if(!name || !price) { alert("Please enter name and price"); return; }

    const reader = new FileReader();
    reader.onload = function(e) {
        const product = {
            id: document.getElementById('pid').value,
            name: name,
            price: price,
            category: document.getElementById('pcategory').value,
            quality: document.getElementById('pquality').value,
            status: document.getElementById('pstatus').value,
            image: e.target.result // Base64 string for persistent display
        };
        products.push(product);
        renderProducts();
        updateStats();
        clearInputs(['pid', 'pname', 'pprice', 'pimage']);
    };

    if(fileInput.files[0]) {
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        // Fallback if no image uploaded
        products.push({
            id: document.getElementById('pid').value,
            name: name,
            price: price,
            category: document.getElementById('pcategory').value,
            quality: document.getElementById('pquality').value,
            status: document.getElementById('pstatus').value,
            image: 'https://via.placeholder.com/50'
        });
        renderProducts();
        updateStats();
    }
}

function renderProducts() {
    const tbody = document.getElementById('productTable');
    tbody.innerHTML = "";
    products.forEach((p, i) => {
        tbody.innerHTML += `
            <tr>
                <td><img src="${p.image}" width="40" height="40" style="object-fit:cover; border-radius:5px;"></td>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>${p.price} ETB</td>
                <td>${p.status}</td>
                <td><button class="btn-remove" onclick="removeProduct(${i})">Delete</button></td>
                <td><button class="btn-feature" onclick="promoteToHome(${i})">🌟 Feature</button></td>
            </tr>`;
    });
}

function promoteToHome(index) {
    const p = products[index];
    localStorage.setItem('feat_img', p.image);
    localStorage.setItem('feat_name', p.name);
    localStorage.setItem('feat_price', p.price);
    alert(p.name + " is now promoted to the index page!");
}

function removeProduct(i) {
    products.splice(i, 1);
    renderProducts();
    updateStats();
}

// --- INVENTORY MANAGEMENT ---
function renderInventory() {
    const tbody = document.getElementById('inventoryTable');
    tbody.innerHTML = "";
    if(products.length === 0) {
        tbody.innerHTML = "<tr><td colspan='5' style='text-align:center'>No products in stock</td></tr>";
        return;
    }
    products.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>${Math.floor(Math.random() * 20) + 5} Units</td> <td>${p.quality}</td>
                <td><span style="color: green;">● Healthy</span></td>
            </tr>`;
    });
}

// --- ORDER MANAGEMENT ---
function renderOrders() {
    const tbody = document.getElementById('orderTable');
    tbody.innerHTML = "";
    orders.forEach((o, i) => {
        tbody.innerHTML += `
            <tr>
                <td>${o.id}</td>
                <td>${o.customer}</td>
                <td>${o.product}</td>
                <td><span class="status-badge">${o.status}</span></td>
                <td><button class="btn-remove" onclick="cancelOrder(${i})">Cancel</button></td>
            </tr>`;
    });
}

function cancelOrder(i) {
    orders.splice(i, 1);
    renderOrders();
    updateStats();
}

// --- REPORTS (CHART.JS) ---
function initSalesReport() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    
    if(salesChartInstance) salesChartInstance.destroy(); // Clear old chart

    salesChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Sales Revenue (ETB)',
                data: [1200, 1900, 800, 1500, 2500, 3200, 1100],
                backgroundColor: '#0056b3'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// --- HELPERS ---
function updateStats() {
    document.getElementById('statUsers').innerText = users.length;
    document.getElementById('statProducts').innerText = products.length;
    document.getElementById('statOrders').innerText = orders.length;
    document.getElementById('statRevenue').innerText = products.reduce((sum, p) => sum + parseFloat(p.price || 0), 0);
}

function clearInputs(ids) {
    ids.forEach(id => document.getElementById(id).value = "");
}

// Set initial page
window.onload = () => showPage('dashboard');