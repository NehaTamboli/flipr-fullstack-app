const API_BASE_URL = "https://flipr-fullstack-app-production.up.railway.app/api";

/* =====================
   FETCH PROJECTS
===================== */
fetch(`${API_BASE_URL}/projects`)
  .then(res => res.json())
  .then(data => {
    const projectsDiv = document.getElementById("projects");
    projectsDiv.innerHTML = "";

    data.forEach(project => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <button>Read More</button>
      `;

      projectsDiv.appendChild(card);
    });
  })
  .catch(err => console.error("Projects error:", err));

/* =====================
   FETCH CLIENTS
===================== */
fetch(`${API_BASE_URL}/clients`)
  .then(res => res.json())
  .then(data => {
    const clientsDiv = document.getElementById("clients");
    clientsDiv.innerHTML = "";

    data.forEach(client => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <p>${client.description}</p>
        <h4>${client.name}</h4>
        <small>${client.designation}</small>
      `;

      clientsDiv.appendChild(card);
    });
  })
  .catch(err => console.error("Clients error:", err));

/* =====================
   CONTACT FORM SUBMIT
===================== */
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    mobile: document.getElementById("mobile").value,
    city: document.getElementById("city").value,
  };

  fetch(`${API_BASE_URL}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(() => {
      alert("Contact form submitted!");
      document.getElementById("contactForm").reset();
    })
    .catch(err => console.error("Contact error:", err));
});

/* =====================
   NEWSLETTER SUBSCRIBE
===================== */
document.getElementById("subscribeBtn").addEventListener("click", function () {
  const email = document.getElementById("newsletterEmail").value;

  if (!email) {
    alert("Please enter email");
    return;
  }

  fetch(`${API_BASE_URL}/subscribers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })
    .then(res => res.json())
    .then(() => {
      alert("Subscribed successfully!");
      document.getElementById("newsletterEmail").value = "";
    })
    .catch(err => console.error("Subscribe error:", err));
});
