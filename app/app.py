from flask import Flask, render_template, jsonify
import psutil
import platform
import socket
import subprocess
import requests
import time
from datetime import datetime

app = Flask(__name__)

# Store application start time
START_TIME = time.time()


def get_service_status(service_name):
    """
    Return systemd service status.
    """
    try:
        result = subprocess.run(
            ["systemctl", "is-active", service_name],
            capture_output=True,
            text=True,
            timeout=2
        )

        status = result.stdout.strip()

        if status == "active":
            return "Running"

        return "Stopped"

    except Exception:
        return "Unknown"


def get_public_ip():
    """
    Return EC2 public IP.
    """
    try:
        return requests.get(
            "https://checkip.amazonaws.com",
            timeout=2
        ).text.strip()

    except Exception:
        return "Unavailable"


def get_uptime():

    seconds = int(time.time() - START_TIME)

    days = seconds // 86400
    seconds %= 86400

    hours = seconds // 3600
    seconds %= 3600

    minutes = seconds // 60

    if days > 0:
        return f"{days} Days {hours} Hours"

    if hours > 0:
        return f"{hours} Hours {minutes} Minutes"

    return f"{minutes} Minutes"


def get_cpu_metrics():
    return {
        "cpu": psutil.cpu_percent(interval=0.5)
    }


def get_memory_metrics():
    memory = psutil.virtual_memory()
    return {
        "percent": memory.percent,
        "used": round(memory.used / (1024 ** 3), 2),
        "total": round(memory.total / (1024 ** 3), 2)
    }


def get_disk_metrics():
    disk = psutil.disk_usage("/")
    return {
        "percent": disk.percent,
        "used": round(disk.used / (1024 ** 3), 2),
        "total": round(disk.total / (1024 ** 3), 2)
    }


def get_system_metrics():
    return {
        "hostname": socket.gethostname(),
        "os": platform.system(),
        "release": platform.release(),
        "python": platform.python_version(),
        "uptime": get_uptime(),
        "server_time": datetime.now().strftime("%d-%m-%Y %H:%M:%S"),
        "public_ip": get_public_ip(),
        "services": {
            "flask": "Running",
            "gunicorn": get_service_status("flaskapp"),
            "nginx": get_service_status("nginx")
        }
    }


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/cpu")
def cpu():
    return jsonify(get_cpu_metrics())


@app.route("/memory")
def memory():
    return jsonify(get_memory_metrics())


@app.route("/disk")
def disk():
    return jsonify(get_disk_metrics())


@app.route("/system")
def system():
    return jsonify(get_system_metrics())


@app.route("/dashboard")
def dashboard():

    cpu = psutil.cpu_percent(interval=0.5)

    memory = psutil.virtual_memory()

    disk = psutil.disk_usage("/")

    data = {

        "health": "UP",

        "cpu": cpu,

        "memory": {
            "percent": memory.percent,
            "used": round(memory.used / (1024 ** 3), 2),
            "total": round(memory.total / (1024 ** 3), 2)
        },

        "disk": {
            "percent": disk.percent,
            "used": round(disk.used / (1024 ** 3), 2),
            "total": round(disk.total / (1024 ** 3), 2)
        },

        "system": {

            "hostname": socket.gethostname(),

            "os": platform.system(),

            "release": platform.release(),

            "python": platform.python_version(),

            "uptime": get_uptime(),

            "server_time": datetime.now().strftime("%d-%m-%Y %H:%M:%S"),

            "public_ip": get_public_ip()

        },

        "services": {

            "flask": "Running",

            "gunicorn": get_service_status("flaskapp"),

            "nginx": get_service_status("nginx")

        }

    }

    return jsonify(data)


@app.route("/health")
def health():
    return jsonify({
        "status": "UP"
    })


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )