import { ProductData } from "../data/productdata.js"; // Adjust relative path if necessary
import { CartData } from "../data/cart.js"; // Import the CartData class for managing the cart

document.addEventListener("DOMContentLoaded", () => {
  const productData = new ProductData();
  const cartData = new CartData(); // Initialize cart functionality

  // Get SKU from URL
  const urlParams = new URLSearchParams(window.location.search);
  const sku = parseInt(urlParams.get("sku"), 10);

  // If no SKU provided, redirect to 404
  if (!sku) {
    window.location.href = "404.html";
    return;
  }

  // Find the product by SKU
  const product = productData.findProductBySKU(sku);

  // Handle cases for invalid SKU
  if (!product) {
    window.location.href = "404.html";
    return;
  }

  // Update breadcrumb
  document.querySelector("#breadcrumb-category").textContent = product.category;
  document.querySelector("#product-name").textContent = product.name;

  // Fill the static HTML content dynamically
  if (product.discount > 0) {
    // Add a discount name tag if the product has a discount
    const discountTag = `<span class="badge badge-danger mb-2">${product.discount_name}</span>`;
    document
      .querySelector(".col-md-6:nth-child(2)") // Select the container for product details
      .insertAdjacentHTML("afterbegin", discountTag); // Insert the discount tag at the beginning of the container
  }

  // Set the product image dynamically
  document
    .querySelector(".col-md-6:nth-child(1) img") // Select the product image element
    .setAttribute("src", product.image_url); // Set the image source URL
  document
    .querySelector(".col-md-6:nth-child(1) img") // Select the product image element
    .setAttribute("alt", product.name); // Set the alt text for accessibility

  // Set the product name dynamically
  document.querySelector(".col-md-6:nth-child(2) h1").textContent =
    product.name;

  // Set the product SKU (Stock Keeping Unit) dynamically
  document.querySelector(
    ".col-md-6:nth-child(2) p:nth-of-type(1)"
  ).innerHTML = `
  <strong>Item:</strong> ${product.sku}
`;

  // Calculate the discounted price if a discount exists, otherwise use the original price
  const discountedPrice =
    product.discount > 0
      ? (product.price * (1 - product.discount / 100)).toFixed(2) // Calculate the discounted price
      : product.price.toFixed(2); // Use the original price if no discount

  // Display the discounted or original price
  document.querySelector(
    ".col-md-6:nth-child(2) .text-success"
  ).textContent = `$${discountedPrice}`;

  // If the product has a discount, display the original price with a strikethrough and a discount badge
  if (product.discount > 0) {
    document.querySelector(".col-md-6:nth-child(2) .text-danger").innerHTML = `
    <s>$${product.price.toFixed(
      2
    )}</s> <!-- Original price with strikethrough -->
    <span class="badge badge-warning ml-2">${
      product.discount
    }% OFF</span> <!-- Discount percentage badge -->
  `;
  } else {
    // Remove the original price element if no discount exists
    document.querySelector(".col-md-6:nth-child(2) .text-danger").remove();
  }

  // Handle stock availability dynamically
  const stockElement = document.querySelector("#stock-count"); // Element to display stock availability
  const quantityInput = document.querySelector("#quantity"); // Input element for product quantity
  const addToCartButton = document.querySelector("#add-to-cart"); // Button to add the product to the cart

  // Check if the product is out of stock
  if (product.stock === 0) {
    stockElement.textContent = "No Stock Available"; // Display no stock message
    stockElement.style.color = "red"; // Highlight the message in red
    quantityInput.setAttribute("disabled", "true"); // Disable the quantity input field
    addToCartButton.setAttribute("disabled", "true"); // Disable the Add to Cart button
    addToCartButton.textContent = "Unavailable"; // Update the button text to reflect unavailability
  } else {
    // If the product is in stock, display the available stock count
    stockElement.textContent = `${product.stock} in stock`; // Show the stock count
    quantityInput.setAttribute("max", product.stock); // Limit the maximum quantity input to the available stock
  }

  // Fill product description
  document.querySelector("#product-details").textContent = product.details;

  // Fill product specifications table
  const specifications = product.specifications;
  if (specifications && Object.keys(specifications).length > 0) {
    const tableRows = Object.entries(specifications)
      .map(([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`)
      .join("");

    document.querySelector("#product-specifications-list").innerHTML =
      tableRows;
  } else {
    document.querySelector("#product-specifications").innerHTML =
      "<p>No specifications available for this product.</p>";
  }

  // Generate related products (same category, up to 4 random)
  const relatedProducts = productData
    .getAllProducts()
    .filter((p) => p.category === product.category && p.sku !== product.sku)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  if (relatedProducts.length > 0) {
    relatedProducts.forEach((relatedProduct) => {
      const relatedDiscountedPrice =
        relatedProduct.discount > 0
          ? (
              relatedProduct.price *
              (1 - relatedProduct.discount / 100)
            ).toFixed(2)
          : relatedProduct.price.toFixed(2);

      const relatedOriginalPrice =
        relatedProduct.discount > 0
          ? `<s class="text-muted">$${relatedProduct.price.toFixed(2)}</s>`
          : "";

      const relatedDiscountBadge =
        relatedProduct.discount > 0
          ? `<span class="badge badge-danger">${relatedProduct.discount}% OFF</span>`
          : "";

      const productCard = `
        <div class="col-md-3 mb-4">
          <div class="card h-100">
            <img src="${relatedProduct.image_url}" class="card-img-top" alt="${relatedProduct.name}" style="cursor: pointer;">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${relatedProduct.name}</h5>
              <p class="card-text">${relatedDiscountBadge}</p>
              <p class="card-text font-weight-bold">$${relatedDiscountedPrice}</p>
              <p class="card-text">${relatedOriginalPrice}</p>
              <button class="btn btn-primary mt-auto" data-sku="${relatedProduct.sku}">See Product</button>
            </div>
          </div>
        </div>
      `;

      document
        .querySelector("#related-products")
        .insertAdjacentHTML("beforeend", productCard);
    });

    document
      .querySelectorAll("#related-products img, #related-products button")
      .forEach((element) =>
        element.addEventListener("click", function () {
          const productSku =
            this.getAttribute("data-sku") ||
            this.closest(".card")
              .querySelector("button")
              .getAttribute("data-sku");
          window.location.href = `product.html?sku=${productSku}`;
        })
      );
  } else {
    document.querySelector("#related-products").innerHTML =
      "<p class='text-muted'>No related products available.</p>";
  }

  // Add to Cart button functionality
  addToCartButton.addEventListener("click", () => {
    const quantity = parseInt(quantityInput.value, 10);

    if (quantity > 0 && quantity <= product.stock) {
      cartData.addToCart(product, quantity); // Add product to cart
      cartData.updateCartCount(); // Update the cart count in the UI
      alert(`Added ${quantity} of "${product.name}" to the cart!`);
    } else {
      alert("Invalid quantity. Please try again.");
    }
  });

  // Update cart count on page load
  cartData.updateCartCount();
});
