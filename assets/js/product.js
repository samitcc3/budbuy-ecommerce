$(document).ready(() => {
  // Get SKU from URL
  const urlParams = new URLSearchParams(window.location.search);
  const sku = urlParams.get("sku");

  // If no SKU provided, redirect to 404
  if (!sku) {
    window.location.href = "404.html";
    return;
  }

  // Path to the products database
  const productsDatabasePath = "assets/data/products_database.json";

  // Fetch the products database
  $.getJSON(productsDatabasePath, (products) => {
    // Find the product with the matching SKU
    const product = products.find((p) => p.sku.toString() === sku);

    // If product doesn't exist or stock is 0, redirect to 404
    if (!product || product.stock === 0) {
      window.location.href = "404.html";
      return;
    }

    // Update breadcrumb
    $("#breadcrumb-category").text(product.category); // Fill category in breadcrumb
    $("#product-name").text(product.name); // Fill product name in breadcrumb

    // Fill the static HTML content dynamically
    if (product.discount > 0) {
      const discountTag = `<span class="badge badge-danger mb-2">${product.discount_name}</span>`;
      $(".col-md-6:nth-child(2)").prepend(discountTag);
    }

    $(".col-md-6:nth-child(1) img")
      .attr("src", product.image_url)
      .attr("alt", product.name);
    $(".col-md-6:nth-child(2) h1").text(product.name);
    $(".col-md-6:nth-child(2) p:nth-of-type(1)").html(
      `<strong>Item:</strong> ${product.sku}`
    );

    const discountedPrice =
      product.discount > 0
        ? (product.price * (1 - product.discount / 100)).toFixed(2)
        : product.price.toFixed(2);

    $(".col-md-6:nth-child(2) .text-success").text(`$${discountedPrice}`);

    if (product.discount > 0) {
      $(".col-md-6:nth-child(2) .text-danger").html(
        `<s>$${product.price.toFixed(2)}</s>`
      );
    } else {
      $(".col-md-6:nth-child(2) .text-danger").remove(); // Remove original price if no discount
    }

    $("#quantity").attr("max", product.stock);
    $("#stock-count").text(`${product.stock} in stock`);

    // Fill product description
    $("#product-details").text(product.details);

    // Fill product specifications table
    const specifications = product.specifications;

    if (specifications && Object.keys(specifications).length > 0) {
      const tableRows = Object.entries(specifications)
        .map(([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`)
        .join("");

      $("#product-specifications-list").html(tableRows);
    } else {
      $("#product-specifications").html(
        "<p>No specifications available for this product.</p>"
      );
    }

    // Generate related products (same category, up to 4 random)
    const relatedProducts = products
      .filter((p) => p.category === product.category && p.sku !== product.sku)
      .sort(() => 0.5 - Math.random()) // Shuffle array
      .slice(0, 4); // Take up to 4 products

    if (relatedProducts.length > 0) {
      relatedProducts.forEach((relatedProduct) => {
        const discountedPrice =
          relatedProduct.discount > 0
            ? (
                relatedProduct.price *
                (1 - relatedProduct.discount / 100)
              ).toFixed(2)
            : relatedProduct.price.toFixed(2);

        const originalPrice =
          relatedProduct.discount > 0
            ? `<s class="text-muted">$${relatedProduct.price.toFixed(2)}</s>`
            : "";

        const discountBadge =
          relatedProduct.discount > 0
            ? `<span class="badge badge-danger">${relatedProduct.discount}% OFF</span>`
            : "";

        // Create the product card
        const productCard = `
         <div class="col-md-3 mb-4">
           <div class="card h-100">
             <img src="${relatedProduct.image_url}" class="card-img-top" alt="${relatedProduct.name}" style="cursor: pointer;">
             <div class="card-body d-flex flex-column">
               <h5 class="card-title">${relatedProduct.name}</h5>
               <p class="card-text">${discountBadge}</p>
               <p class="card-text font-weight-bold">$${discountedPrice}</p>
               <p class="card-text">${originalPrice}</p>
               <button class="btn btn-primary mt-auto" data-sku="${relatedProduct.sku}">See Product</button>
             </div>
           </div>
         </div>
       `;

        // Append the card to the container
        $("#related-products").append(productCard);
      });

      // Add click events to redirect to the product page
      $("#related-products img, #related-products button").on(
        "click",
        function () {
          const productSku =
            $(this).data("sku") ||
            $(this).closest(".card").find("button").data("sku");
          window.location.href = `product.html?sku=${productSku}`;
        }
      );
    } else {
      // If no related products, show a message
      $("#related-products").html(
        "<p class='text-muted'>No related products available.</p>"
      );
    }

    // Add to Cart button functionality
    $("#add-to-cart").on("click", () => {
      const quantity = parseInt($("#quantity").val());
      if (quantity > 0 && quantity <= product.stock) {
        alert(`Added ${quantity} of "${product.name}" to the cart!`);
        // Logic to add to cart (future implementation)
      } else {
        alert("Invalid quantity. Please try again.");
      }
    });
  }).fail(() => {
    // If there is an error loading the JSON, redirect to 404
    window.location.href = "404.html";
  });
});
