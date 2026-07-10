import { initMenu } from "./menu.js";
import initModal from "./modal.js";
import initOrderModal from "./order.js";
import { initCheckboxes } from "./checkbox.js";
import { initBouquets } from "./bouquets.js";
import { initBestsellers } from "./bestsellers.js";
import { initFeedback } from "./feedback.js";
import "./apiClient.js";
import "./notifications.js";

document.addEventListener("DOMContentLoaded", async () => {
  initMenu();
  initBouquets();
  initModal();

  await initBestsellers();
  await initFeedback();

  initOrderModal();
  initCheckboxes();
});
