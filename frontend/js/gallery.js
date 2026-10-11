
const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".gallery-filter");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightbox = document.getElementById("closeLightbox");
const previousButton = document.getElementById("prevImage");
const nextButton = document.getElementById("nextImage");

let visibleImages = [];
let currentImage = 0;

function updateVisibleImages() {
    visibleImages = Array.from(galleryItems).filter(
        item => item.style.display !== "none"
    );
}

filterButtons.forEach(button => {
    button.addEventListener("click", function () {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");

        const filter = this.dataset.filter;

        galleryItems.forEach(item => {
            item.style.display =
                filter === "all" || item.classList.contains(filter)
                    ? "block"
                    : "none";
        });

        updateVisibleImages();
    });
});

galleryItems.forEach(item => {
    item.addEventListener("click", function () {
        updateVisibleImages();
        currentImage = visibleImages.indexOf(this);

        if (currentImage !== -1) {
            showImage();
        }
    });
});

function showImage() {
    if (
        currentImage < 0 ||
        currentImage >= visibleImages.length
    ) {
        return;
    }

    const item = visibleImages[currentImage];
    const image = item.querySelector("img");
    const title = item.querySelector("h3");

    if (!image || !lightbox || !lightboxImage || !lightboxCaption) {
        return;
    }

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = title
        ? title.textContent
        : image.alt;

    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeGallery() {
    if (!lightbox) {
        return;
    }

    lightbox.classList.remove("show");
    document.body.style.overflow = "";
}

if (closeLightbox) {
    closeLightbox.addEventListener("click", closeGallery);
}

if (nextButton) {
    nextButton.addEventListener("click", function (event) {
        event.stopPropagation();

        if (visibleImages.length === 0) return;

        currentImage = (currentImage + 1) % visibleImages.length;
        showImage();
    });
}

if (previousButton) {
    previousButton.addEventListener("click", function (event) {
        event.stopPropagation();

        if (visibleImages.length === 0) return;

        currentImage =
            (currentImage - 1 + visibleImages.length) %
            visibleImages.length;

        showImage();
    });
}

if (lightbox) {
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeGallery();
        }
    });
}

document.addEventListener("keydown", function (event) {
    if (!lightbox || !lightbox.classList.contains("show")) {
        return;
    }

    if (event.key === "Escape") {
        closeGallery();
    } else if (event.key === "ArrowRight" && nextButton) {
        nextButton.click();
    } else if (event.key === "ArrowLeft" && previousButton) {
        previousButton.click();
    }
});

updateVisibleImages();
