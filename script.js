const btn = document.getElementById("testBtn");
const output = document.getElementById("output");

const BACKEND_URL = "https://python-fitness-backend.onrender.com\n" +
    "\n";

btn.addEventListener("click", async () => {
    output.textContent = "Backend wird kontaktiert...";

    try {
        const response = await fetch(BACKEND_URL);
        const data = await response.json();

        output.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        output.textContent = "❌ Fehler beim Verbinden mit dem Backend";
        console.error(error);
    }
});
