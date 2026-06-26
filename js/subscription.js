export function initSubscriptionForm() {
  const subscriptionForm = document.getElementById("subscription-form");

  if (!subscriptionForm) return;

  subscriptionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = subscriptionForm.querySelector("#subscriptionEmail");
    const agreementCheckbox = subscriptionForm.querySelector(
      "#subscriptionAgreement",
    );
    const errorMessage = subscriptionForm.querySelector(".error-message");

    let isValid = true;

    // Clear previous errors
    errorMessage.textContent = "";

    // Validate email
    if (!emailInput.value.trim()) {
      errorMessage.textContent = "Email is required";
      emailInput.classList.add("is-error");
      isValid = false;
    } else {
      emailInput.classList.remove("is-error");
    }

    // Validate agreement
    if (!agreementCheckbox.checked) {
      errorMessage.textContent = "You must agree to the Privacy Policy";
      agreementCheckbox.classList.add("is-error");
      isValid = false;
    } else {
      agreementCheckbox.classList.remove("is-error");
    }

    if (isValid) {
      console.log("Subscription submitted:", emailInput.value);
      // Here you would send the data to your server
      emailInput.value = "";
      agreementCheckbox.checked = false;

      // Update checkbox display
      const checkboxIcon = agreementCheckbox
        .closest(".checkbox-label")
        .querySelector(".checkbox-icon");
      const iconUnchecked = checkboxIcon.querySelector(".icon-unchecked");
      const iconChecked = checkboxIcon.querySelector(".icon-checked");
      iconUnchecked.style.display = "block";
      iconChecked.style.display = "none";
    }
  });

  // Remove errors on input
  const inputs = subscriptionForm.querySelectorAll("input, .checkbox-input");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("is-error");
    });
    input.addEventListener("change", () => {
      input.classList.remove("is-error");
    });
  });
}
