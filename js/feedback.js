import { apiClient } from "./apiClient.js";
import { showErrorNotification } from "./notifications.js";
import { extractErrorMessage, suppressHoverUntilLeave } from "./utils.js";

const listRef = document.getElementById("feedback-list");
const loaderRef = document.getElementById("feedback-loader");
const body = document.querySelector(".feedback-wrapper");
const prevBtn = document.querySelector("[data-feedback-prev]");
const nextBtn = document.querySelector("[data-feedback-next]");

export const mqDesktop = window.matchMedia("(min-width: 1440px)");
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

function buildItemMarkup(item) {
  return `
        <li class="feedback-item">
            <blockquote>
                <p> ${item.text ?? ""}</p>
                <cite> ${item.author ?? ""}</cite>
            </blockquote> 
        </li>`;
}
function updateNavState(totalPages) {
  if (prevBtn) prevBtn.disabled = currentPage <= 0;
  if (nextBtn) nextBtn.disabled = currentPage >= totalPages - 1;
}

function renderPage() {
  if (!listRef) return;

  const visible = getVisibleCount();
  const totalPages = getTotalPages();
  currentPage = Math.max(0, Math.min(currentPage, totalPages - 1));

  const start = currentPage * visible;
  const slice = allItems.slice(start, start + visible);

  listRef.replaceChildren();

  for (const item of slice) {
    listRef.insertAdjacentHTML("beforeend", buildItemMarkup(item));
  }

  updateNavState(totalPages);
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

  const reRender = () => {
    const visible = getVisibleCount();
    const firstVisibleIndex = currentPage * visible;
    currentPage = Math.floor(firstVisibleIndex / visible);
    renderPage();
  };
  mqDesktop.addEventListener("change", reRender);
  mqTablet.addEventListener("change", reRender);
}

export async function initFeedback() {
  if (!listRef) {
    setLoading(false);
    return;
  }

  setLoading(true);

  try {
    const response = await apiClient.get("/feedback");
    const data = response.data;
    allItems = Array.isArray(data) ? data : (data?.data ?? []);
    currentPage = 0;
    renderPage();
  } catch (error) {
    showErrorNotification(
      extractErrorMessage(error, "Unable to load testimonials right now."),
    );
  } finally {
    setLoading(false);
  }

  bindControls();
}
