document.addEventListener('DOMContentLoaded', function() {
  const logout = document.getElementById('logout');

  logout.addEventListener('click', function() {
    let loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      let users = JSON.parse(localStorage.getItem('users')) || [];
      let userIndex = users.findIndex(user => user.username === loggedInUser);

      if (userIndex !== -1) {
        let user = users[userIndex];
        user.coins = user.coins || 0; // Ensure 'coins' is defined
        users[userIndex] = user; // Update the user in the array
        localStorage.setItem('users', JSON.stringify(users)); // Save the updated users array
      }

      localStorage.removeItem('loggedInUser');

      window.location.href = "/acc/login/login.html";
    } else {
      window.location.href = "/acc/login/login.html";
    }
  });

  // Display user's coins on the welcome page
  let username = localStorage.getItem('loggedInUser');
  if (username) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(user => user.username === username);
    if (user) {
      document.getElementById('coins').innerHTML = `Coins: ${user.coins || 0}`;
    }
  }
});