const anfrageFormular = document.getElementById("coaching-form");
const angebot = document.getElementById("coaching-offer");
const trainingsziel = document.getElementById("coaching-goal");
const erfahrung = document.getElementById("coaching-experience");
const zeitProWoche = document.getElementById("coaching-time");

const vorschau = document.getElementById("coaching-preview");
const nachricht = document.getElementById("coaching-message");
const vorschauTitel = document.getElementById("coaching-preview-title");
const whatsappButton = document.getElementById("coaching-send");
const whatsappKontakt = document.getElementById("coaching-direct");

anfrageFormular.hidden = false;

document.querySelectorAll("[data-coaching-offer]").forEach((link) => {
    link.addEventListener("click", () => {
        angebot.value = link.dataset.coachingOffer;
        vorschau.hidden = true;
    });
});

anfrageFormular.addEventListener("input", () => {
    trainingsziel.setCustomValidity("");
    vorschau.hidden = true;
});

anfrageFormular.addEventListener("submit", (event) => {
    event.preventDefault();

    const ziel = trainingsziel.value.trim();
    if (!ziel) {
        trainingsziel.setCustomValidity("Bitte gib ein Trainingsziel ein.");
        trainingsziel.reportValidity();
        return;
    }

    const zeilen = [
        "Hallo Ivan, ich interessiere mich für dein Coaching.",
        "",
        "Angebot: " + angebot.selectedOptions[0].textContent,
        "Trainingsziel: " + ziel,
    ];

    if (erfahrung.value) {
        zeilen.push("Trainingserfahrung: " + erfahrung.value);
    }

    const zeit = zeitProWoche.value.trim();
    if (zeit) {
        zeilen.push("Zeit pro Woche: " + zeit);
    }

    const text = zeilen.join("\n");
    const url = new URL(whatsappKontakt.href);
    url.searchParams.set("text", text);

    nachricht.textContent = text;
    whatsappButton.href = url.toString();
    vorschau.hidden = false;
    vorschauTitel.focus();
});
