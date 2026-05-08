import { initMenu } from "./menu.js";
import { initSlider } from "./scroll.js";
import initModal from "./modal.js";
import initOrderModal from "./order.js";

document.addEventListener("DOMContentLoaded", () => {
  initMenu();

  initSlider("#bestsellers", ".bestsellers-gallery");
  initSlider("#feedback", ".feedback-list");
  initModal();
  initOrderModal();
});
