// Function to switch pages
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');

    if(pageId === 'reports') {
        renderChart();
    }
}

// Data Arrays (Simulated)
let demoPayments = [
    {id: 'OR-1001', name: 'Abebe Yosef', amount: '45,000', txn: 'TXN_9921', status: 'Pending', addr: 'Addis Ababa'}
];

// Initialize UI
window.onload = () => {
    loadData();
    updateStats();
};

function loadData() {
    const pTable = document.getElementById('paymentTable');
    pTable.innerHTML = demoPayments.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.amount} ETB</td>
            <td>${p.txn}</td>
            <td><a href="#">View</a></td>
            <td>${p.addr}</td>
            <td><span style="color:orange">${p.status}</span></td>
            <td>
                <button onclick="alert('Approved')" style="color:green; border:none; background:none; cursor:pointer;">Approve</button>
            </td>
        </tr>
    `).join('');
}

function updateStats() {
    // Setting dummy numbers for visualization
    document.getElementById('ordTotal').innerText = "124";
    document.getElementById('delDone').innerText = "85";
    document.getElementById('repDone').innerText = "85";
    document.getElementById('repCash').innerText = "12,400";
}

// Chart Logic
let myChart = null;
function renderChart() {
    const ctx = document.getElementById('opsChart').getContext('2d');
    
    if (myChart) myChart.destroy(); // Prevent duplicate charts

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Assigned', 'Pending', 'In Transit', 'On Delivery', 'Delivered', 'Canceled'],
            datasets: [{
                label: 'Delivery Status Count',
                data: [12, 19, 3, 5, 85, 2], // Real data would come from your DB
                backgroundColor: [
                    '#00acc1', '#fb8c00', '#fdd835', '#43a047', '#1e88e5', '#e53935'
                ],
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}