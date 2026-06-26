export function initCheckboxes() {
  const checkboxInputs = document.querySelectorAll(".checkbox-input");

  checkboxInputs.forEach((checkbox) => {
    const checkboxIcon = checkbox
      .closest(".checkbox-label")
      .querySelector(".checkbox-icon");
    const iconUnchecked = checkboxIcon.querySelector(".icon-unchecked");
    const iconChecked = checkboxIcon.querySelector(".icon-checked");

    // Update icons on load (in case of form pre-population)
    updateCheckboxIcon(checkbox, iconUnchecked, iconChecked);

    // Update icons on change
    checkbox.addEventListener("change", () => {
      updateCheckboxIcon(checkbox, iconUnchecked, iconChecked);
    });

    // Update icons on click (for better UX)
    checkboxIcon.addEventListener("click", (e) => {
      e.preventDefault();
      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event("change"));
    });
  });
}

function updateCheckboxIcon(checkbox, iconUnchecked, iconChecked) {
  if (checkbox.checked) {
    iconUnchecked.style.display = "none";
    iconChecked.style.display = "block";
  } else {
    iconUnchecked.style.display = "block";
    iconChecked.style.display = "none";
  }
}
