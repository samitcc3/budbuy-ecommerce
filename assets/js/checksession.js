import { Session } from "../data/session.js";

document.addEventListener("DOMContentLoaded", () => {
  const accountSection = document.getElementById("account-section");
  const adminDashboardLink = document.getElementById("admin-dashboard-link");
  const session = new Session();
  const loggedInUser = session.getSession();

  if (loggedInUser) {
    // User is logged in; show their name and a logout link
    accountSection.innerHTML = `
            <span class="text-white mx-3">Welcome, <strong>${
              loggedInUser.email.split("@")[0]
            }</strong></span>
            <a href="#" id="logout-link" class="text-white mx-3 text-decoration-none font-weight-bold">Logout</a>
        `;

    // Check user role
    if (loggedInUser.role === "admin") {
      // Show admin dashboard link for admins
      adminDashboardLink.style.display = "inline-block";
    } else {
      // Hide admin dashboard link for non-admins
      adminDashboardLink.style.display = "none";

      // Redirect customers trying to access admin.html to index.html
      if (window.location.pathname.includes("admin.html")) {
        alert("Access denied. Admins only.");
        window.location.href = "index.html";
      }
    }

    // Add logout functionality
    const logoutLink = document.getElementById("logout-link");
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      session.logout(); // Clear session
      window.location.href = "login.html"; // Redirect to login
    });
  } else {
    // User is not logged in; ensure admin dashboard link is hidden
    adminDashboardLink.style.display = "none";

    // Redirect to login if trying to access admin.html
    if (window.location.pathname.includes("admin.html")) {
      alert("Please log in to access this page.");
      window.location.href = "login.html";
    }
  }
});
