$(document).ready(() => {
  const usersDatabasePath = "assets/data/users.json"; // Path to the "database"

  // Function to fetch users from the JSON file
  function fetchUsers() {
    return $.getJSON(usersDatabasePath);
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
  $("#login-form").on("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = $("#email").val().trim();
    const password = $("#password").val().trim();

    fetchUsers()
      .done((users) => {
        const user = validateCredentials(email, password, users);
        if (user) {
          alert(`Welcome back, ${user.name}!`);
          // Redirect user based on role
          if (user.role === "admin") {
            window.location.href = "admin-dashboard.html";
          } else {
            window.location.href = "index.html";
          }
        } else {
          alert("Invalid email or password. Please try again.");
        }
      })
      .fail(() => {
        alert("Unable to fetch user database. Please try again later.");
      });
  });
});
