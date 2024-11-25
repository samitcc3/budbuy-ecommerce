import { OrderData } from "./orderdata.js"; // Import OrderData class

export class CartData {
  constructor() {
    // Load cart from localStorage or initialize as an empty array
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    this.cart = storedCart;
  }

  // Save the cart back to localStorage
  saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  // Get all items in the cart
  getAllItems() {
    return this.cart;
  }

  // Add or update a product in the cart
  addToCart(product, quantity) {
    const existingProduct = this.cart.find(
      (item) => item.product_id === product.product_id
    );

    if (existingProduct) {
      // Update quantity if product exists
      existingProduct.quantity += quantity;
      existingProduct.subtotal = existingProduct.quantity * product.price;
    } else {
      // Add new product to the cart
      this.cart.push({
        product_id: product.product_id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        subtotal: product.price * quantity,
      });
    }

    // Save changes to localStorage
    this.saveToStorage();
    this.updateCartCount();
  }

  // Remove a product from the cart by product_id
  removeFromCart(product_id) {
    this.cart = this.cart.filter((item) => item.product_id !== product_id);
    this.saveToStorage();
    this.updateCartCount();
  }

  // Clear the entire cart
  clearCart() {
    this.cart = [];
    this.saveToStorage();
    this.updateCartCount();
  }

  // Get total quantity of items in the cart
  getTotalQuantity() {
    return this.cart.reduce((acc, item) => acc + item.quantity, 0);
  }

  // Update the cart count on the navbar
  updateCartCount() {
    const cartCountElement = document.querySelector("#cart-count");
    if (cartCountElement) {
      const totalQuantity = this.getTotalQuantity();
      cartCountElement.textContent = totalQuantity > 0 ? totalQuantity : "";
    }
  }

  // Send cart to OrderData and clear cart
  sendCartToOrders(shippingInfo, paymentInfo) {
    const orders = new OrderData(); // Instance of OrderData
    const cartItems = this.getAllItems();

    if (cartItems.length === 0) {
      return alert(
        "Your cart is empty. Add some products before proceeding to checkout."
      );
    }

    // Generate a new order ID
    const newOrderId = orders.generateNewOrderId();

    // Add each cart item as part of the order
    cartItems.forEach((item) => {
      orders.addOrder({
        order_id: newOrderId,
        product_id: item.product_id,
        user_id: shippingInfo.user_id, // Assume user_id is passed in shippingInfo
        quantity: item.quantity,
        total_price: item.subtotal,
        status: "Paid", // Initial status
        date: new Date().toISOString(),
        shipping_address: shippingInfo,
        payment_info: paymentInfo,
      });
    });

    // Clear the cart after successful order placement
    this.clearCart();
    alert("Thank you for your purchase! Your order has been placed.");
  }
}
