// ===============================
// Konfiguration
// ===============================
const BACKEND_URL = "https://python-fitness-backend.onrender.com";

// ===============================
// Elemente aus dem DOM
// ===============================
const testBtn = document.getElementById("testBtn");
const output = document.getElementById("output");

const addBtn = document.getElementById("addBtn");
const titleInput = document.getElementById("titleInput");
const categoryInput = document.getElementById("categoryInput");

// ===============================
// Backend testen
// ===============================
testBtn.addEventListener("click", async () => {
    output.textContent = "Backend wird kontaktiert...";

    try {
        const res = await fetch(BACKEND_URL);
        const data = await res.json();
        output.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
        output.textContent = "❌ Fehler beim Verbinden mit dem Backend";
        console.error(err);
    }
});

// ===============================
// Übungen laden & anzeigen
// ===============================
async function loadExercises() {
    output.textContent = "Lade Übungen...";

    try {
        const res = await fetch(`${BACKEND_URL}/exercises`);
        const exercises = await res.json();

        output.textContent = "";

        if (exercises.length === 0) {
            output.textContent = "Noch keine Übungen vorhanden.";
            return;
        }

        exercises.forEach(ex => {
            const line = document.createElement("div");
            line.textContent = `• ${ex.title} (${ex.category})`;
            output.appendChild(line);
        });
    } catch (err) {
        output.textContent = "❌ Fehler beim Laden der Übungen";
        console.error(err);
    }
}

// ===============================
// Neue Übung hinzufügen
// ===============================
addBtn.addEventListener("click", async () => {
    const title = titleInput.value.trim();
    const category = categoryInput.value.trim();

    if (!title || !category) {
        alert("Bitte Titel und Kategorie eingeben.");
        return;
    }

    const payload = {
        title: title,
        category: category,
    };

    try {
        const res = await fetch(`${BACKEND_URL}/exercises`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        titleInput.value = "";
        categoryInput.value = "";

        alert(`Übung gespeichert: ${data.title}`);

        // Liste neu laden
        loadExercises();

    } catch (err) {
        alert("❌ Fehler beim Speichern der Übung");
        console.error(err);
    }
});

// ===============================
// Beim Laden der Seite Übungen anzeigen
// ===============================
loadExercises();
