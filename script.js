const filters = document.querySelectorAll("[data-filter]");
const serviceCards = document.querySelectorAll("[data-pet]");
const cartPanel = document.querySelector("[data-cart-panel]");
const cartItems = document.querySelector("[data-cart-items]");
const cartCount = document.querySelector("[data-cart-count]");
const cartTotal = document.querySelector("[data-cart-total]");
const cart = [];

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle("active", item === button));
    serviceCards.forEach((card) => {
      const pets = card.dataset.pet.split(" ");
      card.hidden = filter !== "all" && !pets.includes(filter);
    });
  });
});

document.querySelectorAll("[data-add-cart]").forEach((button) => {
  button.addEventListener("click", () => {
    cart.push({
      name: button.dataset.addCart,
      price: Number(button.dataset.price)
    });
    renderCart();
    openCart();
  });
});

document.querySelectorAll("[data-open-cart]").forEach((button) => {
  button.addEventListener("click", openCart);
});

document.querySelectorAll("[data-close-cart]").forEach((button) => {
  button.addEventListener("click", closeCart);
});

function openCart() {
  cartPanel.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartPanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
}

function renderCart() {
  cartItems.innerHTML = "";
  if (cart.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "还没有加入商品";
    cartItems.append(empty);
  } else {
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${item.name}</span><strong>¥${item.price}</strong>`;
      cartItems.append(li);
    });
  }
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartCount.textContent = String(cart.length);
  cartTotal.textContent = `¥${total}`;
}

document.querySelector("[data-booking-form]").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const owner = data.get("owner").trim();
  const pet = data.get("pet");
  const service = data.get("service");
  const date = data.get("date");
  const output = document.querySelector("[data-booking-output]");

  if (!owner || !pet || !service || !date) {
    output.textContent = "请补全预约信息。";
    return;
  }

  output.textContent = `${owner}，已为你的${pet}生成 ${date} 的「${service}」预约卡。`;
});

renderCart();
