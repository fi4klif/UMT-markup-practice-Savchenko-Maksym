import { apiClient } from "./apiClient.js";
import {
  showErrorNotification,
  showSuccessNotification,
} from "./notifications.js";
import { extractErrorMessage } from "./utils.js";

const orderModalWrapper = document.getElementById("order-modal-wrapper");

export function openOrderModal() {
  if (orderModalWrapper) {
    orderModalWrapper.classList.add("is-open");
    document.body.classList.add("modal-open");
  }
}

export function closeOrderModal() {
  if (orderModalWrapper) {
    orderModalWrapper.classList.remove("is-open");
    document.body.classList.remove("modal-open");
  }
}

export default function initOrderModal() {
  if (!orderModalWrapper) return;

  const closeBtn = orderModalWrapper.querySelector(".modal-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeOrderModal);
  }

  orderModalWrapper.addEventListener("click", (e) => {
    if (e.target === orderModalWrapper) {
      closeOrderModal();
    }
  });

  const orderBtn = orderModalWrapper.querySelector(".order-btn");
  const userName = document.getElementById("userName");
  const userPhone = document.getElementById("userPhone");
  const userAddress = document.getElementById("userAddress");
  const agreement = document.getElementById("orderAgreement");
  const userMessage = document.getElementById("userMessage");

  [userName, userPhone, userAddress, agreement].forEach((el) => {
    if (el) {
      el.addEventListener("input", () => el.classList.remove("is-error"));
      el.addEventListener("change", () => el.classList.remove("is-error"));
    }
  });

  if (orderBtn) {
    orderBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      let isValid = true;
      let errorMessage = "";

      [userName, userPhone, userAddress, agreement].forEach((el) =>
        el?.classList.remove("is-error"),
      );

      if (!userName?.value.trim() || userName.value.trim().length < 2) {
        userName.classList.add("is-error");
        isValid = false;
        if (!errorMessage)
          errorMessage = "Please enter a valid name (min 2 characters).";
      }

      const phoneRegex = /^\+?[0-9\s\-\(\)]{9,20}$/;
      if (
        !userPhone?.value.trim() ||
        !phoneRegex.test(userPhone.value.trim())
      ) {
        userPhone.classList.add("is-error");
        isValid = false;
        if (!errorMessage) errorMessage = "Please enter a valid phone number.";
      }

      if (!userAddress?.value.trim() || userAddress.value.trim().length < 5) {
        userAddress.classList.add("is-error");
        isValid = false;
        if (!errorMessage)
          errorMessage = "Please enter a valid address (min 5 characters).";
      }

      if (!agreement?.checked) {
        agreement.classList.add("is-error");
        isValid = false;
        if (!errorMessage)
          errorMessage = "You must agree to the Terms and Conditions.";
      }

      if (!isValid) {
        showErrorNotification(errorMessage);
        return;
      }

      try {
        orderBtn.disabled = true;
        await apiClient.post("/order", {
          name: userName.value.trim(),
          phone: userPhone.value.trim(),
          address: userAddress.value.trim(),
          message: userMessage?.value.trim() || "",
        });

        showSuccessNotification("Order placed successfully!");

        [userName, userPhone, userAddress, userMessage].forEach((el) => {
          if (el) el.value = "";
        });

        if (agreement) {
          agreement.checked = false;
          const iconUnchecked =
            agreement.parentElement.querySelector(".icon-unchecked");
          const iconChecked =
            agreement.parentElement.querySelector(".icon-checked");
          if (iconUnchecked && iconChecked) {
            iconUnchecked.style.display = "block";
            iconChecked.style.display = "none";
          }
        }

        closeOrderModal();
      } catch (error) {
        showErrorNotification(extractErrorMessage(error, "Order failed."));
      } finally {
        orderBtn.disabled = false;
      }
    });
  }
}
