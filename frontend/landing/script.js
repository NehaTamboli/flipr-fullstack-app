// ==========================
// Landing Page Script
// ==========================

// Set your backend URL (keep localhost for now)
const BASE_URL = "https://flipr-fullstack-app-production.up.railway.app";


// ==========================
// PROJECTS SECTION
// ==========================
async function loadProjects() {
  try {
    const res = await fetch(`${BASE_URL}/api/projects`);
    const data = await res.json();

    const div = document.getElementById("projects");
    div.innerHTML = ""; // Clear previous content

    data.forEach(p => {
      // Ensure filenames in uploads folder match exactly (no spaces)
      div.innerHTML += `
        <div class="card">
          <img src="${BASE_URL}/uploads/${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <button>Read More</button>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error loading projects:", error);
    document.getElementById("projects").innerHTML = "<p>Failed to load projects.</p>";
  }
}

// ==========================
// CLIENTS SECTION
// ==========================
async function loadClients() {
  try {
    const res = await fetch(`${BASE_URL}/api/clients`);
    const data = await res.json();

    const div = document.getElementById("clients");
    div.innerHTML = ""; // Clear previous content

    data.forEach(c => {
      // Ensure filenames in uploads folder match exactly (no spaces)
      div.innerHTML += `
        <div class="card">
          <img src="${BASE_URL}/uploads/${c.image}" alt="${c.name}">
          <p>${c.description}</p>
          <strong>${c.name}</strong><br>
          <small>${c.designation}</small>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error loading clients:", error);
    document.getElementById("clients").innerHTML = "<p>Failed to load clients.</p>";
  }
}

// ==========================
// CONTACT FORM SUBMISSION
// ==========================
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const city = document.getElementById("city").value.trim();

  if (!fullName || !email || !mobile || !city) {
    return alert("Please fill all fields.");
  }

  try {
    const res = await fetch(`${BASE_URL}/api/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, mobile, city })
    });

    if (res.ok) {
      alert("Contact submitted successfully!");
      document.getElementById("contactForm").reset();
    } else {
      alert("Failed to submit contact. Try again.");
    }
  } catch (error) {
    console.error("Contact form error:", error);
    alert("Error submitting contact form.");
  }
});

// ==========================
// NEWSLETTER SUBSCRIPTION
// ==========================
document.getElementById("subscribeBtn").addEventListener("click", async () => {
  const emailVal = document.getElementById("newsletterEmail").value.trim();

  if (!emailVal) return alert("Enter a valid email");

  try {
    const res = await fetch(`${BASE_URL}/api/subscribers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailVal })
    });

    if (res.ok) {
      alert("Subscribed successfully!");
      document.getElementById("newsletterEmail").value = "";
    } else {
      alert("Failed to subscribe. Try again.");
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    alert("Error subscribing to newsletter.");
  }
});

// ==========================
// INIT FUNCTION
// ==========================
function initLandingPage() {
  loadProjects();
  loadClients();
}

// Call init on page load
window.addEventListener("DOMContentLoaded", initLandingPage);
