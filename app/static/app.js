// ================================
// DevOps Monitoring Dashboard
// ================================

// Return status text based on percentage
function getStatus(value){

    if(value < 30)
        return "🟢 Healthy";

    if(value < 60)
        return "🟡 Normal";

    if(value < 80)
        return "🟠 Warning";

    return "🔴 Critical";

}


// Change card color based on value
function setCardColor(cardId,value){

    const card=document.getElementById(cardId);

    card.classList.remove(
        "low",
        "medium",
        "high",
        "critical"
    );

    if(value < 30){

        card.classList.add("low");

    }
    else if(value < 60){

        card.classList.add("medium");

    }
    else if(value < 80){

        card.classList.add("high");

    }
    else{

        card.classList.add("critical");

    }

}


// ================================
// Load Dashboard
// ================================

async function loadDashboard(){

    try{

        // Health

        const health = await (await fetch("/health")).json();

        document.getElementById("health").innerHTML = health.status;

        const healthCard=document.getElementById("health-card");

        if(health.status==="UP"){

            healthCard.style.borderLeft="8px solid #22c55e";

        }else{

            healthCard.style.borderLeft="8px solid red";

        }



        // CPU

        const cpu = await (await fetch("/cpu")).json();

        document.getElementById("cpu").innerHTML =
            cpu.cpu.toFixed(1)+" %";

        document.getElementById("cpu-status").innerHTML =
            getStatus(cpu.cpu);

        document.getElementById("cpu-progress").style.width =
            cpu.cpu+"%";

        setCardColor("cpu-card",cpu.cpu);



        // Memory

        const memory = await (await fetch("/memory")).json();

        document.getElementById("memory").innerHTML =
            memory.percent+" %";

        document.getElementById("memory-status").innerHTML =
            getStatus(memory.percent);

        document.getElementById("memory-progress").style.width =
            memory.percent+"%";

        setCardColor("memory-card",memory.percent);



        // Disk

        const disk = await (await fetch("/disk")).json();

        document.getElementById("disk").innerHTML =
            disk.percent+" %";

        document.getElementById("disk-status").innerHTML =
            getStatus(disk.percent);

        document.getElementById("disk-progress").style.width =
            disk.percent+"%";

        setCardColor("disk-card",disk.percent);



        // System

        const system = await (await fetch("/system")).json();

        document.getElementById("hostname").innerHTML =
            system.hostname;

        document.getElementById("os").innerHTML =
            system.os;

        document.getElementById("release").innerHTML =
            system.release;



        // Stress Status

        const stress = await (await fetch("/stress/status")).json();

        const badge=document.getElementById("stress-status");

        if(stress.running){

            badge.innerHTML="🟢 Running";

            badge.className="running";

        }
        else{

            badge.innerHTML="⚪ Idle";

            badge.className="idle";

        }

    }
    catch(err){

        console.error(err);

    }

}



// ================================
// Start Stress Test
// ================================

async function startStress(){

    try{

        const response=await fetch("/stress/start",{

            method:"POST"

        });

        const result=await response.json();

        alert(result.message);

        loadDashboard();

    }
    catch(err){

        console.error(err);

        alert("Unable to start stress test.");

    }

}



// ================================
// Stop Stress Test
// ================================

async function stopStress(){

    try{

        const response=await fetch("/stress/stop",{

            method:"POST"

        });

        const result=await response.json();

        alert(result.message);

        loadDashboard();

    }
    catch(err){

        console.error(err);

        alert("Unable to stop stress test.");

    }

}



// ================================
// Auto Refresh
// ================================

loadDashboard();

setInterval(loadDashboard,2000);