var menu_btn = document.querySelector("#menu-btn");
var sidebar = document.querySelector("#sidebar");
var container = document.querySelector(".my-container");
menu_btn.addEventListener("click", () => {
  sidebar.classList.toggle("active-nav");
  container.classList.toggle("active-cont");
});

function validateLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("error-msg");

  // Simulated admin credentials (this should be handled on the server side in a real app)
  const adminUsername = "admin";
  const adminPassword = "admin123";

  if (username === adminUsername && password === adminPassword) {
      alert("Login successful!");
      window.location.href = "admin-dashboard.html";  // Redirect to admin dashboard
      return true;
  } else {
      errorMsg.textContent = "Invalid username or password!";
      return false;
  }
}
