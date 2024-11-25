export class Session {
  constructor() {
    // Load session from localStorage or initialize as null
    const storedSession = JSON.parse(localStorage.getItem("session"));
    this.session = storedSession || null;
  }

  // Save session to localStorage
  saveToStorage() {
    localStorage.setItem("session", JSON.stringify(this.session));
  }

  // Log in a user
  login(user) {
    this.session = {
      user_id: user.user_id,
      email: user.email, // Using email to identify user
      role: user.role, // Storing role for permission checks
    };
    this.saveToStorage();
  }

  // Log out a user
  logout() {
    this.session = null;
    this.saveToStorage();
  }

  // Get the current logged-in user session
  getSession() {
    return this.session;
  }

  // Check if a user is logged in
  isLoggedIn() {
    return this.session !== null;
  }

  // Get user role
  getUserRole() {
    return this.session ? this.session.role : null;
  }
}
