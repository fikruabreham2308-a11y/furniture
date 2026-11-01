// 1. Product Database
const furnitureItems = [
    { id: 101, name: "Luxury Leather Sofa", price: 28000, category: "Sofa", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" },
    { id: 102, name: "Handmade Oak Bed", price: 35000, category: "Beds", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400" },
    { id: 103, name: "Classic Office Desk", price: 12500, category: "Office", img: "https://images.unsplash.com/photo-1518455027359-f3f816b1a238?w=400" },
    { id: 104, name: "Ergonomic Chair", price: 8900, category: "Chairs", img: "https://images.unsplash.com/photo-1505797149-45ebcb97a6f3?w=400" },
    { id: 105, name: "Marble Coffee Table", price: 15000, category: "Tables", img: "https://images.unsplash.com/photo-1530018607912-eff2df114fbe?w=400" }
];

// 2. Initial Setup
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(furnitureItems);
    updateCartCount();

    // Event Listeners
    document.getElementById('categoryFilter').addEventListener('change', filterItems);
    document.getElementById('priceFilter').addEventListener('change', filterItems);
    document.getElementById('productSearch').addEventListener('input', filterItems);
});

// 3. Filter Logic
function filterItems() {
    const category = document.getElementById('categoryFilter').value;
    const priceRange = document.getElementById('priceFilter').value;
    const search = document.getElementById('productSearch').value.toLowerCase();

    const filtered = furnitureItems.filter(item => {
        const matchCat = category === 'all' || item.category === category;
        const matchSearch = item.name.toLowerCase().includes(search);
        
        let matchPrice = true;
        if (priceRange === 'low') matchPrice = item.price < 10000;
        if (priceRange === 'mid') matchPrice = item.price >= 10000 && item.price <= 30000;
        if (priceRange === 'high') matchPrice = item.price > 30000;

        return matchCat && matchSearch && matchPrice;
    });

    renderProducts(filtered);
}

// 4. Render to UI
function renderProducts(products) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}" class="product-img">
            <div style="padding-top:10px">
                <h4>${p.name}</h4>
                <p style="color:var(--primary); font-weight:800; margin:5px 0;">${p.price.toLocaleString()} ETB</p>
                <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// 5. Auto-Increment Cart Function
function addToCart(id) {
    const item = furnitureItems.find(p => p.id === id);
    let cart = JSON.parse(localStorage.getItem('hossana_cart')) || [];
    
    // Add item (converts price to string for your cart page logic)
    cart.push({
        name: item.name,
        price: item.price.toLocaleString() + " ETB",
        img: item.img
    });

    localStorage.setItem('hossana_cart', JSON.stringify(cart));
    
    // Refresh count on UI
    updateCartCount();
    
    // Toast notification
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('hossana_cart')) || [];
    const countBadge = document.getElementById('cart-count');
    if (countBadge) countBadge.innerText = cart.length;
}