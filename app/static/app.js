function getStatus(value){

    if(value < 30) return "🟢 Healthy";

    if(value < 60) return "🟡 Normal";

    if(value < 80) return "🟠 Warning";

    return "🔴 Critical";

}


function setCardColor(cardId,value){

    const card=document.getElementById(cardId);

    card.classList.remove("low","medium","high","critical");

    if(value < 30)
        card.classList.add("low");

    else if(value < 60)
        card.classList.add("medium");

    else if(value < 80)
        card.classList.add("high");

    else
        card.classList.add("critical");

}


async function loadDashboard(){

    try{

        const health = await (await fetch("/health")).json();

        document.getElementById("health").textContent =
            health.status;



        const cpu = await (await fetch("/cpu")).json();

        document.getElementById("cpu").textContent =
            cpu.cpu.toFixed(1)+" %";

        document.getElementById("cpu-status").textContent =
            getStatus(cpu.cpu);

        document.getElementById("cpu-progress").style.width =
            cpu.cpu+"%";

        setCardColor("cpu-card",cpu.cpu);



        const memory = await (await fetch("/memory")).json();

        document.getElementById("memory").textContent =
            memory.percent+" %";

        document.getElementById("memory-status").textContent =
            getStatus(memory.percent);

        document.getElementById("memory-progress").style.width =
            memory.percent+"%";

        setCardColor("memory-card",memory.percent);



        const disk = await (await fetch("/disk")).json();

        document.getElementById("disk").textContent =
            disk.percent+" %";

        document.getElementById("disk-status").textContent =
            getStatus(disk.percent);

        document.getElementById("disk-progress").style.width =
            disk.percent+"%";

        setCardColor("disk-card",disk.percent);



        const system = await (await fetch("/system")).json();

        document.getElementById("hostname").textContent =
            system.hostname;

        document.getElementById("os").textContent =
            system.os;

        document.getElementById("release").textContent =
            system.release;

    }

    catch(err){

        console.error(err);

    }

}


loadDashboard();

setInterval(loadDashboard,2000);