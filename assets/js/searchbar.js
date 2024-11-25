import { ProductData } from "../data/productdata.js"; // Adjust the path as per your folder structure

document.addEventListener("DOMContentLoaded", () => {
  // References to the search bar input and results dropdown
  const searchInput = document.querySelector("#search-input");
  const searchResultsDropdown = document.querySelector(
    "#search-results-dropdown"
  );
  const searchButton = document.querySelector(".input-group-append button"); // The search button

  const productData = new ProductData(); // Instantiate ProductData
  const products = productData.getAllProducts(); // Get all products from ProductData
  const categories = [...new Set(products.map((product) => product.category))]; // Extract unique product categories

  /**
   * Displays search results in a dropdown below the search bar.
   * If there are no results or the query is empty, hides the dropdown.
   */
  function displaySearchResults(results) {
    searchResultsDropdown.innerHTML = ""; // Clear previous results

    // If no results, hide the dropdown and return early
    if (results.length === 0) {
      searchResultsDropdown.style.display = "none";
      return;
    }

    // Iterate through results and create a dropdown item for each product
    results.forEach((product) => {
      const discountedPrice = (
        product.price *
        (1 - product.discount / 100)
      ).toFixed(2);

      const resultItem = `
        <a href="product.html?sku=${product.sku}" class="dropdown-item d-flex align-items-center">
          <img src="${product.image_url}" alt="${product.name}" style="width: 50px; height: 50px; margin-right: 10px;">
          <div>
            <h6 class="mb-0">${product.name}</h6>
            <small class="text-success font-weight-bold">$${discountedPrice}</small>
          </div>
        </a>
      `;
      searchResultsDropdown.insertAdjacentHTML("beforeend", resultItem);
    });

    // Show the dropdown after appending results
    searchResultsDropdown.style.display = "block";
  }

  /**
   * Handles search functionality by filtering products from the database.
   */
  function handleSearch(query) {
    if (!query) {
      searchResultsDropdown.style.display = "none";
      return;
    }

    const queryLower = query.toLowerCase();

    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(queryLower) ||
        (product.details &&
          product.details.toLowerCase().includes(queryLower)) ||
        product.sku.toString().includes(queryLower) ||
        product.brand.toLowerCase().includes(queryLower) ||
        product.category.toLowerCase().startsWith(queryLower)
    );

    displaySearchResults(results);
  }

  /**
   * Redirects the user to the appropriate search page.
   */
  function redirectToSearchPage(query) {
    const queryLower = query.toLowerCase();
    const matchingCategory = categories.find((category) =>
      category.toLowerCase().startsWith(queryLower)
    );

    if (matchingCategory) {
      window.location.href = `search.html?category=${encodeURIComponent(
        matchingCategory
      )}`;
    } else {
      window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    }
  }

  // Add event listener for input changes (real-time search)
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    handleSearch(query);
  });

  // Hide the dropdown when the input field loses focus
  searchInput.addEventListener("blur", () => {
    setTimeout(() => {
      searchResultsDropdown.style.display = "none"; // Delay to allow dropdown item clicks
    }, 200);
  });

  // Show the dropdown when the input field gains focus, if there's a query
  searchInput.addEventListener("focus", () => {
    const query = searchInput.value.trim();
    if (query) {
      handleSearch(query);
    }
  });

  // Add functionality to the search button
  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      redirectToSearchPage(query);
    }
  });

  // Add functionality for the Enter key (trigger search)
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) {
        redirectToSearchPage(query);
      }
    }
  });
});
