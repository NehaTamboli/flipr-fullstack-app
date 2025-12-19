// ===== Backend API Base URL =====
const API_BASE_URL = "https://flipr-fullstack-app-production.up.railway.app/api";

// ===== Utility function to fetch and log data =====
async function fetchData(endpoint, label) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log(`${label}:`, data);
    } catch (err) {
        console.error(`Error fetching ${label}:`, err);
    }
}

// ===== Fetch all APIs =====
fetchData("projects", "Projects");
fetchData("clients", "Clients");
fetchData("contacts", "Contacts");
fetchData("subscribers", "Subscribers");

// ===== Optional: Display on the page =====
function displayDataOnPage(label, data) {
    const container = document.createElement("div");
    container.innerHTML = `<h3>${label}</h3><pre>${JSON.stringify(data, null, 2)}</pre>`;
    document.body.appendChild(container);
}

// Example: Fetch projects and display on page
fetch(`${API_BASE_URL}/projects`)
    .then(res => res.json())
    .then(data => displayDataOnPage("Projects", data))
    .catch(err => console.error(err));
