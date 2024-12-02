import { OrderData } from "../data/orderdata.js";
import { Session } from "../data/session.js";
import { ProductData } from "../data/productdata.js";

document.addEventListener("DOMContentLoaded", () => {
  const orderData = new OrderData();
  const productData = new ProductData();
  const session = new Session();

  const loggedInUser = session.getSession();

  // Redirige al login si el usuario no está logueado
  if (!loggedInUser) {
    alert("Please log in to view your order history.");
    window.location.href = "login.html";
    return;
  }

  // Agrupar productos de la misma orden
  const groupedOrders = orderData
    .getOrdersByUser(loggedInUser.user_id)
    .reduce((acc, order) => {
      if (!acc[order.order_id]) {
        acc[order.order_id] = {
          order_id: order.order_id,
          date: order.date,
          total_price: 0,
          status: order.status,
          shipping_address: order.shipping_address,
          products: [],
        };
      }
      acc[order.order_id].total_price += order.total_price;

      // Agregar producto con nombre obtenido de ProductData
      const productInfo = productData.getProductById(order.product_id);
      const productName = productInfo ? productInfo.name : "Unknown Product";
      acc[order.order_id].products.push({
        name: productName,
        quantity: order.quantity,
        price: order.total_price,
      });
      return acc;
    }, {});

  // Convertimos las órdenes agrupadas a un array
  const allOrders = Object.values(groupedOrders);

  const orderHistoryContainer = document.getElementById("order-history");
  orderHistoryContainer.innerHTML = ""; // Limpia contenido existente

  // Renderizar cada orden agrupada en una tarjeta
  allOrders.forEach((order) => {
    const orderDiv = document.createElement("div");
    orderDiv.classList.add("order-summary");

    const timelineHTML = `
      <div class="timeline">
        <div class="progress-line"></div>
        <div class="status-point" data-status="paid">
          <div class="circle"></div>
          <span>Paid</span>
        </div>
        <div class="status-point" data-status="ready">
          <div class="circle"></div>
          <span>Ready</span>
        </div>
        <div class="status-point" data-status="ready-to-ship">
          <div class="circle"></div>
          <span>Ready to Ship</span>
        </div>
        <div class="status-point" data-status="shipped">
          <div class="circle"></div>
          <span>Shipped</span>
        </div>
        <div class="status-point" data-status="delivered">
          <div class="circle"></div>
          <span>Delivered</span>
        </div>
        <div class="truck"></div>
      </div>`;

    // Detalles de la orden y productos
    const productListHTML = order.products
      .map(
        (product) =>
          `<li>${product.name}, Quantity: ${
            product.quantity
          }, Price: $${product.price.toFixed(2)}</li>`
      )
      .join("");

    orderDiv.innerHTML = `
      <h3>Order #${order.order_id}</h3>
      <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
      <p><strong>Total:</strong> $${order.total_price.toFixed(2)}</p>
      <p><strong>Shipping Address:</strong> ${order.shipping_address.name}, ${
      order.shipping_address.address
    }</p>
      <p><strong>Products:</strong></p>
      <ul>${productListHTML}</ul>
      ${timelineHTML}
    `;

    orderHistoryContainer.appendChild(orderDiv);

    // Anima la línea de progreso y el camión
    animateTimeline(order.status, orderDiv.querySelector(".timeline"));
  });

  /**
   * Anima la línea de progreso y el camión dinámicamente
   * @param {string} status - Estado actual de la orden
   * @param {Element} timeline - Elemento del DOM para la línea de tiempo
   */
  function animateTimeline(status, timeline) {
    const progressLine = timeline.querySelector(".progress-line");
    const truck = timeline.querySelector(".truck");
    const statusPoints = Array.from(timeline.querySelectorAll(".status-point"));

    const statuses = ["paid", "ready", "ready-to-ship", "shipped", "delivered"];
    const activeIndex = statuses.indexOf(status);

    if (activeIndex !== -1) {
      // Calcula el ancho objetivo de la línea de progreso
      const progressWidth = ((activeIndex + 1) / statuses.length) * 100;

      // Anima el ancho de la línea de progreso
      gsap.to(progressLine, {
        width: `${progressWidth}%`,
        duration: 3, // Duración de la animación
        ease: "power2.inOut", // Easing suave
      });

      // Mueve el camión suavemente al punto activo
      const targetPoint = statusPoints[activeIndex];
      const leftPosition = targetPoint.offsetLeft + targetPoint.offsetWidth / 2;

      gsap.to(truck, {
        left: `${leftPosition}px`,
        duration: 3, // Coincide con la animación de la línea de progreso
        ease: "power2.inOut",
      });

      // Resalta los puntos de estado activos
      statusPoints.forEach((point, index) => {
        if (index <= activeIndex) {
          gsap.to(point.querySelector(".circle"), {
            backgroundColor: "#2E8B57", // Color activo
            duration: 1,
            ease: "power2.inOut",
          });
        }
      });
    }
  }
});
