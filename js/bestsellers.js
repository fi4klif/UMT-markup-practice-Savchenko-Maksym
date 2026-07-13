import { apiClient } from "./apiClient.js";
import {
  formatPriceUsd,
  resolveImageUrl,
  extractErrorMessage,
  suppressHoverUntilLeave,
} from "./utils.js";
import { showErrorNotification } from "./notifications.js";

const listRef = document.getElementById("bestsellers-container");
const dotsRef = document.getElementById("bestsellers-dots");
const loaderRef = document.getElementById("bestsellers-loader");
const prevBtn = document.querySelector(
  ".btn-pagination[aria-label='prev page']",
);
const nextBtn = document.querySelector(
  ".btn-pagination[aria-label='next page']",
);
const body = document.querySelector(".bestsellers-body");

const mqDesktop = window.matchMedia("(min-width: 1440px)");
const mqTablet = window.matchMedia("(min-width: 768px)");

let allItems = [];
let currentPage = 0;

function getVisibleCount() {
  if (mqDesktop.matches) return 3;
  if (mqTablet.matches) return 2;
  return 1;
}

function getTotalPages() {
  const visible = getVisibleCount();
  if (visible === 0 || allItems.length === 0) return 1;
  return Math.ceil(allItems.length / visible);
}

function createBestsellerHTML(product) {
  const imageUrl = resolveImageUrl(product.image);
  const altText = product.alt ?? product.title ?? "";

  return `
    <li class="product-item">
      <article class="product-card" tabindex="0" role="button" data-product-trigger data-bouquet-id="${product.id}">
        <img loading="lazy" class="bestsellers-card-image" src="${imageUrl}" alt="${altText}" />
        <div class="product-card-content">
          <div class="product-card-header">
            <h3 class="product-card-title">${product.title ?? ""}</h3>
            <p class="product-card-text">${product.description ?? ""}</p>
          </div>
          <p class="product-card-price">${formatPriceUsd(product.price)}</p>
        </div>
      </article>
    </li>
  `;
}

function renderPage() {
  if (!listRef) return;

  const visible = getVisibleCount();
  const totalPages = getTotalPages();
  currentPage = Math.max(0, Math.min(currentPage, totalPages - 1));

  const start = currentPage * visible;
  const slice = allItems.slice(start, start + visible);

  listRef.innerHTML = slice.map(createBestsellerHTML).join("");

  renderDots(totalPages);
  updateNavState(totalPages);
}

function renderDots(totalPages) {
  if (!dotsRef) return;
  dotsRef.innerHTML = "";

  const windowSize = Math.min(totalPages);
  let start = Math.max(0, currentPage - Math.floor(windowSize / 2));
  const end = Math.min(totalPages, start + windowSize);
  start = Math.max(0, end - windowSize);

  for (let i = start; i < end; i += 1) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.className = "btn-dots";
    if (i === currentPage) {
      li.className = "active";
    }
    li.dataset.page = String(i);
    li.append(span);
    dotsRef.append(li);
  }
}

function updateNavState(totalPages) {
  if (prevBtn) prevBtn.disabled = currentPage <= 0;
  if (nextBtn) nextBtn.disabled = currentPage >= totalPages - 1;
}

function setLoading(isLoading) {
  if (loaderRef) loaderRef.hidden = !isLoading;
  if (body) body.setAttribute("aria-busy", isLoading ? "true" : "false");
}

function bindControls() {
  if (prevBtn) {
    prevBtn.addEventListener("click", (event) => {
      if (currentPage > 0) {
        currentPage -= 1;
        renderPage();
      }
      suppressHoverUntilLeave(event.currentTarget);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (event) => {
      if (currentPage < getTotalPages() - 1) {
        currentPage += 1;
        renderPage();
      }
      suppressHoverUntilLeave(event.currentTarget);
    });
  }

  if (dotsRef) {
    dotsRef.addEventListener("click", (event) => {
      const li = event.target.closest("li[data-page]");
      if (!li) return;
      const page = Number.parseInt(li.dataset.page, 10);
      if (Number.isFinite(page) && page !== currentPage) {
        currentPage = page;
        renderPage();
      }
    });
  }

  const reRender = () => {
    const visible = getVisibleCount();
    const firstVisibleIndex = currentPage * visible;
    currentPage = Math.floor(firstVisibleIndex / visible);
    renderPage();
  };

  mqDesktop.addEventListener("change", reRender);
  mqTablet.addEventListener("change", reRender);
}

export async function initBestsellers() {
  if (!listRef) {
    setLoading(false);
    return;
  }

  setLoading(true);

  try {
    const response = await apiClient.get("/bouquets/bestsellers");
    const data = response.data;
    allItems = Array.isArray(data) ? data : (data?.data ?? []);
    currentPage = 0;
    renderPage();
  } catch (error) {
    showErrorNotification(
      extractErrorMessage(error, "Unable to load bestsellers right now."),
    );
  } finally {
    setLoading(false);
  }

  bindControls();
}
