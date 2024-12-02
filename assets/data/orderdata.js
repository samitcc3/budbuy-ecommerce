export class OrderData {
  constructor() {
    // Load orders from localStorage or use default list
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    this.orders =
      storedOrders.length > 0
        ? storedOrders
        : [
            // Order 1: Multiple products in the same order
            {
              order_id: 1,
              user_id: 2,
              product_id: 1,
              quantity: 2,
              total_price: 799.98,
              status: "paid",
              date: "2024-11-24T10:00:00Z",
              shipping_address: {
                name: "Jane Smith",
                address: "456 Queen Street",
                city: "Mississauga",
                postal_code: "L5B3Y5",
                country: "Canada",
              },
              payment_info: {
                method: "Credit Card",
                card_number: "**** **** **** 1234",
                cvv: "***",
                exp_date: "2026-11",
              },
            },
            {
              order_id: 1,
              user_id: 2,
              product_id: 2,
              quantity: 1,
              total_price: 999.99,
              status: "paid",
              date: "2024-11-24T10:00:00Z",
              shipping_address: {
                name: "Jane Smith",
                address: "456 Queen Street",
                city: "Mississauga",
                postal_code: "L5B3Y5",
                country: "Canada",
              },
              payment_info: {
                method: "Credit Card",
                card_number: "**** **** **** 1234",
                cvv: "***",
                exp_date: "2026-11",
              },
            },
            {
              order_id: 1,
              user_id: 2,
              product_id: 3,
              quantity: 1,
              total_price: 499.99,
              status: "paid",
              date: "2024-11-24T10:00:00Z",
              shipping_address: {
                name: "Jane Smith",
                address: "456 Queen Street",
                city: "Mississauga",
                postal_code: "L5B3Y5",
                country: "Canada",
              },
              payment_info: {
                method: "Credit Card",
                card_number: "**** **** **** 1234",
                cvv: "***",
                exp_date: "2026-11",
              },
            },
            // Order 2: Single product
            {
              order_id: 2,
              user_id: 3,
              product_id: 4,
              quantity: 3,
              total_price: 509.97,
              status: "shipped",
              date: "2024-11-23T14:00:00Z",
              shipping_address: {
                name: "Michael Brown",
                address: "789 King Street",
                city: "Brampton",
                postal_code: "L6Y2G6",
                country: "Canada",
              },
              payment_info: {
                method: "PayPal",
                card_number: null,
                cvv: null,
                exp_date: null,
              },
            },
            // Order 3: Single product
            {
              order_id: 3,
              user_id: 4,
              product_id: 6,
              quantity: 2,
              total_price: 589.99,
              status: "ready",
              date: "2024-11-22T15:00:00Z",
              shipping_address: {
                name: "Admin User",
                address: "111 Admin Street",
                city: "Ottawa",
                postal_code: "K1A0B1",
                country: "Canada",
              },
              payment_info: {
                method: "Credit Card",
                card_number: "**** **** **** 5678",
                cvv: "***",
                exp_date: "2025-08",
              },
            },
            // Order 4: Single product user 4 new order
            {
              order_id: 4,
              user_id: 4,
              product_id: 6,
              quantity: 1,
              total_price: 666.99,
              status: "delivered",
              date: "2024-10-15T15:00:00Z",
              shipping_address: {
                name: "Admin User",
                address: "111 Admin Street",
                city: "Ottawa",
                postal_code: "K1A0B1",
                country: "Canada",
              },
              payment_info: {
                method: "Credit Card",
                card_number: "**** **** **** 5678",
                cvv: "***",
                exp_date: "2025-08",
              },
            },
          ];

    // Save initial orders to localStorage
    this.saveToStorage();
  }

  // Save orders to localStorage
  saveToStorage() {
    localStorage.setItem("orders", JSON.stringify(this.orders));
  }

  // Get all orders
  getAllOrders() {
    return this.orders;
  }

  // Add a new order
  addOrder(newOrder) {
    // If order_id already exists, use it; otherwise, generate a new one
    if (!newOrder.order_id) {
      const maxId = Math.max(...this.orders.map((order) => order.order_id), 0);
      newOrder.order_id = maxId + 1; // Assign next order_id
    }

    newOrder.date = new Date().toISOString();
    this.orders.push(newOrder);
    this.saveToStorage();
    return newOrder;
  }

  // Edit the status of an order
  editOrderStatus(orderId, newStatus) {
    const ordersToEdit = this.orders.filter(
      (order) => order.order_id === orderId
    );
    if (ordersToEdit.length > 0) {
      ordersToEdit.forEach((order) => (order.status = newStatus));
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Get orders by user_id
  getOrdersByUser(userId) {
    return this.orders.filter((order) => order.user_id === userId);
  }
}
