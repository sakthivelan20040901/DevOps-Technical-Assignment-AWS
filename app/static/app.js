const MAX_DATA_POINTS = 20;
const timeLabels = Array.from({ length: MAX_DATA_POINTS }, () => "");
const cpuData = Array(MAX_DATA_POINTS).fill(0);
const memoryData = Array(MAX_DATA_POINTS).fill(0);
const diskData = Array(MAX_DATA_POINTS).fill(0);

function getStatus(value){
    if(value < 30) return "🟢 Healthy";
    if(value < 60) return "🟡 Normal";
    if(value < 80) return "🟠 Warning";
    return "🔴 Critical";
}

function setCardColor(cardId,value){
    const card=document.getElementById(cardId);
    card.classList.remove("low","medium","high","critical");
    if(value < 30) card.classList.add("low");
    else if(value < 60) card.classList.add("medium");
    else if(value < 80) card.classList.add("high");
    else card.classList.add("critical");
}

function updateChart(chart, value){
    const label = new Date().toLocaleTimeString();
    timeLabels.push(label);
    timeLabels.shift();
    chart.data.labels = [...timeLabels];

    chart.data.datasets[0].data.push(value);
    chart.data.datasets[0].data.shift();
    chart.update();
}

const cpuChart = new Chart(
    document.getElementById("cpuChart"),
    {
        type: "line",
        data: {
            labels: [...timeLabels],
            datasets: [{
                label: "CPU %",
                data: [...cpuData],
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59,130,246,0.2)",
                tension: 0.3,
                fill: true,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { min: 0, max: 100 }
            },
            plugins: {
                legend: { display: false }
            }
        }
    }
);

const memoryChart = new Chart(
    document.getElementById("memoryChart"),
    {
        type: "line",
        data: {
            labels: [...timeLabels],
            datasets: [{
                label: "Memory %",
                data: [...memoryData],
                borderColor: "#10b981",
                backgroundColor: "rgba(16,185,129,0.2)",
                tension: 0.3,
                fill: true,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { min: 0, max: 100 }
            },
            plugins: {
                legend: { display: false }
            }
        }
    }
);

const diskChart = new Chart(
    document.getElementById("diskChart"),
    {
        type: "line",
        data: {
            labels: [...timeLabels],
            datasets: [{
                label: "Disk %",
                data: [...diskData],
                borderColor: "#f59e0b",
                backgroundColor: "rgba(245,158,11,0.2)",
                tension: 0.3,
                fill: true,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { min: 0, max: 100 }
            },
            plugins: {
                legend: { display: false }
            }
        }
    }
);

async function loadDashboard(){
    try{
        const health = await (await fetch("/health")).json();
        document.getElementById("health").textContent = health.status;

        const cpu = await (await fetch("/cpu")).json();
        document.getElementById("cpu").textContent = cpu.cpu.toFixed(1)+" %";
        document.getElementById("cpu-status").textContent = getStatus(cpu.cpu);
        document.getElementById("cpu-progress").style.width = cpu.cpu+"%";
        setCardColor("cpu-card",cpu.cpu);
        updateChart(cpuChart, cpu.cpu);

        const memory = await (await fetch("/memory")).json();
        document.getElementById("memory").textContent = memory.percent+" %";
        document.getElementById("memory-status").textContent = getStatus(memory.percent);
        document.getElementById("memory-progress").style.width = memory.percent+"%";
        setCardColor("memory-card",memory.percent);
        updateChart(memoryChart, memory.percent);

        const disk = await (await fetch("/disk")).json();
        document.getElementById("disk").textContent = disk.percent+" %";
        document.getElementById("disk-status").textContent = getStatus(disk.percent);
        document.getElementById("disk-progress").style.width = disk.percent+"%";
        setCardColor("disk-card",disk.percent);
        updateChart(diskChart, disk.percent);

        const system = await (await fetch("/system")).json();
        document.getElementById("hostname").textContent = system.hostname;
        document.getElementById("os").textContent = system.os;
        document.getElementById("release").textContent = system.release;
        document.getElementById("python").textContent = system.python;
        document.getElementById("uptime").textContent = system.uptime;
        document.getElementById("public-ip").textContent = system.public_ip;
        document.getElementById("server-time").textContent = system.server_time;
        document.getElementById("flask-status").textContent = system.services.flask;
        document.getElementById("gunicorn-status").textContent = system.services.gunicorn;
        document.getElementById("nginx-status").textContent = system.services.nginx;
    }
    catch(err){
        console.error(err);
    }
}

loadDashboard();
setInterval(loadDashboard,2000);
