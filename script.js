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
