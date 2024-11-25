import { ProductData } from "../data/productdata.js";

document.addEventListener("DOMContentLoaded", () => {
  const featuredProductsContainer = document.querySelector(
    "#featured-products .row"
  );

  try {
    // Instantiate ProductData
    const productData = new ProductData();

    // Get all products from memory
    const products = productData.getAllProducts();

    // Filter products with discounts
    const validProducts = products.filter((product) => product.discount > 0);

    // Sort by discount in descending order
    const sortedProducts = validProducts.sort(
      (a, b) => b.discount - a.discount
    );

    // Take the top 6 featured products
    const featuredProducts = sortedProducts.slice(0, 6);

    // Clear the container
    featuredProductsContainer.innerHTML = "";

    // Render product cards
    featuredProducts.forEach((product) => {
      const productCard = `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <!-- Image -->
                <a href="product.html?sku=${
                  product.sku
                }" class="text-decoration-none">
                    <img src="${product.image_url}" class="card-img-top" alt="${
        product.name
      }" style="cursor: pointer;">
                </a>
                <!-- Card Body -->
                <div class="card-body d-flex flex-column">
                    <h6 class="card-subtitle mb-2 text-muted">${product.brand.toUpperCase()}</h6>
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">
                        <span class="text-danger font-weight-bold">$${(
                          product.price *
                          (1 - product.discount / 100)
                        ).toFixed(2)}</span>
                        <span class="badge badge-warning ml-2">${
                          product.discount_name || "Discount"
                        }</span>
                        <br>
                        <s class="text-muted">$${product.price.toFixed(2)}</s>
                        <span class="badge badge-danger ml-2">-${
                          product.discount
                        }%</span>
                    </p>
                    <a href="product.html?sku=${
                      product.sku
                    }" class="btn btn-primary mt-auto">See Product</a>
                </div>
            </div>
        </div>`;
      featuredProductsContainer.insertAdjacentHTML("beforeend", productCard);
    });
  } catch (error) {
    console.error("Error loading featured products:", error);
    featuredProductsContainer.innerHTML =
      '<p class="text-danger">Failed to load featured products. Please try again later.</p>';
  }
});
