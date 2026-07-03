// ======================================
// DevOps Monitoring Dashboard
// ======================================

function getStatus(value) {

    if (value < 30)
        return "🟢 Healthy";

    if (value < 60)
        return "🟡 Normal";

    if (value < 80)
        return "🟠 Warning";

    return "🔴 Critical";

}


function setCardColor(cardId, value) {

    const card = document.getElementById(cardId);

    card.classList.remove("low", "medium", "high", "critical");

    if (value < 30)
        card.classList.add("low");

    else if (value < 60)
        card.classList.add("medium");

    else if (value < 80)
        card.classList.add("high");

    else
        card.classList.add("critical");

}


// =========================
// Dashboard
// =========================

async function loadDashboard() {

    try {

        // Health

        const health = await fetch("/health").then(r => r.json());

        document.getElementById("health").textContent = health.status;

        const healthCard = document.getElementById("health-card");

        if (health.status === "UP")
            healthCard.style.borderLeft = "8px solid #22c55e";
        else
            healthCard.style.borderLeft = "8px solid red";


        // CPU

        const cpu = await fetch("/cpu").then(r => r.json());

        document.getElementById("cpu").textContent =
            cpu.cpu.toFixed(1) + "%";

        document.getElementById("cpu-status").textContent =
            getStatus(cpu.cpu);

        document.getElementById("cpu-progress").style.width =
            cpu.cpu + "%";

        setCardColor("cpu-card", cpu.cpu);


        // Memory

        const memory = await fetch("/memory").then(r => r.json());

        document.getElementById("memory").textContent =
            memory.percent + "%";

        document.getElementById("memory-status").textContent =
            getStatus(memory.percent);

        document.getElementById("memory-progress").style.width =
            memory.percent + "%";

        setCardColor("memory-card", memory.percent);


        // Disk

        const disk = await fetch("/disk").then(r => r.json());

        document.getElementById("disk").textContent =
            disk.percent + "%";

        document.getElementById("disk-status").textContent =
            getStatus(disk.percent);

        document.getElementById("disk-progress").style.width =
            disk.percent + "%";

        setCardColor("disk-card", disk.percent);


        // System

        const system = await fetch("/system").then(r => r.json());

        document.getElementById("hostname").textContent =
            system.hostname;

        document.getElementById("os").textContent =
            system.os;

        document.getElementById("release").textContent =
            system.release;


        // Stress Status

        const stress = await fetch("/stress/status").then(r => r.json());

        const badge = document.getElementById("stress-status");

        if (stress.running) {

            badge.innerHTML = "🟢 Running";

            badge.className = "running";

        } else {

            badge.innerHTML = "⚪ Idle";

            badge.className = "idle";

        }

    }
    catch (err) {

        console.error("Dashboard Error:", err);

    }

}



// =========================
// Start Stress
// =========================

async function startStress() {

    try {

        const response = await fetch("/stress/start", {

            method: "POST"

        });

        const text = await response.text();

        console.log("Server Response:", text);

        if (!response.ok) {

            alert("Backend Error\n\n" + text);

            return;

        }

        const result = JSON.parse(text);

        alert(result.message);

        loadDashboard();

    }
    catch (err) {

        console.error(err);

        alert("Unable to start stress test.");

    }

}



// =========================
// Stop Stress
// =========================

async function stopStress() {

    try {

        const response = await fetch("/stress/stop", {

            method: "POST"

        });

        const text = await response.text();

        console.log("Server Response:", text);

        if (!response.ok) {

            alert("Backend Error\n\n" + text);

            return;

        }

        const result = JSON.parse(text);

        alert(result.message);

        loadDashboard();

    }
    catch (err) {

        console.error(err);

        alert("Unable to stop stress test.");

    }

}



// =========================
// Refresh
// =========================

loadDashboard();

setInterval(loadDashboard, 2000);