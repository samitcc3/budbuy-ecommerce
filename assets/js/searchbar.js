$(document).ready(() => {
  // Path to the product database JSON file
  const productsDatabasePath = "assets/data/products_database.json";

  // References to the search bar input and results dropdown
  const searchInput = $("#search-input");
  const searchResultsDropdown = $("#search-results-dropdown");
  const searchButton = $(".input-group-append button"); // The search button

  let categories = []; // Array to store unique product categories dynamically

  /**
   * Displays search results in a dropdown below the search bar.
   * If there are no results or the query is empty, hides the dropdown.
   * Each result contains an image, product name, and discounted price.
   */
  function displaySearchResults(results) {
    searchResultsDropdown.empty(); // Clear previous results from the dropdown

    // If no results, hide the dropdown and return early
    if (results.length === 0) {
      searchResultsDropdown.hide();
      return;
    }

    // Iterate through results and create a dropdown item for each product
    results.forEach((product) => {
      // Calculate discounted price
      const discountedPrice = (
        product.price *
        (1 - product.discount / 100)
      ).toFixed(2);

      // Create a dropdown item for the product
      const resultItem = `
          <a href="product.html?sku=${product.sku}" class="dropdown-item d-flex align-items-center">
            <img src="${product.image_url}" alt="${product.name}" style="width: 50px; height: 50px; margin-right: 10px;">
            <div>
              <h6 class="mb-0">${product.name}</h6>
              <small class="text-success font-weight-bold">$${discountedPrice}</small>
            </div>
          </a>
        `;

      // Append the result to the dropdown
      searchResultsDropdown.append(resultItem);
    });

    // Show the dropdown once results are appended
    searchResultsDropdown.show();
  }

  /**
   * Handles search functionality by filtering products from the database.
   * It matches the user's query against product name, details, SKU, brand,
   * and starts-with logic for categories.
   */
  function handleSearch(query, products) {
    // If the query is empty, hide the dropdown and return
    if (!query) {
      searchResultsDropdown.hide();
      return;
    }

    // Convert the query to lowercase for case-insensitive matching
    const queryLower = query.toLowerCase();

    // Filter products based on matches with the query
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(queryLower) || // Match in product name
        product.details?.toLowerCase().includes(queryLower) || // Match in product details
        product.sku.toString().includes(queryLower) || // Match in SKU
        product.brand.toLowerCase().includes(queryLower) || // Match in brand
        product.category.toLowerCase().startsWith(queryLower) // Match with category start
    );

    // Pass the filtered results to the dropdown display function
    displaySearchResults(results);
  }

  /**
   * Redirects the user to the appropriate search page.
   * If the query matches the start of any category, redirects to a category search.
   * Otherwise, redirects to a general search query.
   */
  function redirectToSearchPage(query) {
    // Convert the query to lowercase for comparison
    const queryLower = query.toLowerCase();

    // Check if the query matches any category name (case-insensitive)
    const matchingCategory = categories.find((category) =>
      category.toLowerCase().startsWith(queryLower)
    );

    if (matchingCategory) {
      // If there's a matching category, redirect to a category search
      window.location.href = `search.html?category=${encodeURIComponent(
        matchingCategory
      )}`;
    } else {
      // Otherwise, treat the query as a general search and redirect
      window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    }
  }

  /**
   * Fetches the product database and initializes the search bar functionality.
   * Populates the categories list and sets up event listeners for interactions.
   */
  $.getJSON(productsDatabasePath)
    .done((products) => {
      // Extract unique product categories and store them
      categories = [...new Set(products.map((product) => product.category))];

      // Add event listener for input changes (real-time search)
      searchInput.on("input", function () {
        const query = $(this).val().trim(); // Get the trimmed input value
        handleSearch(query, products); // Process the search query
      });

      // Hide the dropdown when the input field loses focus
      searchInput.on("blur", function () {
        setTimeout(() => {
          searchResultsDropdown.hide(); // Small delay to allow clicking on dropdown items
        }, 200);
      });

      // Show the dropdown when the input field gains focus, if there's a query
      searchInput.on("focus", function () {
        const query = $(this).val().trim(); // Get the trimmed input value
        if (query) {
          handleSearch(query, products); // Display relevant results
        }
      });

      // Add functionality to the search button
      searchButton.on("click", function () {
        const query = searchInput.val().trim(); // Get the search input value
        if (query) {
          redirectToSearchPage(query); // Redirect based on query or category match
        }
      });

      // Add functionality for the Enter key (trigger search)
      searchInput.on("keypress", function (e) {
        if (e.which === 13) {
          // Check if Enter key (code 13) is pressed
          const query = $(this).val().trim(); // Get the trimmed input value
          if (query) {
            redirectToSearchPage(query); // Redirect based on query or category match
          }
        }
      });
    })
    .fail((error) => {
      // Log an error if the product database fails to load
      console.error("Failed to fetch product database:", error);
    });
});
