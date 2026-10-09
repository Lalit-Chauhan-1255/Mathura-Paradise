const galleryItems =
    document.querySelectorAll(".gallery-item");

const filterButtons =
    document.querySelectorAll(".gallery-filter");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxCaption =
    document.getElementById("lightboxCaption");

const closeLightbox =
    document.getElementById("closeLightbox");

const previousButton =
    document.getElementById("prevImage");

const nextButton =
    document.getElementById("nextImage");


let visibleImages = [];

let currentImage = 0;


/* =====================================================
   UPDATE VISIBLE IMAGES
===================================================== */

function updateVisibleImages() {

    visibleImages =
        Array.from(
            document.querySelectorAll(
                ".gallery-item:not([style*='display: none'])"
            )
        );

}


/* =====================================================
   FILTER GALLERY
===================================================== */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            this.classList.add("active");


            const filter =
                this.dataset.filter;


            galleryItems.forEach(item => {

                if (
                    filter === "all" ||
                    item.classList.contains(filter)
                ) {

                    item.style.display =
                        "block";

                } else {

                    item.style.display =
                        "none";

                }

            });


            updateVisibleImages();

        }
    );

});


/* =====================================================
   OPEN LIGHTBOX
===================================================== */

galleryItems.forEach(item => {

    item.addEventListener(
        "click",
        function () {

            updateVisibleImages();


            currentImage =
                visibleImages.indexOf(this);


            showImage();

        }
    );

});


/* =====================================================
   SHOW IMAGE
===================================================== */

function showImage() {

    if (
        currentImage < 0 ||
        currentImage >= visibleImages.length
    ) {

        return;

    }


    const item =
        visibleImages[currentImage];


    const image =
        item.querySelector("img");


    const title =
        item.querySelector("h3");


    lightboxImage.src =
        image.src;


    lightboxImage.alt =
        image.alt;


    lightboxCaption.textContent =
        title
            ? title.textContent
            : image.alt;


    lightbox.classList.add("show");


    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   CLOSE LIGHTBOX
===================================================== */

function closeGallery() {

    lightbox.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

}


closeLightbox.addEventListener(
    "click",
    closeGallery
);


/* =====================================================
   NEXT IMAGE
===================================================== */

nextButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        currentImage++;

        if (
            currentImage >=
            visibleImages.length
        ) {

            currentImage = 0;

        }

        showImage();

    }
);


/* =====================================================
   PREVIOUS IMAGE
===================================================== */

previousButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        currentImage--;

        if (currentImage < 0) {

            currentImage =
                visibleImages.length - 1;

        }

        showImage();

    }
);


/* =====================================================
   CLOSE BY CLICKING BACKGROUND
===================================================== */

lightbox.addEventListener(
    "click",
    function (event) {

        if (
            event.target === lightbox
        ) {

            closeGallery();

        }

    }
);


/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            !lightbox.classList.contains(
                "show"
            )
        ) {

            return;

        }


        if (event.key === "Escape") {

            closeGallery();

        }


        if (event.key === "ArrowRight") {

            nextButton.click();

        }


        if (event.key === "ArrowLeft") {

            previousButton.click();

        }

    }
);


/* INITIALIZE */

updateVisibleImages();