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

  // If product doesn't exist or stock is 0, redirect to 404
  if (!product || product.stock === 0) {
    window.location.href = "404.html";
    return;
  }

  // Update breadcrumb
  document.querySelector("#breadcrumb-category").textContent = product.category;
  document.querySelector("#product-name").textContent = product.name;

  // Fill the static HTML content dynamically
  if (product.discount > 0) {
    const discountTag = `<span class="badge badge-danger mb-2">${product.discount_name}</span>`;
    document
      .querySelector(".col-md-6:nth-child(2)")
      .insertAdjacentHTML("afterbegin", discountTag);
  }

  document
    .querySelector(".col-md-6:nth-child(1) img")
    .setAttribute("src", product.image_url);
  document
    .querySelector(".col-md-6:nth-child(1) img")
    .setAttribute("alt", product.name);

  document.querySelector(".col-md-6:nth-child(2) h1").textContent =
    product.name;
  document.querySelector(
    ".col-md-6:nth-child(2) p:nth-of-type(1)"
  ).innerHTML = `<strong>Item:</strong> ${product.sku}`;

  const discountedPrice =
    product.discount > 0
      ? (product.price * (1 - product.discount / 100)).toFixed(2)
      : product.price.toFixed(2);

  document.querySelector(
    ".col-md-6:nth-child(2) .text-success"
  ).textContent = `$${discountedPrice}`;

  if (product.discount > 0) {
    document.querySelector(
      ".col-md-6:nth-child(2) .text-danger"
    ).innerHTML = `<s>$${product.price.toFixed(2)}</s>`;
  } else {
    document.querySelector(".col-md-6:nth-child(2) .text-danger").remove();
  }

  document.querySelector("#quantity").setAttribute("max", product.stock);
  document.querySelector(
    "#stock-count"
  ).textContent = `${product.stock} in stock`;

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
  document.querySelector("#add-to-cart").addEventListener("click", () => {
    const quantity = parseInt(document.querySelector("#quantity").value, 10);

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
