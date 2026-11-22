const equipmentNamen = {
    hanteln: "Kurzhanteln",
    band: "Miniband",
    kettlebell: "Kettlebell",
    stuhl: "stabiler Stuhl",
    kabel: "Kabelzug",
    rad: "Ergometer",
};

const workoutArten = {
    flexibility: {
        name: "Flexibility",
        stationsMinuten: 2,
        takt: "Bewege oder dehne dich 60 Sek. in einem angenehmen Bereich. Bei einseitigen Übungen je 30 Sek. pro Seite. Die nächsten 60 Sek. sind für Pause und Wechsel.",
        uebungen: [
            { name: "90/90-Hüftwechsel", hinweis: "Setz dich aufrecht hin und lass die Knie langsam von einer Seite zur anderen sinken." },
            { name: "Hüftbeuger-Dehnung im Halbkniestand", hinweis: "Richte das Becken auf und lass die Arme locker." },
            { name: "Beinrückseite im Sitzen dehnen", hinweis: "Streck ein Bein aus und neige dich aus der Hüfte leicht nach vorne." },
            { name: "Wadendehnung im Schrittstand", hinweis: "Lass die hintere Ferse am Boden und beuge das vordere Knie leicht." },
            { name: "Seitliche Gewichtsverlagerung im breiten Stand", hinweis: "Wechsle langsam die Seite und beuge jeweils ein Knie." },
            { name: "Schmetterlingssitz", hinweis: "Bring die Fußsohlen zusammen und lass die Knie locker sinken." },
            { name: "Hüftdehnung im Sitzen (Figure Four)", equipment: "stuhl", hinweis: "Leg einen Knöchel aufs andere Knie und neige dich bei Bedarf leicht vor." },
            { name: "Schulterkreise im Stand", schulter: true, hinweis: "Kreise langsam mit den Schultern, die Arme bleiben locker." },
            { name: "Brustwirbelsäulen-Rotation in Seitenlage", schulter: true, hinweis: "Führe den oberen Arm langsam zur Gegenseite und zurück." },
        ],
    },
    metcon: {
        name: "Metabolic Conditioning",
        stationsMinuten: 1,
        takt: "Bewege dich je Station 35 Sek. in einem Tempo, bei dem du noch sprechen kannst. Danach 25 Sek. locker gehen oder pausieren.",
        uebungen: [
            { name: "Zügig auf der Stelle marschieren", hinweis: "Heb die Füße im gleichmäßigen Rhythmus an." },
            { name: "Seitliche Schritte", hinweis: "Geh abwechselnd zwei Schritte nach links und rechts." },
            { name: "Kniebeuge mit Wadenheben", hinweis: "Komm aus der Kniebeuge hoch und heb dann kurz die Fersen." },
            { name: "Rückwärts-Taps", hinweis: "Tipp mit einem Fuß hinter dir auf den Boden und wechsle die Seite." },
            { name: "Vorwärts- und Rückwärtsschritte", hinweis: "Geh zwei kleine Schritte vor und zwei zurück." },
            { name: "Seitliche Schritte mit Miniband", equipment: "band", hinweis: "Leg das Band über die Knie und halte die Schritte klein." },
            { name: "Aufstehen und Hinsetzen", equipment: "stuhl", hinweis: "Steh kontrolliert auf und setz dich wieder ab." },
            { name: "Radfahren im Wechseltempo", equipment: "rad", hinweis: "Tritt zügig und stell den Widerstand so ein, dass das Tempo kontrolliert bleibt." },
            { name: "Step Jacks mit Armheben", schulter: true, hinweis: "Setz einen Fuß seitlich auf und heb dabei die Arme kontrolliert an." },
            { name: "Kettlebell-Kreuzheben", equipment: "kettlebell", schulter: true, hinweis: "Nutze ein leichtes Gewicht und arbeite in ruhigem Rhythmus." },
        ],
    },
    pump: {
        name: "Pump",
        stationsMinuten: 2,
        takt: "Mach je Station 8–12 kontrollierte Wiederholungen in bis zu 40 Sek. Teile einseitige Sätze auf beide Seiten auf. Pausiere für den Rest der 2 Minuten.",
        uebungen: [
            { name: "Kniebeugen", hinweis: "Geh so tief, wie du die Bewegung kontrollieren kannst." },
            { name: "Glute Bridge", hinweis: "Leg dich auf den Rücken, lass die Arme locker und heb das Becken kontrolliert an." },
            { name: "Wadenheben im Stand", hinweis: "Heb die Fersen langsam und senk sie kontrolliert ab." },
            { name: "Rückwärts-Ausfallschritte", hinweis: "Geh abwechselnd mit einem Bein nach hinten." },
            { name: "Hüftbeuge im Stand", hinweis: "Schieb die Hüfte bei leicht gebeugten Knien nach hinten und richte dich wieder auf." },
            { name: "Seitliche Schritte mit Miniband", equipment: "band", hinweis: "Leg das Band knapp über die Knie und halte Spannung über beide Schritt­richtungen." },
            { name: "Aufstehen und Hinsetzen", equipment: "stuhl", hinweis: "Nutz einen stabilen Stuhl und senk dich langsam ab." },
            { name: "Liegestütz an der Wand", schulter: true, hinweis: "Führe die Bewegung langsam und mit angenehmem Abstand zur Wand aus." },
            { name: "Kurzhantel-Rudern", equipment: "hanteln", schulter: true, hinweis: "Zieh die Ellenbogen kontrolliert nach hinten." },
            { name: "Kurzhantel-Seitheben", equipment: "hanteln", schulter: true, hinweis: "Nutze leichte Gewichte und heb die Arme kontrolliert seitlich an." },
            { name: "Goblet Squat", equipment: "kettlebell", schulter: true, hinweis: "Halte die Kettlebell nah am Körper und beweg dich kontrolliert." },
            { name: "Rudern am Kabelzug", equipment: "kabel", schulter: true, hinweis: "Zieh die Ellenbogen nach hinten und lass das Gewicht langsam zurück." },
        ],
    },
};

function istUebung(uebung) {
    return uebung
        && typeof uebung.name === "string" && uebung.name.trim().length > 0
        && typeof uebung.hinweis === "string" && uebung.hinweis.trim().length > 0
        && (uebung.equipment == null || Object.hasOwn(equipmentNamen, uebung.equipment))
        && (uebung.schulter === undefined || typeof uebung.schulter === "boolean");
}

function istVollstaendigeListe(uebungen) {
    if (!Array.isArray(uebungen) || !uebungen.every(istUebung)) {
        return false;
    }

    const namen = new Set(uebungen.map((uebung) => uebung.name));
    const ohneEquipment = uebungen.filter((uebung) => !uebung.equipment);
    return namen.size === uebungen.length
        && ohneEquipment.filter((uebung) => !uebung.schulter).length >= 3
        && ohneEquipment.some((uebung) => uebung.schulter);
}

async function ladeUebungskatalog() {
    const lokal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
    const apiBasis = lokal ? "http://127.0.0.1:8000" : BACKEND_URL;

    try {
        const response = await fetch(`${apiBasis}/workout-exercises`, {
            signal: AbortSignal.timeout(12000),
        });
        if (!response.ok) {
            return;
        }

        const katalog = await response.json();
        for (const [art, workout] of Object.entries(workoutArten)) {
            if (istVollstaendigeListe(katalog?.[art])) {
                workout.uebungen = katalog[art];
            }
        }
    } catch {
        // Der Generator kann die mitgelieferte Übungsliste verwenden.
    }
}

function zufallsauswahl(uebungen, anzahl) {
    const verfuegbar = [...uebungen];
    const auswahl = [];

    for (let i = 0; i < anzahl && verfuegbar.length > 0; i++) {
        const index = Math.floor(Math.random() * verfuegbar.length);
        const [uebung] = verfuegbar.splice(index, 1);
        auswahl.push(uebung);
    }

    return auswahl;
}

function erstelleWorkout(art, dauer, mitSchulter, equipment) {
    const workout = workoutArten[art];
    const aufwaermen = Math.max(2, Math.floor(dauer * 0.15));
    const ausklang = Math.max(1, Math.floor(dauer * 0.1));
    const hauptteil = dauer - aufwaermen - ausklang;
    const stationen = Math.floor(hauptteil / workout.stationsMinuten);
    const passendeUebungen = workout.uebungen.filter((uebung) =>
        (mitSchulter || !uebung.schulter) && (!uebung.equipment || equipment.includes(uebung.equipment))
    );
    const anzahl = Math.min(stationen, passendeUebungen.length, 5, Math.max(3, Math.ceil(stationen / 3)));
    const auswahl = [];

    if (mitSchulter) {
        const schulterUebungen = passendeUebungen.filter((uebung) => uebung.schulter);
        const mitEquipment = schulterUebungen.filter((uebung) => uebung.equipment);
        auswahl.push(...zufallsauswahl(mitEquipment.length ? mitEquipment : schulterUebungen, 1));
    }

    if (!auswahl.some((uebung) => uebung.equipment)) {
        const geraeteUebungen = passendeUebungen.filter((uebung) => uebung.equipment && !auswahl.includes(uebung));
        auswahl.push(...zufallsauswahl(geraeteUebungen, 1));
    }

    const restlicheUebungen = passendeUebungen.filter((uebung) => !auswahl.includes(uebung));
    auswahl.push(...zufallsauswahl(restlicheUebungen, anzahl - auswahl.length));

    return {
        name: workout.name,
        takt: workout.takt,
        aufwaermen,
        hauptteil,
        ausklang,
        uebungen: zufallsauswahl(auswahl, anzahl),
        runden: Math.floor(stationen / anzahl),
        extraStationen: stationen % anzahl,
        extraPause: hauptteil % workout.stationsMinuten,
    };
}

const workoutFormular = document.getElementById("workout-form");
const ergebnis = document.getElementById("workout-result");
const titel = document.getElementById("workout-result-title");
const zusammenfassung = document.getElementById("workout-summary");
const aufwaermenTitel = document.getElementById("workout-warmup");
const hauptteilTitel = document.getElementById("workout-main-time");
const taktText = document.getElementById("workout-timing");
const rundenText = document.getElementById("workout-rounds");
const uebungsliste = document.getElementById("workout-exercises");
const extraPauseText = document.getElementById("workout-extra-rest");
const ausklangTitel = document.getElementById("workout-cooldown");

workoutFormular.addEventListener("submit", (event) => {
    event.preventDefault();

    const daten = new FormData(workoutFormular);
    const dauer = Number(daten.get("dauer"));
    const mitSchulter = daten.get("schulter") === "ja";
    const workout = erstelleWorkout(daten.get("art"), dauer, mitSchulter, daten.getAll("equipment"));

    const geraete = new Set(workout.uebungen.filter((uebung) => uebung.equipment).map((uebung) => equipmentNamen[uebung.equipment]));
    const equipmentText = geraete.size ? [...geraete].join(", ") : "Körpergewicht";
    const schulterText = mitSchulter ? "mit Schulterübungen" : "ohne gezielte Schulterbelastung";
    zusammenfassung.textContent = `${workout.name} · ${dauer} Min. · ${schulterText} · ${equipmentText}`;
    aufwaermenTitel.textContent = `Aufwärmen · ${workout.aufwaermen} Min.`;
    hauptteilTitel.textContent = `Hauptteil · ${workout.hauptteil} Min.`;
    taktText.textContent = workout.takt;
    ausklangTitel.textContent = `Ausklang · ${workout.ausklang} Min.`;

    const rundenEinheit = workout.runden === 1 ? "Runde" : "Runden";
    let anleitung = `${workout.runden} ${rundenEinheit} in der angegebenen Reihenfolge.`;
    if (workout.extraStationen === 1) {
        anleitung += " Danach die erste Station noch einmal.";
    } else if (workout.extraStationen > 1) {
        anleitung += ` Danach die ersten ${workout.extraStationen} Stationen noch einmal.`;
    }
    rundenText.textContent = anleitung;

    uebungsliste.replaceChildren(...workout.uebungen.map((uebung) => {
        const listenpunkt = document.createElement("li");
        const name = document.createElement("strong");
        const hinweis = document.createElement("span");
        name.textContent = uebung.equipment ? `${uebung.name} · ${equipmentNamen[uebung.equipment]}` : uebung.name;
        hinweis.textContent = uebung.hinweis;
        listenpunkt.append(name, hinweis);
        return listenpunkt;
    }));

    extraPauseText.hidden = workout.extraPause === 0;
    extraPauseText.textContent = `Zum Abschluss des Hauptteils ${workout.extraPause} Min. extra Pause.`;
    ergebnis.hidden = false;
    titel.focus();
    blendeSanftEin(ergebnis);
});

ladeUebungskatalog();
