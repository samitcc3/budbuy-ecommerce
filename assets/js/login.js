import { Session } from "../data/session.js"; // Import the Session class

document.addEventListener("DOMContentLoaded", () => {
  const usersDatabasePath = "assets/data/users.json"; // Path to the "database"
  const session = new Session(); // Instantiate the session handler

  // Function to fetch users from localStorage or JSON file
  async function fetchUsers() {
    try {
      const storedUsers = JSON.parse(localStorage.getItem("users"));
      if (storedUsers) {
        return storedUsers; // Use localStorage if available
      }

      // Fetch from JSON as a fallback
      const response = await fetch(usersDatabasePath);
      if (!response.ok) {
        throw new Error("Failed to fetch users database");
      }
      const users = await response.json();

      // Save fetched users to localStorage for future use
      localStorage.setItem("users", JSON.stringify(users));
      return users;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Function to validate user credentials
  function validateCredentials(email, password, users) {
    return users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );
  }

  // Handle form submission
  const loginForm = document.querySelector("#login-form");
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    try {
      const users = await fetchUsers(); // Fetch users from localStorage or JSON
      const user = validateCredentials(email, password, users);

      if (user) {
        if (!user.is_active) {
          // Prevent login for inactive users
          alert(
            "Your account is inactive. Please contact support for assistance."
          );
          return;
        }

        // Save user session
        session.login(user); // Log in the user using the session class

        alert(`Welcome back, ${user.name}!`);

        // Redirect user based on role
        if (user.role === "admin") {
          window.location.href = "admin.html";
        } else {
          window.location.href = "index.html";
        }
      } else {
        alert("Invalid email or password. Please try again.");
      }
    } catch (error) {
      alert("Unable to fetch user database. Please try again later.");
    }
  });
});
