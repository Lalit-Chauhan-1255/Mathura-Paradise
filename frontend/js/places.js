
const API_URL = "https://mathura-paradise.onrender.com/api/places";

const placesContainer = document.getElementById("placesContainer");
const loading = document.getElementById("loading");
const noResults = document.getElementById("noResults");
const resultCount = document.getElementById("resultCount");
const searchInput = document.getElementById("search");
const filterButtons = document.querySelectorAll(".filter-btn");

let allPlaces = [];
let currentCategory = "All";
let searchText = "";

async function loadPlaces() {
    try {
        if (loading) loading.style.display = "block";
        if (placesContainer) placesContainer.innerHTML = "";
        if (noResults) noResults.style.display = "none";

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load places");
        }

        const result = await response.json();
        allPlaces = Array.isArray(result) ? result : result.places || [];

        const params = new URLSearchParams(window.location.search);
        const category = params.get("category");

        if (category) {
            currentCategory = normalizeCategory(category);

            filterButtons.forEach(button => {
                button.classList.toggle(
                    "active",
                    normalizeCategory(button.dataset.category) === currentCategory
                );
            });
        }

        displayPlaces();
    } catch (error) {
        console.error("Error loading places:", error);

        if (placesContainer) {
            placesContainer.innerHTML = `
                <div class="no-results" style="display:block; grid-column:1/-1;">
                    <div class="no-results-icon">⚠️</div>
                    <h3>Unable to Load Places</h3>
                    <p>Please make sure the backend server is running on port 5000.</p>
                </div>
            `;
        }
    } finally {
        if (loading) loading.style.display = "none";
    }
}

function normalizeCategory(category) {
    const value = (category || "").toString().trim().toLowerCase();

    if (value === "temple" || value === "temples") return "temple";
    if (value === "heritage" || value === "heritages") return "heritage";
    if (value === "nature") return "nature";
    if (value === "all") return "all";

    return value;
}

function displayPlaces() {
    let filteredPlaces = [...allPlaces];

    if (currentCategory.toLowerCase() !== "all") {
        filteredPlaces = filteredPlaces.filter(place =>
            normalizeCategory(place.category) === normalizeCategory(currentCategory)
        );
    }

    const search = searchText.trim().toLowerCase();

    if (search) {
        filteredPlaces = filteredPlaces.filter(place =>
            [place.name, place.description, place.location, place.category]
                .some(value => (value || "").toLowerCase().includes(search))
        );
    }

    if (resultCount) {
        resultCount.textContent = `${filteredPlaces.length} ${
            filteredPlaces.length === 1 ? "place" : "places"
        } found`;
    }

    if (!placesContainer) return;

    if (filteredPlaces.length === 0) {
        placesContainer.innerHTML = "";
        if (noResults) noResults.style.display = "block";
        return;
    }

    if (noResults) noResults.style.display = "none";

    placesContainer.innerHTML = filteredPlaces
        .map(createPlaceCard)
        .join("");
}

function createPlaceCard(place) {
    const id = place._id || place.id || "";
    const image = getImagePath(place.image);
    const name = place.name || "Beautiful Place";
    const category = place.category || "Destination";
    const description = place.description ||
        "Discover this beautiful destination of Mathura and Braj.";
    const location = place.location || "Mathura";

    return `
        <article class="place-card">
            <div class="place-image-wrapper">
                <img
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(name)}"
                    class="place-image"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='../images/hero/radha-krishna.png'"
                >
                <span class="place-category">
                    ${getCategoryIcon(category)}
                    ${escapeHTML(formatCategory(category))}
                </span>
            </div>

            <div class="place-content">
                <h3>${escapeHTML(name)}</h3>
                <p class="place-description">${escapeHTML(description)}</p>

                <div class="place-location">
                    <span>📍</span>
                    <span>${escapeHTML(location)}</span>
                </div>

                <a href="details.html?id=${encodeURIComponent(id)}" class="details-btn">
                    View Details <span>→</span>
                </a>
            </div>
        </article>
    `;
}

function getImagePath(image) {
    if (!image) {
        return "../images/hero/radha-krishna.png";
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

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

function getCategoryIcon(category) {
    const normalized = normalizeCategory(category);

    if (normalized === "temple") return "🛕";
    if (normalized === "heritage") return "🏛️";
    if (normalized === "nature") return "🌿";

    return "📍";
}

function formatCategory(category) {
    const normalized = normalizeCategory(category);

    if (normalized === "temple") return "Temple";
    if (normalized === "heritage") return "Heritage";
    if (normalized === "nature") return "Nature";

    return category || "Destination";
}

filterButtons.forEach(button => {
    button.addEventListener("click", function () {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");

        currentCategory = this.dataset.category || "All";
        displayPlaces();
    });
});

if (searchInput) {
    searchInput.addEventListener("input", function () {
        searchText = this.value;
        displayPlaces();
    });
}

loadPlaces();
