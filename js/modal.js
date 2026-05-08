// Імпортуємо функцію з нашого нового файлу
import { openOrderModal } from "./order.js";

export default function initModal() {
  const bouquetsContainer = document.querySelector(".bouquets-row");
  const bestsellersContainer = document.querySelector(".bestsellers-gallery");

  const modalWrapper = document.getElementById("modal-wrapper");
  const modalContent = document.querySelector(".modal-content-container");

  if (!modalWrapper || !modalContent) return;

  function toggleModal() {
    modalWrapper.classList.toggle("is-open");

    if (modalWrapper.classList.contains("is-open")) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }

  function handleCardClick(e) {
    const parentItem = e.target.closest("li");
    if (!parentItem) return;

    const title = parentItem.querySelector("h3").textContent;
    const text = parentItem.querySelector("p:first-of-type").textContent;
    const price = parentItem.querySelector("p:last-of-type").textContent;

    const imgElement = parentItem.querySelector("img");
    const src = imgElement.getAttribute("src");
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
        toggleModal();
        openOrderModal();
      });
    }
  }

  if (bouquetsContainer)
    bouquetsContainer.addEventListener("click", handleCardClick);
  if (bestsellersContainer)
    bestsellersContainer.addEventListener("click", handleCardClick);

  const closeBtn = modalWrapper.querySelector(".modal-close-btn");
  if (closeBtn) closeBtn.addEventListener("click", toggleModal);

  modalWrapper.addEventListener("click", (e) => {
    if (e.target === modalWrapper) toggleModal();
  });
}
