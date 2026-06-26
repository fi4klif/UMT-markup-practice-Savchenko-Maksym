import { apiClient } from "./apiClient.js";

const BOUQUETS_PER_PAGE = 4;

let currentBouquetsPage = 1;
let totalBouquets = [];
let displayedBouquets = [];
let isLoadingBouquets = false;

export async function initBouquets() {
  try {
    showBouquetsLoading();

    // Fetch all bouquets from the API
    const response = await apiClient.get("/bouquets");
    totalBouquets = response.data;

    if (!Array.isArray(totalBouquets)) {
      throw new Error("Invalid bouquets data format");
    }

    // Load the first page
    await loadMoreBouquets();
  } catch (error) {
    console.error("Error loading bouquets:", error);
    clearBouquetsLoading();
    showBouquetsError("Failed to load bouquets. Please try again later.");
  }

  // Set up Load More button
  const loadMoreBtn = document.getElementById("bouquets-load-more");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", async () => {
      await loadMoreBouquets();
    });
  }
}

async function loadMoreBouquets() {
  if (isLoadingBouquets) return;

  try {
    isLoadingBouquets = true;
    const loadMoreBtn = document.getElementById("bouquets-load-more");
    if (loadMoreBtn) {
      loadMoreBtn.disabled = true;
    }

    const start = (currentBouquetsPage - 1) * BOUQUETS_PER_PAGE;
    const end = start + BOUQUETS_PER_PAGE;
    const newBouquets = totalBouquets.slice(start, end);

    if (newBouquets.length === 0) {
      handleEmptyBouquets();
      return;
    }

    // Add new bouquets to displayed list
    displayedBouquets.push(...newBouquets);

    // Render the new bouquets
    renderBouquets(newBouquets);

    // Check if there are more items
    if (end >= totalBouquets.length) {
      hideBouquetsLoadMore();
    } else {
      if (loadMoreBtn) {
        loadMoreBtn.disabled = false;
      }
    }

    currentBouquetsPage++;
  } catch (error) {
    console.error("Error loading more bouquets:", error);
    showBouquetsError("Failed to load more bouquets.");
  } finally {
    isLoadingBouquets = false;
  }
}

function renderBouquets(bouquets) {
  const container = document.getElementById("bouquets-container");
  if (!container) return;

  bouquets.forEach((bouquet) => {
    const html = createBouquetHTML(bouquet);
    container.insertAdjacentHTML("beforeend", html);
  });

  // Reinitialize modal listeners for new items
  reinitializeModal();
}

function createBouquetHTML(bouquet) {
  const { id, title, description, price, img1x, img2x } = bouquet;

  return `
    <div class="bouquets-gallery-item" data-id="${id}">
      <ul>
        <li>
          <img
            src="${img1x}"
            srcset="${img2x} 2x"
            alt="${title}"
            class="bouquets-image"
            width="296"
            height="296"
            data-aos="fade-up"
          />
          <h3>${title}</h3>
          <p>${description}</p>
          <p>$${price}</p>
        </li>
      </ul>
    </div>
  `;
}

function reinitializeModal() {
  const bouquetsContainer = document.querySelector(".bouquets-row");

  if (!bouquetsContainer) return;

  const handleCardClick = (e) => {
    const parentItem = e.target.closest("li");
    if (!parentItem) return;

    const title = parentItem.querySelector("h3").textContent;
    const text = parentItem.querySelector("p:first-of-type").textContent;
    const price = parentItem.querySelector("p:last-of-type").textContent;

    const imgElement = parentItem.querySelector("img");
    const src = imgElement.getAttribute("src");
    const srcset = imgElement.getAttribute("srcset") || "";

    const modalContent = document.querySelector(".modal-content-container");
    const modalWrapper = document.getElementById("modal-wrapper");

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
    modalWrapper.classList.add("is-open");
    document.body.classList.add("modal-open");

    const openOrderBtn = document.getElementById("open-order-btn");
    if (openOrderBtn) {
      openOrderBtn.addEventListener("click", () => {
        modalWrapper.classList.remove("is-open");
        document.body.classList.remove("modal-open");
        const orderModalWrapper = document.getElementById(
          "order-modal-wrapper",
        );
        if (orderModalWrapper) {
          orderModalWrapper.classList.add("is-open");
          document.body.classList.add("modal-open");
        }
      });
    }
  };

  // Remove old listener
  bouquetsContainer.removeEventListener("click", handleCardClick);
  // Add new listener
  bouquetsContainer.addEventListener("click", handleCardClick);
}

function hideBouquetsLoadMore() {
  const loadMoreBtn = document.getElementById("bouquets-load-more");
  if (loadMoreBtn) {
    loadMoreBtn.style.display = "none";
  }
}

function handleEmptyBouquets() {
  const container = document.getElementById("bouquets-container");
  if (container && displayedBouquets.length === 0) {
    container.insertAdjacentHTML(
      "beforeend",
      '<p style="text-align: center; padding: 40px; font-size: 18px;">No bouquets found</p>',
    );
  }
  hideBouquetsLoadMore();
}

function showBouquetsLoading() {
  const container = document.getElementById("bouquets-container");
  if (container) {
    container.insertAdjacentHTML(
      "beforeend",
      '<p style="text-align: center; padding: 40px; font-size: 18px;">Loading bouquets...</p>',
    );
  }
}

function clearBouquetsLoading() {
  const container = document.getElementById("bouquets-container");
  if (container) {
    const loadingElement = container.querySelector('p:contains("Loading")');
    if (loadingElement) {
      loadingElement.remove();
    }
  }
}

function showBouquetsError(message) {
  const container = document.getElementById("bouquets-container");
  if (container) {
    container.innerHTML = "";
    container.insertAdjacentHTML(
      "beforeend",
      `<p style="text-align: center; padding: 40px; font-size: 18px; color: #af0000;">${message}</p>`,
    );
  }
  hideBouquetsLoadMore();
}
