async function loadDashboard(){

    let health = await fetch('/health');
    health = await health.json();

    document.getElementById("health").innerHTML = health.status;

    let cpu = await fetch('/cpu');
    cpu = await cpu.json();

    document.getElementById("cpu").innerHTML =
        cpu.cpu + " %";

    let memory = await fetch('/memory');
    memory = await memory.json();

    document.getElementById("memory").innerHTML =
        memory.percent + " %";

    let disk = await fetch('/disk');
    disk = await disk.json();

    document.getElementById("disk").innerHTML =
        disk.percent + " %";

    let system = await fetch('/system');
    system = await system.json();

    document.getElementById("hostname").innerHTML =
        system.hostname;

    document.getElementById("os").innerHTML =
        system.os;

    document.getElementById("release").innerHTML =
        system.release;

}

loadDashboard();

setInterval(loadDashboard,5000);