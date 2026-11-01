// Mock Data
let tasks = [
    {id: 'OR-901', customer: 'Fikru A.', amount: 15000, status: 'Assigned', address: 'Hosaina Center'},
    {id: 'OR-902', customer: 'Mulugeta B.', amount: 8500, status: 'Pick Up', address: 'Hosaina West'},
    {id: 'OR-903', customer: 'Abebe C.', amount: 5000, status: 'In Transit', address: 'Hosaina East'}
];
let deliveredHistory = [];

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    
    document.getElementById(pageId).classList.remove('hidden');
    document.getElementById('nav-' + pageId).classList.add('active');

    if(pageId === 'reports') {
        initReports();
    }
}

function updateTaskStatus(id, newStatus) {
    const idx = tasks.findIndex(t => t.id === id);
    if(newStatus === 'Delivered') {
        let item = tasks.splice(idx, 1)[0];
        item.status = 'Delivered';
        item.date = new Date().toLocaleDateString();
        deliveredHistory.push(item);
    } else {
        tasks[idx].status = newStatus;
    }
    renderUI();
}

function renderUI() {
    // 1. Update Stats
    document.getElementById('countAssigned').innerText = tasks.length + deliveredHistory.length;
    document.getElementById('countDelivered').innerText = deliveredHistory.length;
    document.getElementById('countTransit').innerText = tasks.filter(t => t.status === 'In Transit').length;
    
    const total = deliveredHistory.reduce((s, i) => s + i.amount, 0);
    document.getElementById('totalValue').innerText = total + " ETB";
    
    const rate = (tasks.length + deliveredHistory.length) > 0 
        ? Math.round((deliveredHistory.length / (tasks.length + deliveredHistory.length)) * 100) : 0;
    document.getElementById('successRate').innerText = rate + "%";

    // 2. Render Tables
    document.getElementById('assignedBody').innerHTML = tasks.map(t => `
        <tr>
            <td>${t.id}</td><td>${t.customer}</td><td>${t.amount} ETB</td>
            <td><span style="color:var(--warning); font-weight:bold;">${t.status}</span></td><td>${t.address}</td>
            <td>
                <button class="btn btn-blue" onclick="updateTaskStatus('${t.id}', 'Pick Up')">Pick Up</button>
                <button class="btn btn-orange" onclick="updateTaskStatus('${t.id}', 'In Transit')">Transit</button>
                <button class="btn btn-green" onclick="updateTaskStatus('${t.id}', 'Delivered')">Delivered</button>
            </td>
        </tr>
    `).join('');

    document.getElementById('deliveredBody').innerHTML = deliveredHistory.map(d => `
        <tr><td>${d.id}</td><td>${d.customer}</td><td>${d.amount} ETB</td><td>${d.date}</td><td>${d.address}</td></tr>
    `).join('');
}

// Charts Management
let statusChart, lineChart;

function initReports() {
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    const lineCtx = document.getElementById('lineChart').getContext('2d');

    if(statusChart) statusChart.destroy();
    if(lineChart) lineChart.destroy();

    // Bar Chart
    statusChart = new Chart(statusCtx, {
        type: 'bar',
        data: {
            labels: ['Assigned', 'Success', 'Transit', 'Canceled'],
            datasets: [{
                label: 'Orders',
                data: [tasks.length + deliveredHistory.length, deliveredHistory.length, tasks.filter(t=>t.status==='In Transit').length, 0],
                backgroundColor: ['#007bff', '#2ecc71', '#f39c12', '#e74c3c']
            }]
        }
    });

    // Line Chart (Trends)
    lineChart = new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Deliveries Completed',
                data: [2, 5, 3, 8, 4, 10, deliveredHistory.length],
                borderColor: '#007bff',
                tension: 0.3,
                fill: true,
                backgroundColor: 'rgba(0, 123, 255, 0.1)'
            }]
        }
    });
}

window.onload = () => {
    renderUI();
    document.getElementById('currentDate').innerText = new Date().toDateString();
};