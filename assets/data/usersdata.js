export class UserData {
  constructor() {
    // Load users from localStorage or use the default list
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    this.users =
      storedUsers.length > 0
        ? storedUsers
        : [
            {
              user_id: 1,
              name: "John Doe",
              email: "john.doe@gmail.com",
              password: "password123",
              phone: "4165551234",
              address: "123 Main Street, Toronto, ON",
              role: "customer",
              created_at: "2024-11-20T10:00:00Z",
              updated_at: "2024-11-20T10:00:00Z",
              is_active: true,
            },
            {
              user_id: 2,
              name: "Jane Smith",
              email: "jane.smith@yahoo.com",
              password: "mypassword",
              phone: "9055555678",
              address: "456 Queen Street, Mississauga, ON",
              role: "customer",
              created_at: "2024-11-19T12:30:00Z",
              updated_at: "2024-11-19T12:30:00Z",
              is_active: true,
            },
            {
              user_id: 3,
              name: "Michael Brown",
              email: "michael.brown@outlook.com",
              password: "securepass",
              phone: "6475558765",
              address: "789 King Street, Brampton, ON",
              role: "customer",
              created_at: "2024-11-18T08:15:00Z",
              updated_at: "2024-11-18T08:15:00Z",
              is_active: true,
            },
            {
              user_id: 4,
              name: "Admin User",
              email: "admin@admin.com",
              password: "123456",
              phone: "1235559999",
              address: "111 Admin Street, Ottawa, ON",
              role: "admin",
              created_at: "2024-11-17T14:00:00Z",
              updated_at: "2024-11-17T14:00:00Z",
              is_active: true,
            },
          ];
  }

  // Save users to localStorage
  saveToStorage() {
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  getAllUsers(activeOnly = true) {
    return activeOnly
      ? this.users.filter((user) => user.is_active)
      : this.users;
  }

  findUserByEmail(email) {
    return this.users.find((user) => user.email === email) || null;
  }

  signUp(newUser) {
    if (this.findUserByEmail(newUser.email)) {
      throw new Error("User with this email already exists.");
    }

    const maxId = Math.max(...this.users.map((user) => user.user_id), 0);
    newUser.user_id = maxId + 1;
    newUser.created_at = new Date().toISOString();
    newUser.updated_at = new Date().toISOString();
    newUser.is_active = true;

    this.users.push(newUser);
    this.saveToStorage(); // Persist changes
    return newUser;
  }
}
