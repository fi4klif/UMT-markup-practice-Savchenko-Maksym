import { apiClient } from "./apiClient.js";
import { showErrorNotification } from "./notifications.js";
import {
  extractErrorMessage,
  formatPriceUsd,
  resolveImageUrl,
  suppressHoverUntilLeave,
} from "./utils.js";

const bouquetsList = document.getElementById("bouquets-list");
const bouquetsListShell = document.querySelector(".bouquets-list-shell");
const loaderRef = document.getElementById("bouquets-loader");
const showMoreButton = document.querySelector(".bouquets-btn");
const endMessage = document.querySelector(".bouquets-end-message");

const itemsPerPage = 8;
const showMoreButtonDefaultLabel = "Show More";
const showMoreButtonLoadingLabel = "Loading...";

const state = {
  currentPage: 0,
  perPage: itemsPerPage,
  hasMore: true,
};

function createBouquetserHTML(product) {
  const photoURL = product.photoURL || product.img1x;
  const photoURL2x = product.photoURL2x || product.img2x;
  const image1x = resolveImageUrl(photoURL);
  const image2x = resolveImageUrl(photoURL2x);
  const altText = product.alt ?? product.title ?? "";

  return `
		<li class="bouquets-item">
			<article class="product-card" tabindex="0" role="button" data-product-trigger>
				<img loading="lazy" src="${image1x}" ${image2x ? `srcset="${image2x} 2x"` : ""} class="bouquets-card-image" alt="${altText}">
				<div class="product-card-content">
					<div class="product-card-wrapper">
						<h3 class="product-card-title"> ${product.title ?? ""}</h3>
						<p class="product-card-text"> ${product.description ?? ""}</p>
					</div>
					<p class="product-card-price"> ${formatPriceUsd(product.price)}</p>
				</div>
			</article>
		</li>`;
}

function setShowMoreButtonLoading(isLoading) {
  if (!showMoreButton) return;
  showMoreButton.disabled = isLoading;
  showMoreButton.classList.toggle("is-loading", isLoading);
  showMoreButton.textContent = isLoading
    ? showMoreButtonLoadingLabel
    : showMoreButtonDefaultLabel;
}

function setBouquetsInitialLoading(isLoading) {
  if (loaderRef) loaderRef.hidden = !isLoading;
  if (bouquetsListShell)
    bouquetsListShell.setAttribute("aria-busy", isLoading ? "true" : "false");
}

function updateEndState() {
  if (showMoreButton) showMoreButton.hidden = !state.hasMore;
  if (endMessage) endMessage.hidden = state.hasMore || state.currentPage === 0;
}

function appendChunk(items) {
  if (!items.length) return;
  const chunkMarkup = items
    .map((product) => createBouquetserHTML(product))
    .join("");
  bouquetsList.insertAdjacentHTML("beforeend", chunkMarkup);
}

async function fetchPage(page) {
  const response = await apiClient.get(
    `/bouquets?_page=${page}&_per_page=${state.perPage}`,
  );
  const data = response.data;

  let itemsArray = [];

  if (data && Array.isArray(data.data)) {
    itemsArray = data.data;
    state.hasMore = data.next !== null;
  } else if (Array.isArray(data)) {
    itemsArray = data;
    state.hasMore = itemsArray.length === state.perPage;
  } else if (data && Array.isArray(data.bouquets)) {
    itemsArray = data.bouquets;
    state.hasMore = itemsArray.length === state.perPage;
  }

  if (!itemsArray || itemsArray.length === 0) {
    state.hasMore = false;
    return [];
  }

  return itemsArray;
}

async function loadNextPage() {
  const targetPage = state.currentPage + 1;
  const items = await fetchPage(targetPage);

  if (items.length > 0) {
    appendChunk(items);
    state.currentPage = targetPage;
  } else {
    state.hasMore = false;
  }
}

async function loadInitial() {
  if (!bouquetsList) return;

  setBouquetsInitialLoading(true);
  bouquetsList.replaceChildren();
  state.currentPage = 0;
  state.hasMore = true;

  if (showMoreButton) showMoreButton.hidden = true;
  if (endMessage) endMessage.hidden = true;

  try {
    await loadNextPage();
  } catch (error) {
    showErrorNotification(
      extractErrorMessage(error, "Unable to load bouquets right now."),
    );
  } finally {
    setBouquetsInitialLoading(false);
    updateEndState();
  }
}

async function handleShowMoreClick() {
  if (!state.hasMore) return;
  setShowMoreButtonLoading(true);
  try {
    await loadNextPage();
  } catch (error) {
    showErrorNotification(
      extractErrorMessage(error, "Unable to load more bouquets right now."),
    );
  } finally {
    setShowMoreButtonLoading(false);
    updateEndState();
    suppressHoverUntilLeave(showMoreButton);
  }
}

export function initBouquets() {
  if (showMoreButton) {
    showMoreButton.addEventListener("click", handleShowMoreClick);
  }
  loadInitial();
}
