export const initMenu = () => {
  const menuBtnRef = document.querySelector(".menu-btn-open");
  const closeBtnRef = document.querySelector(".menu-close-btn");
  const mobileMenuRef = document.querySelector(".mob-menu");
  const bodyRef = document.body;

  if (!menuBtnRef || !mobileMenuRef) return;
  const toggleMenu = () => {
    mobileMenuRef.classList.toggle("is-open");
    bodyRef.classList.toggle("no-scroll");
  };

  menuBtnRef.addEventListener("click", toggleMenu);
  closeBtnRef.addEventListener("click", toggleMenu);

  const menuLinks = document.querySelectorAll(".mob-link");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuRef.classList.remove("is-open");
      bodyRef.classList.remove("no-scroll");
    });
  });
};
