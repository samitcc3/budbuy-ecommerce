$(document).ready(() => {
  const productsDatabasePath = "assets/data/products_database.json";

  // Function to get URL parameters as an object
  function getUrlParams() {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    for (const [key, value] of urlParams.entries()) {
      if (params[key]) {
        // If parameter already exists, convert it into an array
        params[key] = [].concat(params[key], value);
      } else {
        params[key] = value;
      }
    }
    return params;
  }

  // Function to populate filter options dynamically
  function populateFilters(products) {
    const categories = [
      ...new Set(products.map((p) => p.category.toLowerCase())),
    ];
    const brands = [...new Set(products.map((p) => p.brand.toLowerCase()))];
    const promotions = [
      ...new Set(
        products.map((p) => p.discount_name?.toLowerCase()).filter(Boolean)
      ),
    ];

    // Populate categories
    const categoryFilters = $("#category-filters");
    categories.forEach((category) => {
      categoryFilters.append(`
          <li>
            <input type="checkbox" value="${category}" id="filter-category-${category}">
            <label for="filter-category-${category}">${category}</label>
          </li>
        `);
    });

    // Populate brands
    const brandFilters = $("#brand-filters");
    brands.forEach((brand) => {
      brandFilters.append(`
          <li>
            <input type="checkbox" value="${brand}" id="filter-brand-${brand}">
            <label for="filter-brand-${brand}">${brand}</label>
          </li>
        `);
    });

    // Populate promotions
    const promotionFilters = $("#promotion-filters");
    promotions.forEach((promotion) => {
      promotionFilters.append(`
          <li>
            <input type="checkbox" value="${promotion}" id="filter-promotion-${promotion}">
            <label for="filter-promotion-${promotion}">${promotion}</label>
          </li>
        `);
    });
  }

  // Function to apply URL parameters to the filters
  function applyUrlFilters(params) {
    // Apply category filters
    if (params.category) {
      const categories = Array.isArray(params.category)
        ? params.category
        : [params.category];
      categories.forEach((category) => {
        $(`#category-filters input[value="${category.toLowerCase()}"]`).prop(
          "checked",
          true
        );
      });
    }

    // Apply brand filters
    if (params.brand) {
      const brands = Array.isArray(params.brand)
        ? params.brand
        : [params.brand];
      brands.forEach((brand) => {
        $(`#brand-filters input[value="${brand.toLowerCase()}"]`).prop(
          "checked",
          true
        );
      });
    }

    // Apply promotion filters
    if (params.promotion) {
      const promotions = Array.isArray(params.promotion)
        ? params.promotion
        : [params.promotion];
      promotions.forEach((promotion) => {
        $(`#promotion-filters input[value="${promotion.toLowerCase()}"]`).prop(
          "checked",
          true
        );
      });
    }

    // Apply price range filters
    if (params.minPrice) {
      $("#min-price").val(params.minPrice);
    }
    if (params.maxPrice) {
      $("#max-price").val(params.maxPrice);
    }
  }

  // Function to filter products based on a query string
  function filterByQuery(products, query) {
    if (!query) return products;

    const queryWords = query.toLowerCase().split(" ");

    return products
      .map((product) => {
        let relevance = 0;

        // Check product name
        if (
          queryWords.some((word) => product.name.toLowerCase().includes(word))
        ) {
          relevance += 3; // Higher weight for name match
        }

        // Check product description
        if (
          product.details &&
          queryWords.some((word) =>
            product.details.toLowerCase().includes(word)
          )
        ) {
          relevance += 2;
        }

        // Check product specifications
        if (
          product.specifications &&
          Object.values(product.specifications).some((value) =>
            queryWords.some((word) => value.toLowerCase().includes(word))
          )
        ) {
          relevance += 1;
        }

        return { ...product, relevance };
      })
      .filter((product) => product.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance);
  }

  // Function to filter and display products
  function filterAndDisplayProducts(products, params) {
    let filteredProducts = products;

    // Filter by query if available
    if (params.query) {
      filteredProducts = filterByQuery(filteredProducts, params.query);
    }

    // Filter by categories
    const selectedCategories = $("#category-filters input:checked")
      .map(function () {
        return $(this).val().toLowerCase();
      })
      .get();
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.category.toLowerCase())
      );
    }

    // Filter by brands
    const selectedBrands = $("#brand-filters input:checked")
      .map(function () {
        return $(this).val().toLowerCase();
      })
      .get();
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedBrands.includes(product.brand.toLowerCase())
      );
    }

    // Filter by promotions
    const selectedPromotions = $("#promotion-filters input:checked")
      .map(function () {
        return $(this).val().toLowerCase();
      })
      .get();
    if (selectedPromotions.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedPromotions.includes(product.discount_name?.toLowerCase() || "")
      );
    }

    // Filter by price range
    const minPrice = parseFloat($("#min-price").val()) || 0;
    const maxPrice = parseFloat($("#max-price").val()) || Infinity;
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price * (1 - product.discount / 100) >= minPrice &&
        product.price * (1 - product.discount / 100) <= maxPrice
    );

    // Apply sorting
    const sortOption = $("#sort-options").val();
    if (sortOption === "low-to-high") {
      filteredProducts.sort(
        (a, b) =>
          a.price * (1 - a.discount / 100) - b.price * (1 - b.discount / 100)
      );
    } else if (sortOption === "high-to-low") {
      filteredProducts.sort(
        (a, b) =>
          b.price * (1 - b.discount / 100) - a.price * (1 - a.discount / 100)
      );
    }

    // Display the filtered products
    displayProducts(filteredProducts);
  }

  // Function to display products
  function displayProducts(products) {
    const resultsContainer = $("#search-results");
    resultsContainer.empty();

    if (products.length === 0) {
      resultsContainer.append(
        "<p class='text-center'>No products match your search criteria.</p>"
      );
      return;
    }

    products.forEach((product) => {
      const discountedPrice = (
        product.price *
        (1 - product.discount / 100)
      ).toFixed(2);
      const productCard = `
          <div class="col-md-4 mb-4">
            <div class="card">
              <img src="${product.image_url}" class="card-img-top" alt="${
        product.name
      }">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">
                  <span class="text-success font-weight-bold">$${discountedPrice}</span>
                  ${
                    product.discount > 0
                      ? `<br><s class="text-muted">$${product.price.toFixed(
                          2
                        )}</s> 
                      <span class="badge badge-danger">-${
                        product.discount
                      }%</span>`
                      : ""
                  }
                </p>
                <a href="product.html?sku=${
                  product.sku
                }" class="btn btn-primary w-100">See Product</a>
              </div>
            </div>
          </div>
        `;
      resultsContainer.append(productCard);
    });
  }

  // Function to reset filters and the URL
  function resetFilters() {
    // Uncheck all checkboxes
    $(".filters input[type='checkbox']").prop("checked", false);

    // Clear price range inputs
    $("#min-price").val("");
    $("#max-price").val("");

    // Reset the URL by removing all query parameters
    history.replaceState(null, "", window.location.pathname);
  }

  // Fetch products and initialize the page
  $.getJSON(productsDatabasePath, (products) => {
    populateFilters(products); // Populate the filter lists
    const urlParams = getUrlParams();
    applyUrlFilters(urlParams);
    filterAndDisplayProducts(products, urlParams);

    // Update products on filter change
    $(".filters input, #min-price, #max-price").on("change", () => {
      filterAndDisplayProducts(products, getUrlParams());
    });

    // Update products on sort option change
    $("#sort-options").on("change", () => {
      filterAndDisplayProducts(products, getUrlParams());
    });

    // Reset filters button
    $("#reset-filters").on("click", () => {
      resetFilters();

      filterAndDisplayProducts(products, {}); // Reload all products without filters
    });
  });
});
