export function updateCartCountFromStorage() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartCountElement = document.querySelector("#cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = totalQuantity;
  }
}
