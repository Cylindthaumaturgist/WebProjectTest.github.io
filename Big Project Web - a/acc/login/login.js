document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let username = document.getElementById('loginUsername').value.trim();
    let password = document.getElementById('loginPassword').value.trim();

    // Check if username or password is empty or just spaces
    if (!username || !password) {
      document.getElementById('loga').innerHTML = 'Username and password cannot be empty.'
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    let user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem('loggedInUser', username); // Store the logged in user
      window.location.href = "/main-area/main.html";
    } else {
      document.getElementById('loga').innerHTML = 'Incorrect username or password'
    }
  });

  const register = document.getElementById('register');

  register.addEventListener('click', function() {
    window.location.href = "/acc/register/register.html";
  });
});