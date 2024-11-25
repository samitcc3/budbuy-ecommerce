import { Session } from "../data/session.js"; // Import the Session class

document.addEventListener("DOMContentLoaded", () => {
  const usersDatabasePath = "assets/data/users.json"; // Path to the "database"
  const session = new Session(); // Instantiate the session handler

  // Function to fetch users from the JSON file
  async function fetchUsers() {
    try {
      const response = await fetch(usersDatabasePath);
      if (!response.ok) {
        throw new Error("Failed to fetch users database");
      }
      return await response.json();
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
      const users = await fetchUsers(); // Fetch users from the database
      const user = validateCredentials(email, password, users);

      if (user) {
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
