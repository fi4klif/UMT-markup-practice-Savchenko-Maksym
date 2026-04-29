(() => {
  const menuBtnRef = document.querySelector(".menu-btn-open");
  const closeBtnRef = document.querySelector(".menu-close-btn");
  const mobileMenuRef = document.querySelector(".mob-menu");

  // Додаємо пошук усіх посилань у мобільному меню
  const menuLinks = document.querySelectorAll(".mob-link");

  menuBtnRef.addEventListener("click", () => {
    mobileMenuRef.classList.toggle("is-open");
  });

  closeBtnRef.addEventListener("click", () => {
    mobileMenuRef.classList.remove("is-open");
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuRef.classList.remove("is-open");
    });
  });
})();
