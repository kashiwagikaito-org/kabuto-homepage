(function () {
  var lightbox = document.getElementById("lightbox");
  var lbImg = lightbox.querySelector(".lightbox-img");
  var closeBtn = lightbox.querySelector(".lightbox-close");

  document.querySelectorAll(".lightbox-trigger").forEach(function (el) {
    el.addEventListener("click", function () {
      var src = el.dataset.src || el.querySelector("img").src;
      var alt = el.querySelector("img").alt || "";
      lbImg.src = src;
      lbImg.alt = alt;
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    lbImg.src = "";
  }

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });
})();
