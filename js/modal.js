import { openOrderModal } from "./order.js";

export default function initModal() {
  const bouquetsContainer =
    document.querySelector(".bouquets-row") ||
    document.getElementById("bouquets-list");
  const bestsellersContainer =
    document.querySelector(".bestsellers-gallery") ||
    document.getElementById("bestsellers-list");

  const modalWrapper = document.getElementById("modal-wrapper");
  const modalContent = document.querySelector(".modal-content-container");

  if (!modalWrapper || !modalContent) return;

  let lastFocusedElement = null;

  function toggleModal() {
    const isOpen = modalWrapper.classList.toggle("is-open");

    if (isOpen) {
      lastFocusedElement = document.activeElement;
      document.body.classList.add("modal-open");
      const firstFocusable = modalWrapper.querySelector(
        "button, input, [tabindex='0']",
      );
      if (firstFocusable) firstFocusable.focus();
    } else {
      document.body.classList.remove("modal-open");
      if (lastFocusedElement) lastFocusedElement.focus();
    }
  }

  function closeModal() {
    if (modalWrapper.classList.contains("is-open")) {
      toggleModal();
    }
  }

  function setupModalCloseHandlers() {
    modalWrapper.addEventListener("click", (e) => {
      if (
        e.target === modalWrapper ||
        e.target.closest("[data-modal-close]") ||
        e.target.closest(".modal-close-btn") ||
        e.target.closest(".close-btn")
      ) {
        closeModal();
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    });
  }

  function handleCardClick(e) {
    const parentItem =
      e.target.closest("li") || e.target.closest(".product-card");
    if (!parentItem) return;

    if (
      e.target.closest("button") &&
      !e.target.closest("[data-product-trigger]")
    )
      return;

    const titleElement =
      parentItem.querySelector("h3") ||
      parentItem.querySelector(".product-card-title");
    if (!titleElement) return;
    const title = titleElement.textContent.trim();

    const textElement =
      parentItem.querySelector(".product-card-text") ||
      parentItem.querySelector("p:first-of-type");
    const text = textElement ? textElement.textContent.trim() : "";

    const priceElement =
      parentItem.querySelector(".product-card-price") ||
      parentItem.querySelector("p:last-of-type");
    const price = priceElement ? priceElement.textContent.trim() : "";

    const imgElement = parentItem.querySelector("img");
    if (!imgElement) return;
    const src = imgElement.getAttribute("src") || "";
    const srcset = imgElement.getAttribute("srcset") || "";

    const markup = `
      <div class="modal-content-wrapper">
        <img src="${src}" srcset="${srcset}" alt="${title}" />
        <div class="modal-info">
          <h2>${title}</h2>
          <p class="modal-price">${price}</p>
          <p class="modal-text">${text}</p>
          <div class="modal-bottom">
            <button id="open-order-btn" class="btn" type="button" aria-label="buy now">Buy now</button>
            <input type="number" class="quantity-input" value="1" min="1" aria-label="кількість" />
          </div>
        </div>
      </div>
    `;

    modalContent.innerHTML = markup;
    toggleModal();

    const openOrderBtn = document.getElementById("open-order-btn");
    if (openOrderBtn) {
      openOrderBtn.addEventListener("click", () => {
        closeModal();
        openOrderModal();
      });
    }
  }

  if (bouquetsContainer) {
    bouquetsContainer.addEventListener("click", handleCardClick);
  }
  if (bestsellersContainer) {
    bestsellersContainer.addEventListener("click", handleCardClick);
  }

  setupModalCloseHandlers();
}
