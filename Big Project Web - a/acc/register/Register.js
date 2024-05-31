document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  let username = document.getElementById('registerUsername').value;
  let password = document.getElementById('registerPassword').value;
  
  // Check if username is less than 3 characters
  if (username.length < 3) {
    document.getElementById('loga').innerHTML = 'Username must be at least 3 characters long.';
    return;
  }
  
  // Check if password is less than 6 characters
  if (password.length < 6) {
    document.getElementById('loga').innerHTML = 'Password must be at least 6 characters long.';
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Check for duplicate username
  let duplicateUser = users.find(user => user.username === username);
  if (duplicateUser) {
    document.getElementById('loga').innerHTML = 'Username already exists. Please choose a different username.';
    return; // Stop execution if a duplicate is found
  }

  // If no duplicate, add the new user
  users.push({ username, password });
  localStorage.setItem('users', JSON.stringify(users));
  
  localStorage.setItem('loggedInUser', username); // Store the logged in user
  window.location.href = "/main-area/main.html";
});