'use strict';

// element toggle function
const elementToggleFunc = function (elem) { if(elem) elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    const title = this.querySelector("[data-testimonials-title]");
    const text = this.querySelector("[data-testimonials-text]");
    if (title && modalTitle) modalTitle.innerHTML = title.innerHTML;
    if (text && modalText) modalText.innerHTML = text.innerHTML;
    testimonialsModalFunc();
  });
}

// add click event to modal close button
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase().trim();
    if (selectValue) selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// add event in all filter button items for large screen
if (filterBtn.length > 0) {
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase().trim();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.innerText.toLowerCase().trim();

    for (let j = 0; j < pages.length; j++) {
      if (targetPage === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// Interactive DevOps CLI Terminal Logic
function handleTerminalInput(e) {
  if (e.key === 'Enter') {
    const inputEl = document.getElementById('cliInput');
    if (!inputEl) return;
    const command = inputEl.value.trim();
    if (command) {
      executeCommand(command);
      inputEl.value = '';
    }
  }
}

function executeCommand(cmd) {
  const terminalConsole = document.getElementById('terminalConsole');
  if (!terminalConsole) return;

  const cmdLine = document.createElement('div');
  cmdLine.className = 'cmd-line';
  cmdLine.innerHTML = `<span class="terminal-prompt">paras@devops-cluster:~$</span> <span>${escapeHtml(cmd)}</span>`;
  terminalConsole.appendChild(cmdLine);

  const output = document.createElement('div');
  output.className = 'terminal-output';

  const cleanCmd = cmd.toLowerCase().trim();

  switch (cleanCmd) {
    case 'help':
      output.innerText = `Available commands:
  status       - Check Kubernetes cluster & cloud system health
  skills       - Print Senior DevOps technical stack
  projects     - List featured DevOps & DevSecOps repositories
  pipeline     - Show CI/CD pipeline step status
  whoami       - Display DevOps Engineer bio
  uptime       - Show system SLA uptime metrics
  contact      - Display contact links & email
  clear        - Clear terminal screen`;
      break;

    case 'status':
    case 'run status':
      output.innerText = `[✔] AWS EKS Production Cluster: HEALTHY (12/12 Nodes Online)
[✔] CI/CD Pipeline (Jenkins/ArgoCD): IDLE / READY
[✔] DevSecOps Security: SonarQube & Trivy Gates PASSED
[✔] Telemetry Stack: VictoriaMetrics & Grafana Alerting ONLINE (100+ Servers)`;
      break;

    case 'skills':
    case 'run skills':
      output.innerText = `[Cloud & IaC]       AWS (EKS, EC2, S3, IAM, VPC), Terraform, Ansible, GCP
[Containers]        Docker, Kubernetes (EKS), Helm, ArgoCD, Microservices
[CI/CD & Security]  Jenkins, GitHub Actions, SonarQube, Trivy, Git
[Observability]     Prometheus, Grafana, VictoriaMetrics, Linux (Ubuntu/RHEL)`;
      break;

    case 'projects':
    case 'run projects':
      output.innerText = `1. Netflix Clone — DevSecOps Pipeline (Jenkins, SonarQube, Trivy, K8s)
2. Zomato Clone — DevOps Pipeline & Helm
3. BookMyShow — AWS EKS & GitHub Actions
4. Blue-Green Zero Downtime Deployment Strategy
5. Amazon Clone — DevSecOps & Security Audit
6. EKS Cluster — Terraform IaC Automation`;
      break;

    case 'pipeline':
    case 'run pipeline':
      output.innerText = `Pipeline Execution Status:
Step 01: Git Source Event    [PASSED - 2s]
Step 02: Build & Unit Test   [PASSED - 14s]
Step 03: SonarQube & Trivy   [PASSED - 8s]
Step 04: Docker Container    [PASSED - 10s]
Step 05: ArgoCD K8s Deploy   [PASSED - 5s]
Step 06: Grafana Telemetry   [OPERATIONAL]`;
      break;

    case 'whoami':
      output.innerText = `Paras Kumar — Senior DevOps Engineer & Cloud Architect (New Delhi, India)
3+ Years IT Experience | 2+ Years Dedicated DevOps Engineering`;
      break;

    case 'uptime':
      output.innerText = `Target SLA: 99.99% Infrastructure Availability
Current Cluster Uptime: 99.998% (No active incidents)`;
      break;

    case 'contact':
    case 'run contact':
      output.innerText = `Email: paraskumar116255@gmail.com
Phone: +91 9582416078
Location: New Delhi, India
GitHub: https://github.com/Paras116255
LinkedIn: https://www.linkedin.com/in/paras-kumar-7285931a2/`;
      break;

    case 'clear':
      terminalConsole.innerHTML = '';
      return;

    default:
      output.innerText = `Command not recognized: '${cmd}'. Type 'help' to see list of valid commands.`;
  }

  terminalConsole.appendChild(output);
  terminalConsole.scrollTop = terminalConsole.scrollHeight;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
