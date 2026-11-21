const uebungenNachSchwerpunkt = {
    mobility: [
        "Tiefe Hocke",
        "Cossack Squat",
        "World's Greatest Stretch",
        "90/90-Hüftwechsel",
        "Brustwirbelsäulen-Rotation",
    ],
    kraft: [
        "Kniebeuge",
        "Liegestütz",
        "Plank",
        "Rückwärts-Ausfallschritt",
        "Glute Bridge",
    ],
};

function erstelleWorkout(uebungen, anzahl) {
    const verfuegbar = [...uebungen];
    const workout = [];

    for (let i = 0; i < anzahl; i++) {
        const zufallsIndex = Math.floor(Math.random() * verfuegbar.length);
        const [uebung] = verfuegbar.splice(zufallsIndex, 1);
        workout.push(uebung);
    }

    return workout;
}

const workoutFormular = document.getElementById("workout-form");
const schwerpunkt = document.getElementById("workout-focus");
const ergebnis = document.getElementById("workout-result");

workoutFormular.addEventListener("submit", (event) => {
    event.preventDefault();

    const uebungen = uebungenNachSchwerpunkt[schwerpunkt.value];
    const workout = erstelleWorkout(uebungen, 3);
    const listenpunkte = workout.map((uebung) => {
        const listenpunkt = document.createElement("li");
        listenpunkt.textContent = uebung;
        return listenpunkt;
    });

    ergebnis.replaceChildren(...listenpunkte);
    ergebnis.hidden = false;
});
