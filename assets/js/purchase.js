import { CartData } from "../data/cart.js";
import { Session } from "../data/session.js";

document.addEventListener("DOMContentLoaded", () => {
  const cartData = new CartData();
  const session = new Session(); // Instantiate the session handler
  const loggedInUser = session.getSession(); // Get current session
  const cartItems = cartData.getAllItems();
  const cartContainer = document.querySelector("#cart-container tbody");
  const cartTotalElement = document.querySelector("#cart-total");
  const checkoutForm = document.querySelector("#checkout-form");
  const paymentMethod = document.querySelector("#payment-method");
  const cardDetails = document.querySelector("#card-details");

  // Verify if a user is logged in
  if (!loggedInUser) {
    alert("You need to log in to place an order.");
    window.location.href = "login.html"; // Redirect to login page
    return;
  }

  console.log("Logged-in user:", loggedInUser); // Debugging session

  // Hide card details if PayPal is selected
  paymentMethod.addEventListener("change", () => {
    cardDetails.style.display =
      paymentMethod.value === "PayPal" ? "none" : "block";
  });

  let total = 0;

  // Render cart items
  cartItems.forEach((item) => {
    const row = `
      <tr>
          <td>${item.name}</td>
          <td>$${item.price.toFixed(2)}</td>
          <td>${item.quantity}</td>
          <td>$${item.subtotal.toFixed(2)}</td>
          <td>
              <button class="btn btn-danger btn-sm remove-item" data-id="${
                item.product_id
              }">
                  Remove
              </button>
          </td>
      </tr>
    `;
    cartContainer.insertAdjacentHTML("beforeend", row);
    total += item.subtotal;
  });
  cartTotalElement.textContent = total.toFixed(2);

  // Submit the order
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect shipping information
    const shippingAddress = {
      name: document.getElementById("name").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      postal_code: document.getElementById("postal-code").value,
      country: document.getElementById("country").value,
    };

    // Collect payment information
    const paymentInfo =
      paymentMethod.value === "PayPal"
        ? { method: "PayPal", card_number: null, cvv: null, exp_date: null }
        : {
            method: paymentMethod.value,
            card_number: document.getElementById("card-number").value,
            cvv: document.getElementById("cvv").value,
            exp_date: document.getElementById("exp-date").value,
          };

    // Get or initialize orders in localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrderId =
      orders.length > 0 ? Math.max(...orders.map((o) => o.order_id)) + 1 : 1;

    // Add each cart item to the orders, sharing the same order_id
    cartItems.forEach((item) => {
      const newOrder = {
        order_id: newOrderId, // Same order ID for all items in this order
        user_id: loggedInUser.user_id, // Use the logged-in user's ID
        product_id: item.product_id,
        quantity: item.quantity,
        total_price: item.subtotal,
        status: "paid",
        date: new Date().toISOString(),
        shipping_address: shippingAddress,
        payment_info: paymentInfo,
      };
      orders.push(newOrder);
    });

    // Save updated orders to localStorage
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear cart after successful order placement
    cartData.clearCart();
    alert("Order placed successfully!");
    window.location.href = "index.html"; // Redirect to homepage
  });

  // Remove an item from the cart
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.getAttribute("data-id"));
      cartData.removeFromCart(productId);
      window.location.reload(); // Refresh the page to show updated cart
    });
  });
});
