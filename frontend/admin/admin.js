const BASE_URL = "http://localhost:5000";

// ==========================
// ADD PROJECT
// ==========================
document.getElementById("projectForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("pname").value.trim();
    const description = document.getElementById("pdesc").value.trim();
    const image = document.getElementById("pimage").value.trim();

    if (!name || !description || !image) return alert("Please fill all project fields");

    try {
        const res = await fetch(`${BASE_URL}/api/projects`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description, image })
        });

        if (res.ok) {
            alert("Project added successfully!");
            document.getElementById("projectForm").reset();
        } else {
            alert("Failed to add project. Check backend.");
        }
    } catch (err) {
        console.error(err);
        alert("Error adding project.");
    }
});

// ==========================
// ADD CLIENT
// ==========================
document.getElementById("clientForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("cname").value.trim();
    const description = document.getElementById("cdesc").value.trim();
    const designation = document.getElementById("cdesig").value.trim();
    const image = document.getElementById("cimage").value.trim();

    if (!name || !description || !designation || !image) return alert("Please fill all client fields");

    try {
        const res = await fetch(`${BASE_URL}/api/clients`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description, designation, image })
        });

        if (res.ok) {
            alert("Client added successfully!");
            document.getElementById("clientForm").reset();
        } else {
            alert("Failed to add client. Check backend.");
        }
    } catch (err) {
        console.error(err);
        alert("Error adding client.");
    }
});

// ==========================
// LOAD CONTACTS
// ==========================
async function loadContacts() {
    try {
        const res = await fetch(`${BASE_URL}/api/contacts`);
        const data = await res.json();

        const contactsDiv = document.getElementById("contacts");
        contactsDiv.innerHTML = ""; // clear previous

        if(data.length === 0){
            contactsDiv.innerHTML = "<p>No contacts yet.</p>";
            return;
        }

        const table = document.createElement("table");
        table.innerHTML = "<tr><th>Name</th><th>Email</th><th>Mobile</th><th>City</th></tr>";

        data.forEach(c => {
            const row = table.insertRow();
            row.insertCell(0).innerText = c.fullName;
            row.insertCell(1).innerText = c.email;
            row.insertCell(2).innerText = c.mobile;
            row.insertCell(3).innerText = c.city;
        });

        contactsDiv.appendChild(table);

    } catch (err) {
        console.error(err);
        document.getElementById("contacts").innerHTML = "<p>Error loading contacts.</p>";
    }
}

// ==========================
// LOAD SUBSCRIBERS
// ==========================
async function loadSubscribers() {
    try {
        const res = await fetch(`${BASE_URL}/api/subscribers`);
        const data = await res.json();

        const subsDiv = document.getElementById("subscribers");
        subsDiv.innerHTML = ""; // clear previous

        if(data.length === 0){
            subsDiv.innerHTML = "<p>No subscribers yet.</p>";
            return;
        }

        const table = document.createElement("table");
        table.innerHTML = "<tr><th>Email</th></tr>";

        data.forEach(s => {
            const row = table.insertRow();
            row.insertCell(0).innerText = s.email;
        });

        subsDiv.appendChild(table);

    } catch (err) {
        console.error(err);
        document.getElementById("subscribers").innerHTML = "<p>Error loading subscribers.</p>";
    }
}

// ==========================
// INIT ADMIN PANEL
// ==========================
window.addEventListener("DOMContentLoaded", () => {
    loadContacts();
    loadSubscribers();
});
