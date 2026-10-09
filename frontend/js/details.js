const API_URL = "http://localhost:5000/api/places";

const params =
    new URLSearchParams(window.location.search);

const id =
    params.get("id");

const detailsContainer =
    document.getElementById("placeDetails");


async function loadDetails() {

    if (!id) {

        detailsContainer.innerHTML = `
            <h2>Place not selected</h2>
        `;

        return;
    }


    try {

        const response =
            await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error("Place not found");
        }

        const place =
            await response.json();


        detailsContainer.innerHTML = `

            <div class="details-card">

                <img
                    src="${place.image}"
                    alt="${place.name}"
                    onerror="this.src='images/hero/radha-krishna.png'"
                >

                <div class="details-content">

                    <span class="category-badge">
                        ${place.category}
                    </span>

                    <h1>
                        ${place.name}
                    </h1>

                    <p>
                        ${place.description}
                    </p>

                    <h3>
                        Location
                    </h3>

                    <p>
                        ${place.location}
                    </p>

                    <h3>
                        History
                    </h3>

                    <p>
                        ${place.history}
                    </p>

                    <h3>
                        Best Time to Visit
                    </h3>

                    <p>
                        ${place.bestTime}
                    </p>

                    <br>

                    <a
                        href="places.html"
                        class="btn"
                    >
                        ← Back to Places
                    </a>

                </div>

            </div>
        `;

    } catch (error) {

        console.error(error);

        detailsContainer.innerHTML = `
            <h2>
                Unable to load place details.
            </h2>
        `;
    }
}


loadDetails();