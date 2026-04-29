function initSlider(sectionSelector, listSelector) {
  const section = document.querySelector(sectionSelector);
  if (!section) return;

  const list = section.querySelector(listSelector);
  const prevBtn = section.querySelector('[data-action="prev"]');
  const nextBtn = section.querySelector('[data-action="next"]');

  if (nextBtn && prevBtn && list) {
    const getItemWidth = () => {
      const item = list.querySelector("li, .feedback-item");
      if (!item) return list.clientWidth;
      const gap = parseFloat(getComputedStyle(list).gap) || 0;
      return item.offsetWidth + gap;
    };

    nextBtn.addEventListener("click", () => {
      list.scrollBy({ left: getItemWidth(), behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
      list.scrollBy({ left: -getItemWidth(), behavior: "smooth" });
    });
  }
}

initSlider("#bestsellers", ".bestsellers-gallery");
initSlider("#feedback", ".feedback-list");
