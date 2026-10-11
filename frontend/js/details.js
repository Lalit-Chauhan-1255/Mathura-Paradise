
const API_URL = "https://mathura-paradise.onrender.com/api/places";

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");
const placeContent = document.getElementById("place-content");

function showError() {
    loading.hidden = true;
    placeContent.hidden = true;
    errorMessage.hidden = false;
}

function getImagePath(image) {
    if (!image) {
        return "images/hero/radha-krishna.png";
    }

    if (/^(https?:\/\/|data:|blob:)/i.test(image)) {
        return image;
    }

    let path = image.replace(/\\/g, "/").replace(/^\.?\//, "");

    if (path.startsWith("frontend/")) {
        path = path.slice("frontend/".length);
    }

    return path;
}

function setText(id, value, fallback = "Not available") {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value || fallback;
    }
}

function renderPlace(place) {
    setText("place-name", place.name, "Discover Braj");
    setText("place-category", `✦ ${place.category || "Destination"}`, "✦ Destination");

    setText(
        "hero-location",
        `📍 ${place.location || "Mathura, Uttar Pradesh"}`,
        "📍 Mathura, Uttar Pradesh"
    );

    setText("place-description", place.description);
    setText("place-history", place.history);
    setText("place-location", place.location);

    setText(
        "place-best-time",
        place.bestTime || place.best_time
    );

    setText(
        "place-timings",
        place.timings || place.openingHours || place.opening_hours
    );

    const image = document.getElementById("place-image");

    if (image) {
        image.src = getImagePath(place.image);
        image.alt = `${place.name || "Destination"} in Mathura and Vrindavan`;

        image.onerror = function () {
            this.onerror = null;
            this.src = "images/hero/radha-krishna.png";
        };
    }

    document.title = `${place.name || "Place Details"} | Mathura Paradise`;

    loading.hidden = true;
    errorMessage.hidden = true;
    placeContent.hidden = false;
}

async function loadPlaceDetails() {
    const params = new URLSearchParams(window.location.search);
    const placeId = params.get("id") || params.get("placeId");

    if (!placeId) {
        showError();
        return;
    }

    try {
        const response = await fetch(
            `${API_URL}/${encodeURIComponent(placeId)}`
        );

        if (!response.ok) {
            throw new Error("Could not fetch place details");
        }

        const result = await response.json();
        const place = result.place || result;

        if (!place || !place.name) {
            throw new Error("Place data is missing");
        }

        renderPlace(place);
    } catch (error) {
        console.error("Error loading place details:", error);
        showError();
    }
}

loadPlaceDetails();
