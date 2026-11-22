const BACKEND_URL = "https://python-fitness-backend.onrender.com";

const bewegungErlaubt = window.matchMedia("(prefers-reduced-motion: no-preference)");

function blendeSanftEin(element) {
    if (!bewegungErlaubt.matches || typeof element.animate !== "function") {
        return;
    }

    element.getAnimations().find((animation) => animation.id === "sanft-einblenden")?.cancel();
    element.animate(
        [
            { opacity: 0.35, transform: "translateY(10px)" },
            { opacity: 1, transform: "translateY(0)" },
        ],
        { id: "sanft-einblenden", duration: 700, easing: "ease-out" },
    );
}

document.addEventListener("DOMContentLoaded", () => {
    // Seitliches Menü
    const toggle = document.getElementById("nav-toggle");
    const panel = document.getElementById("nav-panel");
    const closeMenu = document.getElementById("nav-close");
    const backdrop = document.getElementById("nav-backdrop");

    if (toggle && panel) {
        const desktopMenu = window.matchMedia("(min-width: 1280px)");

        const setMenuState = (isOpen) => {
            panel.classList.toggle("open", isOpen);
            document.body.classList.toggle("menu-open", isOpen);
            toggle.setAttribute("aria-expanded", String(isOpen));
            toggle.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
            backdrop?.classList.toggle("open", isOpen);
        };

        toggle.addEventListener("click", () => {
            setMenuState(!panel.classList.contains("open"));
        });

        closeMenu?.addEventListener("click", () => setMenuState(false));
        backdrop?.addEventListener("click", () => setMenuState(false));

        desktopMenu.addEventListener("change", (event) => {
            if (event.matches) setMenuState(false);
        });

        panel.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => setMenuState(false));
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                setMenuState(false);
            }
        });
    }

    // About-Bilder und Video beim ersten Scrollen in den sichtbaren Bereich einblenden.
    const aboutMedien = document.querySelectorAll(".about-page .about-media");
    if (aboutMedien.length && bewegungErlaubt.matches && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((eintraege) => {
            eintraege.forEach((eintrag) => {
                if (eintrag.isIntersecting) {
                    blendeSanftEin(eintrag.target);
                    observer.unobserve(eintrag.target);
                }
            });
        });
        aboutMedien.forEach((medium) => observer.observe(medium));
    }

    // Anmeldung für den Handstand-Guide
    const signupForm = document.getElementById("signup-form");
    const emailInput = document.getElementById("email");
    const downloadArea = document.getElementById("download-area");

    if (signupForm && emailInput && downloadArea) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();

            if (!email) return;

            downloadArea.innerHTML = "Anmeldung läuft...";

            try {
                const res = await fetch(`${BACKEND_URL}/signup`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                });

                if (!res.ok) {
                    throw new Error("Serverfehler");
                }

                downloadArea.innerHTML = `
                    <p style="color: green; font-weight: bold;">
                    Danke für deine Anmeldung!
                    Du erhältst in Kürze eine E-Mail mit dem Download-Link.
                    </p>
                `;

                signupForm.reset();

            } catch (err) {
                downloadArea.innerHTML = `
                    <p style="color: red;">
                    Es gab ein Problem mit deiner Anmeldung.
                    Bitte versuche es später erneut.
                    </p>
                `;
                console.error(err);
            }
        });
    }
});
