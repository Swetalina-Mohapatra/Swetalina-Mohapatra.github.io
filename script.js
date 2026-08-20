// --- Dark / Light Mode Logic ---
const themeToggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Check for stored preference or system preference
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  document.documentElement.setAttribute("data-theme", "dark");
  themeIcon.textContent = "☀️";
} else {
  document.documentElement.setAttribute("data-theme", "light");
  themeIcon.textContent = "🌙";
}

themeToggleBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  themeIcon.textContent = newTheme === "dark" ? "☀️" : "🌙";
});

// --- Mobile Hamburger Menu Logic ---
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Auto-close mobile menu when a navigation item is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburgerBtn.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// --- Certificate Modal / Lightbox Logic ---
function openModal(imageSrc, captionText) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const caption = document.getElementById("modalCaption");

  modal.style.display = "flex";
  modalImg.src = imageSrc;
  caption.textContent = captionText;
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

// Close lightbox on 'Escape' key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});
// --- Cookie Consent Logic ---
const cookieBanner = document.getElementById("cookieBanner");
const acceptCookiesBtn = document.getElementById("acceptCookies");
const declineCookiesBtn = document.getElementById("declineCookies");

window.addEventListener("DOMContentLoaded", () => {
  const cookieChoice = localStorage.getItem("cookieConsent");

  // If no choice was recorded previously, slide the banner in after a brief delay
  if (!cookieChoice) {
    setTimeout(() => {
      cookieBanner.classList.add("show");
    }, 800);
  }
});

acceptCookiesBtn.addEventListener("click", () => {
  localStorage.setItem("cookieConsent", "accepted");
  cookieBanner.classList.remove("show");
});

declineCookiesBtn.addEventListener("click", () => {
  localStorage.setItem("cookieConsent", "declined");
  cookieBanner.classList.remove("show");
});
// --- Back to Top Logic ---
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  // Show button after scrolling down 300px
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
