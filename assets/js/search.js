import { ProductData } from "../data/productdata.js";

document.addEventListener("DOMContentLoaded", () => {
  const productData = new ProductData(); // Instanciar ProductData
  const products = productData.getAllProducts(); // Obtener todos los productos

  // Obtener parámetros de la URL
  function getUrlParams() {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    for (const [key, value] of urlParams.entries()) {
      if (params[key]) {
        params[key] = [].concat(params[key], value);
      } else {
        params[key] = value;
      }
    }
    return params;
  }

  // Poblar los filtros dinámicamente
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

    // Poblar categorías
    const categoryFilters = document.querySelector("#category-filters");
    categories.forEach((category) => {
      categoryFilters.insertAdjacentHTML(
        "beforeend",
        `<li>
          <input type="checkbox" value="${category}" id="filter-category-${category}">
          <label for="filter-category-${category}">${category}</label>
        </li>`
      );
    });

    // Poblar marcas
    const brandFilters = document.querySelector("#brand-filters");
    brands.forEach((brand) => {
      brandFilters.insertAdjacentHTML(
        "beforeend",
        `<li>
          <input type="checkbox" value="${brand}" id="filter-brand-${brand}">
          <label for="filter-brand-${brand}">${brand}</label>
        </li>`
      );
    });

    // Poblar promociones
    const promotionFilters = document.querySelector("#promotion-filters");
    promotions.forEach((promotion) => {
      promotionFilters.insertAdjacentHTML(
        "beforeend",
        `<li>
          <input type="checkbox" value="${promotion}" id="filter-promotion-${promotion}">
          <label for="filter-promotion-${promotion}">${promotion}</label>
        </li>`
      );
    });
  }

  // Aplicar los parámetros de la URL a los filtros
  function applyUrlFilters(params) {
    if (params.category) {
      const categories = Array.isArray(params.category)
        ? params.category
        : [params.category];
      categories.forEach((category) => {
        document
          .querySelector(
            `#category-filters input[value="${category.toLowerCase()}"]`
          )
          ?.setAttribute("checked", true);
      });
    }

    if (params.brand) {
      const brands = Array.isArray(params.brand)
        ? params.brand
        : [params.brand];
      brands.forEach((brand) => {
        document
          .querySelector(`#brand-filters input[value="${brand.toLowerCase()}"]`)
          ?.setAttribute("checked", true);
      });
    }

    if (params.promotion) {
      const promotions = Array.isArray(params.promotion)
        ? params.promotion
        : [params.promotion];
      promotions.forEach((promotion) => {
        document
          .querySelector(
            `#promotion-filters input[value="${promotion.toLowerCase()}"]`
          )
          ?.setAttribute("checked", true);
      });
    }

    if (params.minPrice) {
      document.querySelector("#min-price").value = params.minPrice;
    }
    if (params.maxPrice) {
      document.querySelector("#max-price").value = params.maxPrice;
    }
  }

  // Filtrar productos por consulta
  function filterByQuery(products, query) {
    if (!query) return products;

    const queryWords = query.toLowerCase().split(" ");

    return products
      .map((product) => {
        let relevance = 0;

        if (
          queryWords.some((word) => product.name.toLowerCase().includes(word))
        ) {
          relevance += 3;
        }

        if (
          product.details &&
          queryWords.some((word) =>
            product.details.toLowerCase().includes(word)
          )
        ) {
          relevance += 2;
        }

        if (product.specifications) {
          if (
            Object.values(product.specifications).some((value) =>
              queryWords.some((word) => value.toLowerCase().includes(word))
            )
          ) {
            relevance += 1;
          }
        }

        return { ...product, relevance };
      })
      .filter((product) => product.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance);
  }

  // Filtrar y mostrar productos
  function filterAndDisplayProducts(products, params) {
    let filteredProducts = products;

    if (params.query) {
      filteredProducts = filterByQuery(filteredProducts, params.query);
    }

    const selectedCategories = Array.from(
      document.querySelectorAll("#category-filters input:checked")
    ).map((input) => input.value.toLowerCase());

    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.category.toLowerCase())
      );
    }

    const selectedBrands = Array.from(
      document.querySelectorAll("#brand-filters input:checked")
    ).map((input) => input.value.toLowerCase());

    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedBrands.includes(product.brand.toLowerCase())
      );
    }

    const selectedPromotions = Array.from(
      document.querySelectorAll("#promotion-filters input:checked")
    ).map((input) => input.value.toLowerCase());

    if (selectedPromotions.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedPromotions.includes(product.discount_name?.toLowerCase() || "")
      );
    }

    const minPrice =
      parseFloat(document.querySelector("#min-price").value) || 0;
    const maxPrice =
      parseFloat(document.querySelector("#max-price").value) || Infinity;
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price * (1 - product.discount / 100) >= minPrice &&
        product.price * (1 - product.discount / 100) <= maxPrice
    );

    const sortOption = document.querySelector("#sort-options").value;
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

    displayProducts(filteredProducts);
  }

  // Mostrar productos
  function displayProducts(products) {
    const resultsContainer = document.querySelector("#search-results");
    resultsContainer.innerHTML = "";

    if (products.length === 0) {
      resultsContainer.innerHTML =
        "<p class='text-center'>No products match your search criteria.</p>";
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
      resultsContainer.insertAdjacentHTML("beforeend", productCard);
    });
  }

  // Restablecer filtros y URL
  function resetFilters() {
    document
      .querySelectorAll(".filters input[type='checkbox']")
      .forEach((input) => {
        input.checked = false;
      });

    document.querySelector("#min-price").value = "";
    document.querySelector("#max-price").value = "";

    history.replaceState(null, "", window.location.pathname);
  }

  // Inicializar filtros y productos
  populateFilters(products);
  const urlParams = getUrlParams();
  applyUrlFilters(urlParams);
  filterAndDisplayProducts(products, urlParams);

  // Actualizar productos al cambiar filtros
  document
    .querySelectorAll(".filters input, #min-price, #max-price")
    .forEach((input) => {
      input.addEventListener("change", () => {
        filterAndDisplayProducts(products, getUrlParams());
      });
    });

  document.querySelector("#sort-options").addEventListener("change", () => {
    filterAndDisplayProducts(products, getUrlParams());
  });

  document.querySelector("#reset-filters").addEventListener("click", () => {
    resetFilters();
    filterAndDisplayProducts(products, {});
  });
});
