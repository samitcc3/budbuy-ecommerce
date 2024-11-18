 # E-commerce Project: BudBuy

 ## Description
 BudBuy is a user-friendly e-commerce platform built to showcase a wide range of electronic products.
 The website supports various features such as product search, dynamic filtering, featured products display,
 and a detailed product page with specifications and reviews.

 ## Technologies Used
 - HTML5
 - CSS3 with Bootstrap 4
 - JavaScript (ES6+)
 - jQuery
 - JSON (for the database)
 - Font Awesome and Bootstrap Icons

 ## Features
 ### General
 - **Responsive Design**: Fully responsive layout, ensuring compatibility across devices.
 - **Navigation Bar**: Includes links to major categories and deals.

 ### Header
 - **Logo and Brand Name**: Displays the BudBuy logo and name.
 - **User Account Link**: Redirects users to their account page.
 - **Cart Button**: Displays the cart icon with an item count badge.

 ### Index Page
 - **Main Banner**: A slider showcasing promotions, linking to specific search results (e.g., Black Friday deals).
 - **Featured Products**: Dynamically loads top six products with the highest discounts from the database.

 ### Search Page
 - **Dynamic Filters**:
 - Category, Brand, Promotions (checkbox-based filtering).
 - Price Range Filtering: Users can define minimum and maximum price ranges.
 - **Search Query**:
 - Supports URL parameters for pre-defined queries (e.g., category, brand, discount name).
 - Real-time search for matching products.
 - **Sort Options**:
 - Best Match (default).
 - Price: Low to High.
 - Price: High to Low.
 - **Reset Button**:
 - Clears all selected filters and restores the full product list.

 ### Product Page
 - **Breadcrumb Navigation**: Indicates the user's current location within the category hierarchy.
 - **Product Presentation**:
 - Displays the product image, name, SKU, price, and stock availability.
 - Includes a quantity input field and an "Add to Cart" button.
 - **Product Description**: Dynamically fetches and displays product details from the database.
 - **Product Specifications**: Renders a table of specifications for each product.
 - **Featured Products**: Displays up to four related products within the same category.
 - **Reviews Section**: Placeholder for future review functionality.

 ## Functions
 ### Filtering and Sorting
 - **filterAndDisplayProducts()**:
 - Applies selected filters and sorting options to the product list.
 - Updates the displayed products dynamically.
 - **filterByQuery()**:
 - Searches for products based on a text query.
 - Matches against product name, description, and specifications.
 - **resetFilters()**:
 - Clears all active filters and restores the full product list.

 ### URL Management
 - **getUrlParams()**:
 - Extracts and parses URL query parameters into an object.
 - **applyUrlFilters()**:
 - Applies filters based on URL parameters (e.g., category=Tablets).

 ### Product Display
 - **populateFilters()**:
 - Dynamically generates filter checkboxes for categories, brands, and promotions.
 - **displayProducts()**:
 - Renders product cards dynamically based on the filtered product list.
 - **handleProductCardClick()**:
 - Redirects users to the product details page upon clicking a "See Product" button.

 ## Folder Structure
 ` BudBuy/
 ├── assets/
 │   ├── css/
 │   │   ├── index.css
 │   │   ├── product.css
 │   │   ├── search.css
 │   ├── data/
 │   │   └── products_database.json
 │   ├── images/
 │   │   ├── logo/
 │   │   ├── slider/
 │   │   └── products/
 │   ├── js/
 │       ├── index.js
 │       ├── product.js
 │       └── search.js
 ├── index.html
 ├── product.html
 ├── search.html
 ├── cart.html (future)
 └── account.html (future)
`

 ## Future Enhancements
 - Implement a functional cart page.
 - Add user authentication and account management.
 - Enable product reviews and ratings.
 - Integrate a payment gateway.
"# budbuy-ecommerce" 
