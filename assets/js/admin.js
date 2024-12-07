import { UserData } from "../data/usersdata.js";
import { ProductData } from "../data/productdata.js";
import { OrderData } from "../data/orderdata.js";

document.addEventListener("DOMContentLoaded", () => {
  // Instantiate data classes
  const userData = new UserData();
  const productData = new ProductData();
  const orderData = new OrderData();

  // Load users
  function loadUsers() {
    const usersTableBody = document.querySelector("#users-management tbody");
    usersTableBody.innerHTML = ""; // Clear table before appending

    userData.getAllUsers(false).forEach((user) => {
      // Get all users, including inactive ones
      const status = user.is_active ? "Active" : "Inactive";
      const row = `
      <tr>
        <td>${user.user_id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.role}</td>
        <td>${status}</td>
        <td>
          <button class="btn btn-sm ${
            user.is_active ? "btn-danger" : "btn-success"
          } toggle-status" data-id="${user.user_id}">
            ${user.is_active ? "Deactivate" : "Activate"}
          </button>
        </td>
      </tr>
    `;
      usersTableBody.insertAdjacentHTML("beforeend", row);
    });

    // Add event listeners for status toggles
    document.querySelectorAll(".toggle-status").forEach((button) => {
      button.addEventListener("click", (e) => {
        const userId = parseInt(e.target.getAttribute("data-id"));
        const user = userData.users.find((u) => u.user_id === userId);

        if (user.is_active) {
          const success = userData.deactivateUser(userId);
          if (success) alert(`User ${userId} deactivated successfully.`);
        } else {
          const success = userData.activateUser(userId);
          if (success) alert(`User ${userId} activated successfully.`);
        }

        loadUsers(); // Refresh the user list
      });
    });
  }

  // Load products
  function loadProducts() {
    const productsTableBody = document.querySelector(
      "#products-management tbody"
    );
    productsTableBody.innerHTML = ""; // Clear table before appending

    productData.getAllProducts().forEach((product) => {
      const row = `
        <tr>
          <td>${product.product_id}</td>
          <td>${product.name}</td>
          <td>${product.category}</td>
          <td>$${product.price.toFixed(2)}</td>
          <td>
            <input type="number" class="form-control form-control-sm stock-input" 
                   data-sku="${product.sku}" value="${product.stock}" />
          </td>
          <td>
            <input type="number" class="form-control form-control-sm discount-input" 
                   data-sku="${product.sku}" value="${
        product.discount
      }" min="0" max="100" step="0.01" />
          </td>
          <td>
            <input type="text" class="form-control form-control-sm discount-name-input" 
                   data-sku="${product.sku}" value="${
        product.discount_name || ""
      }" />
          </td>
          <td>
            <button class="btn btn-primary btn-sm update-product" data-sku="${
              product.sku
            }">Update</button>
          </td>
        </tr>
      `;
      productsTableBody.insertAdjacentHTML("beforeend", row);
    });

    // Add event listeners for product updates
    document.querySelectorAll(".update-product").forEach((button) => {
      button.addEventListener("click", (e) => {
        const sku = parseInt(e.target.getAttribute("data-sku"));
        const newStock = parseInt(
          document.querySelector(`.stock-input[data-sku="${sku}"]`).value
        );
        const newDiscount = parseFloat(
          document.querySelector(`.discount-input[data-sku="${sku}"]`).value
        );
        const newDiscountName = document.querySelector(
          `.discount-name-input[data-sku="${sku}"]`
        ).value;

        if (!isNaN(newStock) && newStock >= 0) {
          productData.editStock(sku, newStock);
        }
        if (!isNaN(newDiscount) && newDiscount >= 0) {
          productData.updateDiscount(sku, newDiscount, newDiscountName);
        }

        alert(`Product SKU: ${sku} updated successfully!`);
        loadProducts(); // Refresh the table
      });
    });
  }

  // Load orders
  function loadOrders() {
    const ordersTableBody = document.querySelector("#orders-management tbody");
    ordersTableBody.innerHTML = ""; // Clear table before appending

    // Group orders by `order_id`
    const groupedOrders = {};
    orderData.getAllOrders().forEach((order) => {
      if (!groupedOrders[order.order_id]) {
        groupedOrders[order.order_id] = {
          order_id: order.order_id,
          user_id: order.user_id,
          total_price: 0,
          status: order.status,
          shipping_address: order.shipping_address,
        };
      }
      groupedOrders[order.order_id].total_price += order.total_price;
    });

    // Populate the table with grouped orders
    Object.values(groupedOrders).forEach((order) => {
      const row = `
        <tr>
          <td>${order.order_id}</td>
          <td>${order.user_id}</td>
          <td>$${order.total_price.toFixed(2)}</td>
          <td>${order.status}</td>
          <td>${order.shipping_address.name}, ${
        order.shipping_address.address
      }</td>
          <td>
            <select class="form-control order-status" data-id="${
              order.order_id
            }">
              <option value="paid" ${
                order.status === "paid" ? "selected" : ""
              }>Paid</option>
              <option value="ready" ${
                order.status === "ready" ? "selected" : ""
              }>Ready</option>
              <option value="ready to ship" ${
                order.status === "ready to ship" ? "selected" : ""
              }>Ready to Ship</option>
              <option value="shipped" ${
                order.status === "shipped" ? "selected" : ""
              }>Shipped</option>
              <option value="delivered" ${
                order.status === "delivered" ? "selected" : ""
              }>Delivered</option>
            </select>
          </td>
        </tr>
      `;
      ordersTableBody.insertAdjacentHTML("beforeend", row);
    });

    // Add event listeners for status updates
    document.querySelectorAll(".order-status").forEach((dropdown) => {
      dropdown.addEventListener("change", (e) => {
        const orderId = parseInt(e.target.getAttribute("data-id"));
        const newStatus = e.target.value;

        // Update order status
        orderData.editOrderStatus(orderId, newStatus);
        alert(`Order ${orderId} updated to ${newStatus}.`);
        loadOrders(); // Refresh the table
      });
    });
  }

  // Toggle collapsible sections
  document.querySelectorAll(".collapsible").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      const content = button.nextElementSibling;
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    });
  });

  // Initial data load
  loadUsers();
  loadProducts();
  loadOrders();
});
