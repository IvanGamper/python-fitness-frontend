const GA_MEASUREMENT_ID = "G-Y3JD6JS32F";

const cookieBanner = document.getElementById("cookie-banner");
const acceptButton = document.getElementById("cookie-accept");
const rejectButton = document.getElementById("cookie-reject");

const CONSENT_KEY = "pythonFitnessAnalyticsConsent";


function loadGoogleAnalytics() {

    if (document.getElementById("google-analytics-script")) {
        return;
    }

    const script = document.createElement("script");

    script.id = "google-analytics-script";
    script.async = true;
    script.src =
        `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];

    function gtag() {
        window.dataLayer.push(arguments);
    }

    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);
}


function saveConsent(value) {
    localStorage.setItem(CONSENT_KEY, value);
    cookieBanner.hidden = true;
}


function showCookieBanner() {
    cookieBanner.hidden = false;
}


const savedConsent = localStorage.getItem(CONSENT_KEY);

if (savedConsent === "accepted") {
    loadGoogleAnalytics();
} else if (!savedConsent) {
    showCookieBanner();
}


acceptButton.addEventListener("click", () => {
    saveConsent("accepted");
    loadGoogleAnalytics();
});


rejectButton.addEventListener("click", () => {
    saveConsent("rejected");
});