import { UserData } from "../data/usersdata.js";

document.addEventListener("DOMContentLoaded", () => {
  const userData = new UserData(); // Instantiate the UserData class
  const signupForm = document.querySelector("#signup-form");
  const errorMessage = document.querySelector("#signup-error");

  signupForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;
    const phone = document.querySelector("#phone").value.trim();
    const address = document.querySelector("#address").value.trim();

    // Clear previous error messages
    errorMessage.style.display = "none";
    errorMessage.textContent = "";

    // Validate form data
    if (!name || !email || !password || !phone || !address) {
      errorMessage.textContent = "All fields are required.";
      errorMessage.style.display = "block";
      return;
    }

    if (password.length < 6) {
      errorMessage.textContent = "Password must be at least 6 characters.";
      errorMessage.style.display = "block";
      return;
    }

    try {
      // Check if user already exists
      if (userData.findUserByEmail(email)) {
        throw new Error("User already exists. Please use a different email.");
      }

      // Create a new user object
      const newUser = {
        name,
        email,
        password,
        phone,
        address,
        role: "customer",
      };

      // Sign up the new user
      userData.signUp(newUser);

      // Success message and redirect
      alert("Account created successfully!");
      window.location.href = "login.html";
    } catch (error) {
      // Display error message
      errorMessage.textContent = error.message;
      errorMessage.style.display = "block";
    }
  });
});
