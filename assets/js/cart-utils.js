/**
 * Updates the cart count displayed in the header by fetching cart data from localStorage.
 */
export function updateCartCountFromStorage() {
  // Step 1: Retrieve the cart data from localStorage
  // `localStorage.getItem("cart")` fetches the stored cart data as a string.
  // `JSON.parse` converts the string into an array of cart items. If the cart is empty or not set, use an empty array as a fallback.
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Step 2: Calculate the total quantity of items in the cart
  // `reduce` iterates through the cart array and sums up the `quantity` property of each item.
  // `acc` is the accumulator for the total, and `item.quantity` is the quantity of each cart item.
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Step 3: Select the element in the DOM where the cart count is displayed
  // `document.querySelector("#cart-count")` selects the element with the ID `cart-count`.
  const cartCountElement = document.querySelector("#cart-count");

  // Step 4: Update the cart count display
  // If the `cartCountElement` exists in the DOM, update its `textContent` to show the total quantity.
  if (cartCountElement) {
    cartCountElement.textContent = totalQuantity;
  }
}
