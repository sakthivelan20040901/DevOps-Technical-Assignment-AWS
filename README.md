# DevOps Technical Assignment – AWS CI/CD Monitoring Dashboard

> A production-ready Flask application deployed on AWS EC2 using Nginx, Gunicorn, GitHub Actions CI/CD, CloudWatch monitoring, SNS alerts, and automated backup scripts.

---

# 🚀 Project Overview

This project demonstrates a complete DevOps workflow by deploying a Python Flask application to AWS using modern DevOps practices.

The application displays real-time system monitoring information such as CPU, Memory, Disk utilization, System Information, and Application Health through an interactive dashboard.

The complete deployment is fully automated using GitHub Actions, while AWS CloudWatch continuously monitors the infrastructure and sends notifications using Amazon SNS.

---

# 📌 Objectives

* Build a Python Flask Monitoring Dashboard
* Deploy the application on AWS EC2
* Configure Gunicorn as WSGI server
* Configure Nginx as Reverse Proxy
* Automate deployment using GitHub Actions
* Monitor EC2 using CloudWatch Agent
* Configure CloudWatch Alarms
* Send Email Notifications using SNS
* Automate backups using Cron Jobs
* Store backups in Amazon S3

---

# 🏗 Architecture

```text
                Developer
                     │
                     │ Push Code
                     ▼
              GitHub Repository
                     │
                     ▼
            GitHub Actions CI/CD
                     │
               SSH Deployment
                     ▼
         AWS EC2 Ubuntu Server
         ┌──────────────────────┐
         │       Nginx          │
         │ Reverse Proxy        │
         └──────────┬───────────┘
                    │
                    ▼
            Gunicorn WSGI Server
                    │
                    ▼
             Flask Application
                    │
                    ▼
          Monitoring Dashboard
                    │
                    ▼
         CloudWatch Agent
                    │
                    ▼
          Amazon CloudWatch
                    │
                    ▼
             SNS Email Alerts

         Backup Script (Cron)
                    │
                    ▼
               Amazon S3
```

---

# 🛠 Technologies Used

| Category        | Technology                   |
| --------------- | ---------------------------- |
| Programming     | Python 3                     |
| Framework       | Flask                        |
| Web Server      | Gunicorn                     |
| Reverse Proxy   | Nginx                        |
| Cloud           | AWS EC2                      |
| Monitoring      | CloudWatch                   |
| Notification    | SNS                          |
| Storage         | Amazon S3                    |
| CI/CD           | GitHub Actions               |
| Version Control | Git                          |
| Linux           | Ubuntu 24.04                 |
| Scheduler       | Cron                         |
| Dashboard       | HTML CSS JavaScript Chart.js |

---

# 📂 Project Structure

```text
DevOps-Technical-Assignment-AWS/

│
├── app/
│   ├── app.py
│   ├── requirements.txt
│   ├── templates/
│   │      └── index.html
│   ├── static/
│   │      ├── style.css
│   │      └── app.js
│   └── venv/
│
├── scripts/
│   ├── backup.sh
│   └── restore.sh
│
├── backups/
│
├── .github/
│   └── workflows/
│        └── deploy.yml
│
├── README.md
│
└── screenshots/
```

---

# ⚙ Features

## Application

* Flask Web Application
* Dashboard UI
* Responsive Design
* Real-time Monitoring
* Chart.js Live Charts
* Health API

---

## Monitoring

* CPU Usage
* Memory Usage
* Disk Usage
* Hostname
* OS Information
* Kernel Version
* Python Version
* System Uptime

---

## Deployment

* GitHub Repository
* GitHub Actions
* Automatic Deployment
* Zero Manual Upload

---

## Infrastructure

* Ubuntu EC2
* Gunicorn
* Nginx
* Systemd Service

---

## Monitoring

* CloudWatch Agent
* CPU Monitoring
* Memory Monitoring
* Disk Monitoring
* CloudWatch Dashboard

---

## Notifications

* SNS Topic
* Email Alerts
* CloudWatch Alarm

---

## Backup

* Daily Backup Script
* Cron Job
* Amazon S3 Upload

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/DevOps-Technical-Assignment-AWS.git

cd DevOps-Technical-Assignment-AWS
```

---

## Create Virtual Environment

```bash
python3 -m venv venv
```

Activate

```bash
source venv/bin/activate
```

---

## Install Packages

```bash
pip install -r requirements.txt
```

---

## Run Flask

```bash
python app.py
```

Application

```
http://localhost:5000
```

---

# AWS Deployment

## Install Packages

```bash
sudo apt update

sudo apt install nginx python3-pip python3-venv git -y
```

---

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/DevOps-Technical-Assignment-AWS.git
```

---

## Create Virtual Environment

```bash
python3 -m venv venv

source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Configure Gunicorn

Example

```bash
gunicorn --workers 3 --bind 127.0.0.1:8000 app:app
```

---

## Configure Nginx

Reverse proxy

```
80
↓

Nginx

↓

Gunicorn

↓

Flask
```

---

## Restart Services

```bash
sudo systemctl restart flaskapp

sudo systemctl restart nginx
```

---

# CI/CD Pipeline

Workflow

```text
Developer Push

↓

GitHub Actions

↓

Checkout Code

↓

SSH into EC2

↓

Pull Latest Code

↓

Install Dependencies

↓

Restart Gunicorn

↓

Restart Nginx

↓

Deployment Complete
```

---

# CloudWatch Monitoring

Metrics

* CPU Utilization
* Memory Usage
* Disk Usage

Dashboard

* CPU Graph
* Memory Graph
* Disk Graph

---

# CloudWatch Alarm

Trigger

```
CPU > 70%
```

Actions

```
SNS Notification

↓

Email Alert
```

---

# Backup Automation

Backup Script

```bash
backup.sh
```

Cron

```bash
0 2 * * * /home/ubuntu/scripts/backup.sh
```

Upload

```
Backup

↓

Amazon S3
```

---

# Security

* SSH Authentication
* IAM Role
* Security Groups
* Reverse Proxy
* Systemd Service
* Least Privilege Access

---

# Screenshots

Include screenshots of:

* Dashboard Home
* GitHub Repository
* GitHub Actions Success
* EC2 Instance
* Nginx Status
* Gunicorn Status
* CloudWatch Dashboard
* CloudWatch Alarm
* SNS Email
* S3 Bucket
* Backup Script
* Cron Job
* Terminal Commands

---

# Learning Outcomes

This project demonstrates practical experience with:

* Linux Administration
* AWS EC2
* Git
* GitHub Actions
* CI/CD Pipeline
* Flask Deployment
* Gunicorn
* Nginx
* CloudWatch
* SNS
* S3
* Cron Jobs
* Monitoring
* Infrastructure Automation

---

# Future Improvements

* Docker Containerization
* Kubernetes Deployment
* Terraform Infrastructure
* Ansible Automation
* HTTPS using Let's Encrypt
* AWS Load Balancer
* Auto Scaling Group
* AWS CodeDeploy
* AWS CodePipeline
* Prometheus Integration
* Grafana Dashboard
* AWS X-Ray Monitoring

---

# Author

**Sakthi Velan**

DevOps Engineer Candidate

* GitHub: `https://github.com/YOUR_USERNAME`
* LinkedIn: `https://linkedin.com/in/YOUR_PROFILE`

---

# License

This project was developed as part of a **DevOps Technical Assignment** to demonstrate practical knowledge of AWS, CI/CD, monitoring, and automation.

---

## ⭐ If you found this project useful, consider giving the repository a star on GitHub.