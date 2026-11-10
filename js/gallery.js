
document.addEventListener("DOMContentLoaded", function () {

    const galleryGrid = document.getElementById("galleryGrid");
    const galleryCount = document.getElementById("galleryCount");
    const galleryFilters = document.getElementById("galleryFilters");

    const lightbox = document.getElementById("galleryLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");

    const closeButton = document.getElementById("lightboxClose");
    const previousButton = document.getElementById("lightboxPrev");
    const nextButton = document.getElementById("lightboxNext");

    if (!galleryGrid) {
        console.error("Gallery grid was not found.");
        return;
    }

    /* =====================================
       GALLERY SETTINGS
       ===================================== */

    const TOTAL_IMAGES = 90;

    /*
       All images initially belong to Products.
       Change the numbers below when you know
       which photos show factory work or projects.
    */

    const categories = {
        products: Array.from({ length: 90 }, (_, i) => i + 1),
        factory: [],
        projects: []
    };

    let activeFilter = "all";
    let visibleImages = [];
    let currentIndex = 0;

    /* =====================================
       CREATE GALLERY
       ===================================== */

    function getCategory(imageNumber) {

        if (categories.factory.includes(imageNumber)) {
            return "factory";
        }

        if (categories.projects.includes(imageNumber)) {
            return "projects";
        }

        return "products";
    }

    function getImageNumbers() {

        if (activeFilter === "all") {
            return Array.from(
                { length: TOTAL_IMAGES },
                (_, i) => i + 1
            );
        }

        return categories[activeFilter] || [];
    }

    function createGallery() {

        const imageNumbers = getImageNumbers();

        visibleImages = imageNumbers;

        galleryGrid.innerHTML = "";

        imageNumbers.forEach((number, index) => {

            const figure = document.createElement("figure");
            figure.className = "gallery-card";

            const image = document.createElement("img");

            image.src = `images/${number}.jpeg`;
            image.alt = `Zinco Mabati roofing photo ${number}`;

            // Load the first six images immediately.
            // Load the remaining images when needed.
            image.loading = index < 6 ? "eager" : "lazy";

            image.decoding = "async";

            if (index < 2) {
                image.fetchPriority = "high";
            }

            image.width = 600;
            image.height = 400;

            image.onerror = function () {
                figure.remove();
                updateGalleryCount();
            };

            const caption = document.createElement("figcaption");
            caption.textContent = `Zinco Mabati - Photo ${number}`;

            figure.appendChild(image);
            figure.appendChild(caption);

            figure.addEventListener("click", function () {
                openLightbox(number);
            });

            galleryGrid.appendChild(figure);
        });

        updateGalleryCount();
    }

    /* =====================================
       UPDATE PHOTO COUNT
       ===================================== */

    function updateGalleryCount() {

        const loadedCards = galleryGrid.querySelectorAll(
            ".gallery-card"
        ).length;

        if (galleryCount) {
            galleryCount.textContent =
                `${loadedCards} photos displayed`;
        }
    }

    /* =====================================
       CATEGORY FILTERS
       ===================================== */

    if (galleryFilters) {

        galleryFilters.addEventListener("click", function (event) {

            const button = event.target.closest(".gallery-filter");

            if (!button) return;

            activeFilter = button.dataset.filter;

            galleryFilters.querySelectorAll(".gallery-filter")
                .forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            createGallery();
        });
    }

    /* =====================================
       LIGHTBOX
       ===================================== */

    function openLightbox(imageNumber) {

        currentIndex = visibleImages.indexOf(imageNumber);

        if (currentIndex < 0) return;

        showLightboxImage();

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
    }

    function showLightboxImage() {

        const imageNumber = visibleImages[currentIndex];

        if (!imageNumber) return;

        lightboxImage.src = `images/${imageNumber}.jpeg`;

        lightboxImage.alt =
            `Zinco Mabati roofing photo ${imageNumber}`;

        lightboxCaption.textContent =
            `Photo ${imageNumber} of ${TOTAL_IMAGES}`;
    }

    function closeLightbox() {

        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        lightboxImage.src = "";
    }

    function showNextImage() {

        if (!visibleImages.length) return;

        currentIndex =
            (currentIndex + 1) % visibleImages.length;

        showLightboxImage();
    }

    function showPreviousImage() {

        if (!visibleImages.length) return;

        currentIndex =
            (currentIndex - 1 + visibleImages.length) %
            visibleImages.length;

        showLightboxImage();
    }

    /* =====================================
       LIGHTBOX BUTTONS
       ===================================== */

    if (closeButton) {
        closeButton.addEventListener("click", closeLightbox);
    }

    if (nextButton) {
        nextButton.addEventListener("click", showNextImage);
    }

    if (previousButton) {
        previousButton.addEventListener("click", showPreviousImage);
    }

    if (lightbox) {

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });
    }

    /* =====================================
       KEYBOARD CONTROLS
       ===================================== */

    document.addEventListener("keydown", function (event) {

        if (!lightbox || !lightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            showNextImage();
        }

        if (event.key === "ArrowLeft") {
            showPreviousImage();
        }

    });

    /* =====================================
       INITIALIZE
       ===================================== */

    createGallery();

});
