// --- Global Modal Functions (Accessible from inline HTML and Event Listeners) ---
window.openModal = function (imageSrc, captionText) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const modalCaption = document.getElementById("modalCaption");

  if (!modal || !modalImg) return;

  modalImg.src = imageSrc;
  if (modalCaption) {
    modalCaption.textContent = captionText || "";
  }

  modal.style.display = "flex";
  // Small delay to trigger smooth transition
  setTimeout(() => {
    modal.classList.add("active");
  }, 10);

  document.body.style.overflow = "hidden"; // Prevent background scroll
};

window.closeModal = function () {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");

  if (!modal) return;

  modal.classList.remove("active");
  setTimeout(() => {
    modal.style.display = "none";
    if (modalImg) modalImg.src = "";
  }, 200);

  document.body.style.overflow = "";
};

// Close modal on 'Escape' key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    window.closeModal();
  }
});

// --- Main DOM Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  // --- Dark / Light Mode Logic ---
  const themeToggleBtn = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute("data-theme", "dark");
    if (themeIcon) themeIcon.textContent = "☀️";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    if (themeIcon) themeIcon.textContent = "🌙";
  }

  if (themeToggleBtn && themeIcon) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      themeIcon.textContent = newTheme === "dark" ? "☀️" : "🌙";
    });
  }

  // --- Mobile Hamburger Menu Logic ---
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburgerBtn.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // --- Back to Top Logic ---
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // --- Cookie Banner Logic ---
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptCookiesBtn = document.getElementById("acceptCookies");
  const declineCookiesBtn = document.getElementById("declineCookies");

  if (cookieBanner) {
    const cookieChoice = localStorage.getItem("cookieConsent");
    if (!cookieChoice) {
      setTimeout(() => {
        cookieBanner.classList.add("show");
      }, 800);
    }

    if (acceptCookiesBtn) {
      acceptCookiesBtn.addEventListener("click", () => {
        localStorage.setItem("cookieConsent", "accepted");
        cookieBanner.classList.remove("show");
      });
    }

    if (declineCookiesBtn) {
      declineCookiesBtn.addEventListener("click", () => {
        localStorage.setItem("cookieConsent", "declined");
        cookieBanner.classList.remove("show");
      });
    }
  }
});
