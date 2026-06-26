import { apiClient } from "./apiClient.js";

let bestsellersData = [];

export async function initBestsellers() {
  try {
    showBestsellersLoading();

    // Fetch bestsellers from the API
    const response = await apiClient.get("/bestsellers");
    bestsellersData = response.data;

    if (!Array.isArray(bestsellersData)) {
      throw new Error("Invalid bestsellers data format");
    }

    // Clear loading indicator
    clearBestsellersLoading();

    // Render bestsellers
    renderBestsellers(bestsellersData);

    // Initialize slider functionality (dots and pagination)
    initBestsellersSlider(bestsellersData.length);
  } catch (error) {
    console.error("Error loading bestsellers:", error);
    clearBestsellersLoading();
    showBestsellersError("Failed to load bestsellers. Please try again later.");
  }
}

function renderBestsellers(bestsellers) {
  const container = document.getElementById("bestsellers-container");
  if (!container) return;

  bestsellers.forEach((item) => {
    const html = createBestsellerHTML(item);
    container.insertAdjacentHTML("beforeend", html);
  });

  // Reinitialize modal listeners for new items
  reinitializeModal();
}

function createBestsellerHTML(item) {
  const { id, title, description, price, img1x, img2x } = item;

  return `
    <li data-id="${id}">
      <img
        src="${img1x}"
        srcset="${img2x} 2x"
        alt="${title}"
        class="bestsellers-image"
        width="405"
        height="320"
        data-aos="fade-up"
      />
      <h3>${title}</h3>
      <p>${description}</p>
      <p>$${price}</p>
    </li>
  `;
}

function initBestsellersSlider(itemCount) {
  // Create dots dynamically
  const dotsContainer = document.getElementById("bestsellers-dots");
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < itemCount; i++) {
      const dotHTML = `
        <li>
          <button
            class="btn-dots ${i === 0 ? "active" : ""}"
            aria-label="go to slide ${i + 1}"
            data-slide="${i}"
          ></button>
        </li>
      `;
      dotsContainer.insertAdjacentHTML("beforeend", dotHTML);
    }
  }

  // Add click handlers to dots
  const dots = document.querySelectorAll("#bestsellers-dots .btn-dots");
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const slideIndex = parseInt(dot.getAttribute("data-slide"));
      updateBestsellersSlide(slideIndex);
    });
  });

  // Add pagination button handlers
  const prevBtn = document.querySelector(".paggination [data-action='prev']");
  const nextBtn = document.querySelector(".paggination [data-action='next']");
  let currentSlide = 0;

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + itemCount) % itemCount;
      updateBestsellersSlide(currentSlide);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % itemCount;
      updateBestsellersSlide(currentSlide);
    });
  }
}

function updateBestsellersSlide(slideIndex) {
  const container = document.getElementById("bestsellers-container");
  const dots = document.querySelectorAll("#bestsellers-dots .btn-dots");
  const items = container.querySelectorAll("li");

  // Update dots
  dots.forEach((dot, index) => {
    if (index === slideIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });

  // Scroll to the item (simple approach - could be enhanced with smooth scrolling)
  if (items[slideIndex]) {
    items[slideIndex].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }
}

function reinitializeModal() {
  const bestsellersContainer = document.querySelector(".bestsellers-gallery");

  if (!bestsellersContainer) return;

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
  bestsellersContainer.removeEventListener("click", handleCardClick);
  // Add new listener
  bestsellersContainer.addEventListener("click", handleCardClick);
}

function showBestsellersLoading() {
  const container = document.getElementById("bestsellers-container");
  if (container) {
    container.insertAdjacentHTML(
      "beforeend",
      '<li style="text-align: center; padding: 40px; font-size: 18px; grid-column: 1 / -1;">Loading bestsellers...</li>',
    );
  }
}

function clearBestsellersLoading() {
  const container = document.getElementById("bestsellers-container");
  if (container) {
    const loadingElement = container.querySelector(
      "li:has(> :not(img, h3, p))",
    );
    if (loadingElement && loadingElement.textContent.includes("Loading")) {
      loadingElement.remove();
    }
  }
}

function showBestsellersError(message) {
  const container = document.getElementById("bestsellers-container");
  if (container) {
    container.innerHTML = "";
    container.insertAdjacentHTML(
      "beforeend",
      `<li style="text-align: center; padding: 40px; font-size: 18px; color: #af0000; grid-column: 1 / -1;">${message}</li>`,
    );
  }
}
