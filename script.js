const form = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");
const total = document.getElementById("total");
const successRate = document.getElementById("successRate");

let jobs = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const company = document.getElementById("company").value;
  const role = document.getElementById("role").value;
  const status = document.getElementById("status").value;

  const job = { company, role, status };
  jobs.push(job);

  renderJobs();
  updateStats();

  form.reset();
});

function renderJobs() {
  jobList.innerHTML = "";
  jobs.forEach((job, index) => {
    const card = document.createElement("div");
    card.className = `job-card ${job.status === "Offer" ? "success" : job.status === "Rejected" ? "reject" : ""}`;
    card.innerHTML = `
      <div>
        <h3>${job.company}</h3>
        <p>${job.role}</p>
        <span>Status: ${job.status}</span>
      </div>
      <button onclick="deleteJob(${index})">🗑 Delete</button>
    `;
    jobList.appendChild(card);
  });
}

function deleteJob(index) {
  jobs.splice(index, 1);
  renderJobs();
  updateStats();
}

function updateStats() {
  total.textContent = jobs.length;
  const offers = jobs.filter(j => j.status === "Offer").length;
  const rate = jobs.length ? Math.round((offers / jobs.length) * 100) : 0;
  successRate.textContent = rate + "%";
}
