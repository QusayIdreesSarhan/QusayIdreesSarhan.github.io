const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
toggle.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

// =========================
// Gallery Lightbox
// =========================

const galleryItems = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("galleryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeButton = document.querySelector(".lightbox-close");
const prevButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

let currentPhoto = 0;

function showPhoto(index) {
  if (index < 0) {
    index = galleryItems.length - 1;
  }

  if (index >= galleryItems.length) {
    index = 0;
  }

  currentPhoto = index;

  const photo = galleryItems[currentPhoto];

  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt;
  lightboxCaption.textContent = photo.dataset.caption || "";

  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

galleryItems.forEach((photo, index) => {
  photo.addEventListener("click", () => {
    showPhoto(index);
  });
});

prevButton.addEventListener("click", (event) => {
  event.stopPropagation();
  showPhoto(currentPhoto - 1);
});

nextButton.addEventListener("click", (event) => {
  event.stopPropagation();
  showPhoto(currentPhoto + 1);
});

closeButton.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard navigation
document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("active")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft") {
    showPhoto(currentPhoto - 1);
  }

  if (event.key === "ArrowRight") {
    showPhoto(currentPhoto + 1);
  }
});
