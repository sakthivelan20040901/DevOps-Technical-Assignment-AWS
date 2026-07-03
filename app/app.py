from flask import Flask, jsonify, render_template
import psutil
import platform
import socket
from datetime import datetime

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

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
        "total": round(mem.total / (1024**3), 2),
        "used": round(mem.used / (1024**3), 2),
        "available": round(mem.available / (1024**3), 2),
        "percent": mem.percent
    })

@app.route("/disk")
def disk():
    disk = psutil.disk_usage('/')
    return jsonify({
        "total": round(disk.total / (1024**3), 2),
        "used": round(disk.used / (1024**3), 2),
        "free": round(disk.free / (1024**3), 2),
        "percent": disk.percent
    })

if __name__ == "__main__":
    app.run(debug=True)