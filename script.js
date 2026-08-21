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

  // --- Certificate Modal / Lightbox Logic ---
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const modalCaption = document.getElementById("modalCaption");
  const modalCloseBtn = modal ? modal.querySelector(".modal-close") : null;
  const modalBackdrop = modal ? modal.querySelector(".modal-backdrop") : null;
  const certCards = document.querySelectorAll(".cert-card");

  const openLightbox = (imgSrc, captionText) => {
    if (!modal || !modalImg || !modalCaption) return;
    modalImg.src = imgSrc;
    modalCaption.textContent = captionText;
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  const closeLightbox = () => {
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
    if (modalImg) modalImg.src = "";
  };

  certCards.forEach((card) => {
    card.addEventListener("click", () => {
      const imgSrc = card.getAttribute("data-img") || card.querySelector("img")?.src;
      const captionText = card.getAttribute("data-caption") || card.querySelector("h4")?.textContent || "";
      if (imgSrc) openLightbox(imgSrc, captionText);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeLightbox);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
      closeLightbox();
    }
  });

  // --- Cookie Consent Logic ---
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

  // --- Back to Top Logic ---
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    const toggleBackToTop = () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    };

    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    toggleBackToTop();

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});
