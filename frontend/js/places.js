const placesContainer =
    document.getElementById("placesContainer");

const loading =
    document.getElementById("loading");

const noResults =
    document.getElementById("noResults");

const resultCount =
    document.getElementById("resultCount");

const searchInput =
    document.getElementById("search");

const filterButtons =
    document.querySelectorAll(".filter-btn");


let allPlaces = [];

let currentCategory = "All";

let searchText = "";



/* =====================================================
   LOAD PLACES
===================================================== */

async function loadPlaces() {

    try {

        loading.style.display = "block";

        placesContainer.innerHTML = "";

        const response =
            await fetch("http://localhost:5000/api/places");

        if (!response.ok) {

            throw new Error(
                "Failed to load places"
            );

        }

        allPlaces = await response.json();

        loading.style.display = "none";


        /* Get category from URL */

        const params =
            new URLSearchParams(
                window.location.search
            );

        const category =
            params.get("category");


        if (category) {

            const normalizedCategory =
                normalizeCategory(category);

            currentCategory =
                normalizedCategory;


            filterButtons.forEach(button => {

                button.classList.remove("active");

                if (
                    normalizeCategory(
                        button.dataset.category
                    ) === normalizedCategory
                ) {

                    button.classList.add("active");

                }

            });

        }


        displayPlaces();

    }

    catch (error) {

        console.error(error);

        loading.style.display = "none";

        placesContainer.innerHTML = `
            <div class="no-results"
                 style="display:block; grid-column:1/-1;">

                <div class="no-results-icon">
                    ⚠️
                </div>

                <h3>
                    Unable to Load Places
                </h3>

                <p>
                    Please make sure the backend server
                    is running on port 5000.
                </p>

            </div>
        `;

    }

}



/* =====================================================
   NORMALIZE CATEGORY
===================================================== */

function normalizeCategory(category) {

    if (!category) {

        return "";

    }

    const value =
        category
            .toString()
            .trim()
            .toLowerCase();


    if (
        value === "temple" ||
        value === "temples"
    ) {

        return "temple";

    }


    if (
        value === "heritage"
    ) {

        return "heritage";

    }


    if (
        value === "nature"
    ) {

        return "nature";

    }


    if (
        value === "all"
    ) {

        return "all";

    }


    return value;

}



/* =====================================================
   DISPLAY PLACES
===================================================== */

function displayPlaces() {

    let filteredPlaces =
        [...allPlaces];


    /* CATEGORY FILTER */

    if (
        currentCategory !== "All" &&
        currentCategory !== "all"
    ) {

        filteredPlaces =
            filteredPlaces.filter(place => {

                return normalizeCategory(
                    place.category
                ) === normalizeCategory(
                    currentCategory
                );

            });

    }


    /* SEARCH FILTER */

    if (searchText.trim() !== "") {

        const search =
            searchText
                .toLowerCase()
                .trim();


        filteredPlaces =
            filteredPlaces.filter(place => {

                return (

                    (place.name || "")
                        .toLowerCase()
                        .includes(search)

                    ||

                    (place.description || "")
                        .toLowerCase()
                        .includes(search)

                    ||

                    (place.location || "")
                        .toLowerCase()
                        .includes(search)

                    ||

                    (place.category || "")
                        .toLowerCase()
                        .includes(search)

                );

            });

    }


    /* RESULT COUNT */

    resultCount.textContent =
        `${filteredPlaces.length} ${
            filteredPlaces.length === 1
                ? "place"
                : "places"
        } found`;


    /* NO RESULTS */

    if (filteredPlaces.length === 0) {

        placesContainer.innerHTML = "";

        noResults.style.display =
            "block";

        return;

    }


    noResults.style.display =
        "none";


    /* CREATE CARDS */

    placesContainer.innerHTML =
        filteredPlaces
            .map(
                place =>
                    createPlaceCard(place)
            )
            .join("");

}



/* =====================================================
   CREATE PLACE CARD
===================================================== */

function createPlaceCard(place) {

    const id =
        place._id ||
        place.id ||
        "";


    const image =
        place.image ||
        "../images/hero/radha-krishna.png";


    const name =
        place.name ||
        "Beautiful Place";


    const category =
        place.category ||
        "Destination";


    const description =
        place.description ||
        "Discover this beautiful destination of Mathura and Braj.";


    const location =
        place.location ||
        "Mathura";


    return `

        <article class="place-card">


            <div class="place-image-wrapper">

                <img
                    src="${image}"
                    alt="${name}"
                    class="place-image"
                    loading="lazy"
                    onerror="this.src='../images/hero/radha-krishna.png'"
                >


                <span class="place-category">

                    ${getCategoryIcon(category)}

                    ${formatCategory(category)}

                </span>

            </div>



            <div class="place-content">


                <h3>
                    ${name}
                </h3>


                <p class="place-description">

                    ${description}

                </p>


                <div class="place-location">

                    <span>
                        📍
                    </span>

                    <span>
                        ${location}
                    </span>

                </div>


                <a
                    href="details.html?id=${id}"
                    class="details-btn"
                >

                    View Details

                    <span>
                        →
                    </span>

                </a>


            </div>

        </article>

    `;

}



/* =====================================================
   CATEGORY ICON
===================================================== */

function getCategoryIcon(category) {

    const normalized =
        normalizeCategory(category);


    if (normalized === "temple") {

        return "🛕";

    }


    if (normalized === "heritage") {

        return "🏛️";

    }


    if (normalized === "nature") {

        return "🌿";

    }


    return "📍";

}



/* =====================================================
   FORMAT CATEGORY
===================================================== */

function formatCategory(category) {

    if (!category) {

        return "Destination";

    }


    if (
        normalizeCategory(category) ===
        "temple"
    ) {

        return "Temple";

    }


    if (
        normalizeCategory(category) ===
        "heritage"
    ) {

        return "Heritage";

    }


    if (
        normalizeCategory(category) ===
        "nature"
    ) {

        return "Nature";

    }


    return category;

}



/* =====================================================
   FILTER BUTTONS
===================================================== */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            filterButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            this.classList.add("active");


            currentCategory =
                this.dataset.category;


            displayPlaces();

        }
    );

});



/* =====================================================
   SEARCH
===================================================== */

searchInput.addEventListener(
    "input",
    function () {

        searchText =
            this.value;

        displayPlaces();

    }
);



/* =====================================================
   INITIAL LOAD
===================================================== */

loadPlaces();