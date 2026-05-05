import { initMenu } from "./menu.js";
import { initSlider } from "./scroll.js";

document.addEventListener("DOMContentLoaded", () => {
  initMenu();

  initSlider("#bestsellers", ".bestsellers-gallery");
  initSlider("#feedback", ".feedback-list");
});
