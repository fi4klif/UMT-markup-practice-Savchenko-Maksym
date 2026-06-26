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

  const requiredInputs = orderModalWrapper.querySelectorAll("input[required]");

  requiredInputs.forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("is-error");
    });
  });

  if (orderBtn) {
    orderBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let isValid = true;

      requiredInputs.forEach((input) => {
        const value = input.value.trim();

        if (value === "") {
          input.classList.add("is-error");
          isValid = false;
        }
      });
      if (isValid) {
        console.log("Замовлення успішно оформлено!");

        const allInputs = orderModalWrapper.querySelectorAll("input, textarea");
        allInputs.forEach((input) => (input.value = ""));

        closeOrderModal();
      }
    });
  }
}
