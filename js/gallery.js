
document.addEventListener("DOMContentLoaded", function () {
    const galleryGrid = document.getElementById("galleryGrid");
    const galleryCount = document.getElementById("galleryCount");

    const lightbox = document.getElementById("galleryLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");

    const closeButton = document.getElementById("lightboxClose");
    const prevButton = document.getElementById("lightboxPrev");
    const nextButton = document.getElementById("lightboxNext");

    const filters = document.querySelectorAll(".gallery-filter");

    const totalImages = 90;
    let currentImage = 1;
    let activeFilter = "all";
    const availableImages = [];

    // Assign image numbers to categories here.
    const imageCategories = {
        products: Array.from({length: 90}, (_, i) => i + 1),
        factory: [],
        projects: []
    };

    function getCategory(number) {
        if (imageCategories.factory.includes(number)) return "factory";
        if (imageCategories.projects.includes(number)) return "projects";
        return "products";
    }

    function updateCount() {
        const count = galleryGrid.querySelectorAll(".gallery-card").length;
        galleryCount.textContent = count + " photos displayed";
    }

    function renderGallery() {
        galleryGrid.innerHTML = "";

        const displayedImages = availableImages.filter(number => {
            return activeFilter === "all" || getCategory(number) === activeFilter;
        });

        displayedImages.forEach(number => {
            const figure = document.createElement("figure");
            figure.className = "gallery-card";

            const img = document.createElement("img");
            img.src = `images/${number}.jpeg`;
            img.alt = `Zinco Mabati photo ${number}`;
            img.loading = "lazy";

            const caption = document.createElement("figcaption");
            caption.textContent = `Zinco Mabati - Photo ${number}`;

            figure.appendChild(img);
            figure.appendChild(caption);

            figure.addEventListener("click", () => openLightbox(number));

            galleryGrid.appendChild(figure);
        });

        updateCount();
    }

    function openLightbox(number) {
        currentImage = number;
        lightboxImage.src = `images/${number}.jpeg`;
        lightboxCaption.textContent = `Zinco Mabati - Photo ${number}`;
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    function showImage(direction) {
        if (!availableImages.length) return;

        let index = availableImages.indexOf(currentImage);
        index = (index + direction + availableImages.length) % availableImages.length;

        currentImage = availableImages[index];
        lightboxImage.src = `images/${currentImage}.jpeg`;
        lightboxCaption.textContent = `Zinco Mabati - Photo ${currentImage}`;
    }

    filters.forEach(button => {
        button.addEventListener("click", () => {
            filters.forEach(item => item.classList.remove("active"));
            button.classList.add("active");
            activeFilter = button.dataset.filter;
            renderGallery();
        });
    });

    closeButton.addEventListener("click", closeLightbox);
    prevButton.addEventListener("click", () => showImage(-1));
    nextButton.addEventListener("click", () => showImage(1));

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", event => {
        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowLeft") showImage(-1);
        if (event.key === "ArrowRight") showImage(1);
    });

    // Load all 90 images and display those that exist.
    let completed = 0;

    for (let i = 1; i <= totalImages; i++) {
        const image = new Image();

        image.onload = () => {
            availableImages.push(i);
            checkCompleted();
        };

        image.onerror = () => {
            checkCompleted();
        };

        image.src = `images/${i}.jpeg`;
    }

    function checkCompleted() {
        completed++;

        if (completed === totalImages) {
            availableImages.sort((a, b) => a - b);
            renderGallery();

            if (!availableImages.length) {
                galleryCount.textContent = "No images could be loaded.";
            }
        }
    }
});
