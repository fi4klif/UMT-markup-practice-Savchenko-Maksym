import { initMenu } from "./menu.js";
import { initSlider } from "./scroll.js";
import initModals from "./modal.js";
import { initCheckboxes } from "./checkbox.js";
import { initSubscriptionForm } from "./subscription.js";
import { initBouquets } from "./bouquets.js";
import { bootBestsellers } from "./bestsellers.js";
import "./apiClient.js";
import "./notifications.js";

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initCheckboxes();
  initSubscriptionForm();

  initBouquets();
  bootBestsellers();

  initSlider("#feedback", ".feedback-list");
  initModals();
});
