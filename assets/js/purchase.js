import { CartData } from "../data/cart.js";
import { Session } from "../data/session.js";
import { OrderData } from "../data/orderdata.js";

document.addEventListener("DOMContentLoaded", () => {
  const cartData = new CartData();
  const session = new Session();
  const orderData = new OrderData();

  const loggedInUser = session.getSession();

  // Verify if a user is logged in
  if (!loggedInUser) {
    alert("You need to log in to place an order.");
    window.location.href = "login.html";
    return;
  }

  const cartItems = cartData.getAllItems();
  const cartContainer = document.querySelector("#cart-container tbody");
  const cartTotalElement = document.querySelector("#cart-total");
  const checkoutForm = document.querySelector("#checkout-form");
  const paymentMethod = document.querySelector("#payment-method");
  const cardDetails = document.querySelector("#card-details");

  // If no items in the cart, display message
  if (cartItems.length === 0) {
    cartContainer.innerHTML = `
      <tr>
        <td colspan="5" class="text-center">Your cart is empty.</td>
      </tr>
    `;
    return;
  }

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
          }">Remove</button>
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

    if (cartItems.length === 0) {
      alert("Your cart is empty. Add items to place an order.");
      return;
    }

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

    // Generate a new order ID for the transaction
    const allOrders = orderData.getAllOrders();
    const newOrderId =
      allOrders.length > 0
        ? Math.max(...allOrders.map((o) => o.order_id)) + 1
        : 1;

    // Prepare orders for all cart items under the same order ID
    const newOrders = cartItems.map((item) => ({
      order_id: newOrderId, // Use the same order ID for all items
      user_id: loggedInUser.user_id,
      product_id: item.product_id,
      quantity: item.quantity,
      total_price: item.subtotal,
      status: "paid",
      date: new Date().toISOString(),
      shipping_address: shippingAddress,
      payment_info: paymentInfo,
    }));

    // Save orders to the database
    try {
      newOrders.forEach((order) => orderData.addOrder(order));
      alert("Order placed successfully!");

      // Clear cart after successful save
      cartData.clearCart();
      window.location.href = "index.html";
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Failed to place the order. Please try again.");
    }
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
