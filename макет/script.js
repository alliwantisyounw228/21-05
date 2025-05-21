let selected = {
  style: null,
  shape: null,
  area: null
};

document.querySelectorAll('.options').forEach(section => {
  section.addEventListener('click', e => {
    const option = e.target.closest('.option');
    if (option) {
      const group = section.id;

      section.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');

      const value = option.dataset.value;
      const price = option.dataset.price ? parseInt(option.dataset.price) : null;

      selected[group] = { value, price };
    }
  });
});

function calculatePrice() {
  const resultEl = document.getElementById('result');
  resultEl.style.color = "#000";

  if (!selected.style || !selected.shape || !selected.area) {
    resultEl.innerText = "Пожалуйста, выберите все параметры!";
    resultEl.style.color = "red";
    return;
  }

  const isCustom = [selected.style, selected.shape, selected.area].some(item => item.value === "other");

  if (isCustom) {
    resultEl.innerHTML = `
      <span style="color: black; font-weight: bold;">
        Для индивидуального проекта кухни с выбранными параметрами
        пожалуйста, <a href="https://ваш-сайт.рф" target="_blank" style="color: #d00; text-decoration: underline;">перейдите на сайт</a>
        и свяжитесь с дизайнером.
      </span>
    `;
    return;
  }

  const total = selected.style.price + selected.shape.price + selected.area.price;
  resultEl.innerText = `Примерная стоимость: ${total.toLocaleString()} ₽`;
}