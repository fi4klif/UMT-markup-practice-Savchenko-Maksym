import { initMenu } from "./menu.js";
import { initSlider } from "./scroll.js";
import initModal from "./modal.js";
import initOrderModal from "./order.js";
import { initCheckboxes } from "./checkbox.js";
import { initSubscriptionForm } from "./subscription.js";
import { initBouquets } from "./bouquets.js";
import { initBestsellers } from "./bestsellers.js";
import "./apiClient.js";
import "./notifications.js";

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initCheckboxes();
  initSubscriptionForm();
  initBouquets();
  initBestsellers();

  initSlider("#feedback", ".feedback-list");
  initModal();
  initOrderModal();
});
