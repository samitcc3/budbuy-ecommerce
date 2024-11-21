$(document).ready(() => {
  const usersDatabasePath = "assets/data/users.json"; // Path to users.json
  const signupForm = $("#signup-form");

  // Fetch the current user data
  function fetchUsers() {
    return $.getJSON(usersDatabasePath).catch((error) => {
      console.error("Failed to fetch user database:", error);
      alert("Unable to process your request. Please try again later.");
      throw error;
    });
  }

  // Simulate writing the updated JSON file
  function downloadJSONFile(filename, content) {
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  // Handle form submission
  signupForm.on("submit", (e) => {
    e.preventDefault();

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();
    const phone = $("#phone").val().trim();
    const address = $("#address").val().trim();

    if (!name || !email || !password || !address) {
      alert("Please fill out all required fields.");
      return;
    }

    fetchUsers()
      .then((users) => {
        // Check if the email already exists
        if (users.some((user) => user.email === email)) {
          alert("A user with this email already exists.");
          return;
        }

        // Create new user
        const newUser = {
          user_id: users.length + 1,
          name,
          email,
          password, // In production, use a hashing function
          phone,
          address,
          role: "customer", // Default role
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_active: true,
        };

        // Add the new user to the list
        users.push(newUser);

        // Simulate saving the updated JSON file
        downloadJSONFile("users.json", users);

        // Notify the user and redirect to login
        alert("User created successfully! Redirecting to login.");
        window.location.href = "login.html";
      })
      .catch((error) => console.error("Error processing signup:", error));
  });
});
