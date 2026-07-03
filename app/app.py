from flask import Flask, jsonify, render_template
import psutil
import platform
import socket
import subprocess
import os
from datetime import datetime

app = Flask(__name__)


# -------------------------
# Helper Functions
# -------------------------

def is_stress_running():
    """Check if stress process is currently running."""
    try:
        result = subprocess.run(
            ["pgrep", "-f", "stress"],
            capture_output=True,
            text=True
        )
        return result.returncode == 0
    except Exception:
        return False


# -------------------------
# Routes
# -------------------------

@app.route("/")
def home():
    return render_template("index.html")


@app.route('/favicon.ico')
def favicon():
    return ('', 204)


@app.route("/health")
def health():

    return jsonify({
        "status": "UP",
        "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })


@app.route("/system")
def system():

    return jsonify({
        "hostname": socket.gethostname(),
        "os": platform.system(),
        "release": platform.release(),
        "processor": platform.processor()
    })


@app.route("/cpu")
def cpu():

    return jsonify({
        "cpu": psutil.cpu_percent(interval=1)
    })


@app.route("/memory")
def memory():

    mem = psutil.virtual_memory()

    return jsonify({
        "total": round(mem.total / (1024 ** 3), 2),
        "used": round(mem.used / (1024 ** 3), 2),
        "available": round(mem.available / (1024 ** 3), 2),
        "percent": mem.percent
    })


@app.route("/disk")
def disk():

    d = psutil.disk_usage("/")

    return jsonify({
        "total": round(d.total / (1024 ** 3), 2),
        "used": round(d.used / (1024 ** 3), 2),
        "free": round(d.free / (1024 ** 3), 2),
        "percent": d.percent
    })


# -------------------------
# Stress Status
# -------------------------

@app.route("/stress/status")
def stress_status():

    return jsonify({
        "running": is_stress_running()
    })


# -------------------------
# Start Stress Test
# -------------------------

@app.route("/stress/start", methods=["POST"])
def start_stress():

    if is_stress_running():

        return jsonify({
            "message": "Stress Test Already Running"
        })

    try:

        subprocess.Popen([
            "/usr/bin/stress",
            "--cpu", "2",
            "--vm", "2",
            "--vm-bytes", "512M",
            "--hdd", "1",
            "--timeout", "60"
        ])

        return jsonify({
            "message": "Stress Test Started Successfully"
        })

    except Exception as e:

        return jsonify({
            "message": "Unable to Start Stress Test",
            "error": str(e)
        }), 500


# -------------------------
# Stop Stress Test
# -------------------------

@app.route("/stress/stop", methods=["POST"])
def stop_stress():

    try:

        subprocess.run(["pkill", "-f", "stress"])

        return jsonify({
            "message": "Stress Test Stopped"
        })

    except Exception as e:

        return jsonify({
            "message": "Unable to Stop Stress Test",
            "error": str(e)
        }), 500


# -------------------------
# Main
# -------------------------

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )